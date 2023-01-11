import { IRegisterAccountDTO } from "../../dtos";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../IAccountRepository";

export class AccountRepositoryMemory implements IAccountRepository {
    accounts: Account[]

    constructor () {
        this.accounts = []
    }
    
    async getAccount(email: string): Promise<Account> {
        return this.accounts.find((account) => account.email === email);
    }

    async findOne(email: string): Promise<Boolean> {
        return this.accounts.some((account) => account.email === email)
    }
    
    async register({ created_at, email, id, name, password }: IRegisterAccountDTO): Promise<void> {
        this.accounts.push({ id, name, created_at, email, password })
    }
}