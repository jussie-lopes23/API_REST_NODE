import type { FastifyInstance } from 'fastify';
import { db } from '../database.js';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { checkSessionIdExist } from '../middlewares/chechk-session-id-exists.js';

export async function transactionsroutes(app: FastifyInstance){

    app.get(
        '/', 
        {
            preHandler: [checkSessionIdExist]
        }, 
        async (request, reply) => {
        const { sessionId } = request.cookies

        const transactions = await db('transactions')
        .where('session_id', sessionId)
        .select()
        return { 
            transactions, 
        }

    })

    app.get('/:id' , 
        {
            preHandler: [checkSessionIdExist]
        }, 
        async(request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string(), 
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const { sessionId } = request.cookies

        const transaction = await db('transactions')
        .where({
            session_id: sessionId,
            id
        })
        .first()

        return { transaction }
    })

    app.get('/summary' , 
        {
            preHandler: [checkSessionIdExist]
        },  
        async (request) => {

        const { sessionId } = request.cookies    

        const summary = await db('transactions')
        .where('session_id', sessionId)
        .sum('amount', {as: 'amount'})
        .first()
        return {summary}
    })

    app.post('/' ,  
        async (request, reply) => {
        const createTensactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount , type} = createTensactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if(!sessionId){
            sessionId  = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 dias
            })
        }

        await db('transactions').insert({
            id: randomUUID(),
            title,
            amount,
            //amount: type === 'credit' ? amount : amount * -1,
            type,
            session_id: sessionId,
        })

    return reply.status(201).send() 
})
}