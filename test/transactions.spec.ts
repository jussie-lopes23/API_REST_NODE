import { expect, test, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import {execSync} from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app.js'

describe('Transactions routes', () => {
    beforeAll(async () => {
    await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })


    //metodos para utilizar junto com o test: test.skip: pula o teste, test.todo: deixa registrado um teste para fazer, test.only: só executa esse test.
    test('o usuario consegue criar uma nova transição', async () => {
        const response = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Nova transação',
                amount: 5000,
                type: 'debit'
            })
            .expect(201)

        //console.log(response.headers) - uma opção para pegar o o cookie do session id.
        //console.log(response.get('Set-Cookie')) - outra forma de pegar o session id
    })

   test('o usuario deve poder listar todas as transações', async () => {
        const createTransactionsResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Nova transação',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionsResponse.get('Set-Cookie')! // O " ! " resolve o problema com o cookie no set deixando claro que cookies não vai ser undefined, o que gerou o conflito no set " .set('Cookie', cookies) "

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'Nova transação',
                amount: 5000
            })
        ])


        //----- outra forma de resolver o erro no set com o cookie -----
        // const cookies = createTransactionsResponse.get('Set-Cookie')

        // expect(cookies).toBeDefined() //pegar erros de lógica na própria rota durante os testes

        // const listTransactionsResponse = await request(app.server)
        // .get('/transactions')
        // .set('Cookie', cookies!)
        // .expect(200)
   })

   test('o usuario deve poder pegar uma transação específica', async () => {
        const createTransactionsResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Nova transação',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionsResponse.get('Set-Cookie')! // O " ! " resolve o problema com o cookie no set deixando claro que cookies não vai ser undefined, o que gerou o conflito no set " .set('Cookie', cookies) "

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)
        
        const transactionId = listTransactionsResponse.body.transactions[0].id

        const getTransactionsResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200)

        expect(getTransactionsResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'Nova transação',
                amount: 5000
            })
        )
   })

   test('o usuario deve poder pegar um resumo(summary)', async () => {
        const createTransactionsResponse = await request(app.server)
            .post('/transactions')
            .send({
                title: 'Credito transação',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionsResponse.get('Set-Cookie')!

        await request(app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
                title: 'Debito transação',
                amount: 2000,
                type: 'debit'
            })



        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies)
            .expect(200)

        expect(summaryResponse.body.summary).toEqual({
            amount: 3000,
        })

   })


})
