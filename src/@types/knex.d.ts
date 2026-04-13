import { Knex } from "knex";
import type { number, string } from "zod";

declare module 'knex/types/tables'{
    transactions: {
        id: string
        title: string
        amount: number
        type: string
        created_at: string
        session_id: string
    }
}