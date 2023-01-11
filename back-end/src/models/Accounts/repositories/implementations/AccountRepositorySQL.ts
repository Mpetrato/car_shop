import { db } from "../../../../database/db";
import { IRegisterAccountDTO } from "../../dtos";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../IAccountRepository";

class AccountRepositorySQL implements IAccountRepository {
    
    async register({ created_at, email, id, name, password }: IRegisterAccountDTO): Promise<void> {
        await db.query('INSERT INTO users (id, name, email, password, created_at) values ($1, $2, $3, $4, $5)', [id, name, email, password, created_at])
    }
    async findOne(email: string): Promise<Boolean> {
        const userAlreadyExists: [] = await db.query(`SELECT * FROM users WHERE email='${email}'`)
        if (userAlreadyExists.length > 0) return true
    }
    async getAccount(email: string): Promise<Account> {
        const account = await db.query(`SELECT * FROM users WHERE email='${email}'`)
        return account[0];
    }
}

export { AccountRepositorySQL}