import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development' , 'test' , 'production']). default('production'),
    DATABASE_URL: z.string().min(1),
    PORT: z.coerce.number().default(3333), 
})

console.log('DATABASE_URL:', process.env.DATABASE_URL)
const _env =  envSchema.safeParse(process.env)

if(_env.success === false){
    console.error('Inavalido variavel de ambiente', _env.error.format())

    throw new Error('Invalido variaveis de ambiente')
}

export const env = _env.data