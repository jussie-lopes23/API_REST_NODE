import fastify from 'fastify';
import crypto from 'node:crypto'

import { env } from './env/index.js';
import { transactionsroutes } from './routes/transactions.js';
import cookie from '@fastify/cookie';

const app = fastify()

app.register(cookie)

app.register(transactionsroutes, {
    prefix: 'transactions',
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server Running')
})