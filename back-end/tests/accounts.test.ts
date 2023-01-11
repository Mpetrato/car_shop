import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import { db } from "../src/database/db";
import { Account } from "../src/models/Accounts/entities/Account";
import { AccountRepositorySQL } from "../src/models/Accounts/repositories/implementations/AccountRepositorySQL";
import { RegisterAccountUseCase } from "../src/models/Accounts/UseCases/RegisterAccountUseCase";

describe('Account tests', () => {
    describe('Register Account', () => {

        beforeEach( async () => {
            await db.query('DELETE FROM users')
        })

        it('Should create a new account', async () => {
            const input = {
                name: "Matheus",
                email: "matheuspetrato@gmail.com",
                password: "121312",
                created_at: new Date()
            }
    
            const account =  new Account(input);
            const accountRepositorySQL = new AccountRepositorySQL();
            const registerAccountUseCase = new RegisterAccountUseCase(accountRepositorySQL);
            await registerAccountUseCase.execute(account);
            const createdAccount = await accountRepositorySQL.findOne(account.email);
            expect(createdAccount).toBe(true);
        })
        it('Should return a error if account exists', async () => {
            const input = {
                name: "Matheus",
                email: "matheuspetrato@gmail.com",
                password: "121312",
                created_at: new Date()
            }
    
            const account =  new Account(input);
            const accountRepositorySQL = new AccountRepositorySQL();
            const registerAccountUseCase = new RegisterAccountUseCase(accountRepositorySQL);
            await registerAccountUseCase.execute(account);
            expect(registerAccountUseCase.execute(account)).rejects.toBeInstanceOf(Error)
        })
        it.skip('Should encrypt the account password', async () => {
            const input = {
                name: "Matheus",
                email: "matheuspetrato@gmail.com",
                password: "121312",
                created_at: new Date()
            }
    
            const account =  new Account(input);
            const accountRepositorySQL = new AccountRepositorySQL();
            const registerAccountUseCase = new RegisterAccountUseCase(accountRepositorySQL);
            await registerAccountUseCase.execute(account);
            const registredAccount = await accountRepositorySQL.getAccount(account.email)
            expect(compareSync(account.password, registredAccount.password)).toBeTruthy();
        })
    })
    describe('Login Account', () => {
        it('Should be able to login a registred account', () => {
            
        })
    })
})