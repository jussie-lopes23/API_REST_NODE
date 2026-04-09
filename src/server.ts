import fastify from 'fastify';
import crypto from 'node:crypto'
import { db } from './database.js';
import { env } from './env/index.js';

const app = fastify()

app.get('/hello', async () => {
    // const transaction = await db('transactions').insert({
    //     id: crypto.randomUUID(),
    //     title: 'primeira transação',
    //     amount: 1000,
    // }).returning('*')

    const transaction = await db('transactions')
    .select('*')
    return transaction
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server Running')
})