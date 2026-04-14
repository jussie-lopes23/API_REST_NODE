import { expect, test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

test('o usuario consegue criar uma nova transição', async () => {
    await request(app.server)
        .post('/transactions')
        .send({
            title: 'Nova transação',
            amount: 5000,       // número, não string
            type: 'debit'
        })
        .expect(201)
})