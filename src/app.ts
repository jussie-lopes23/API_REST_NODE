import fastify from 'fastify';
import { transactionsroutes } from './routes/transactions.js';
import cookie from '@fastify/cookie';

export const app = fastify()

app.register(cookie)

app.register(transactionsroutes, {
    prefix: 'transactions',
})
