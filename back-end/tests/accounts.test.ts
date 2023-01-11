import { compare, compareSync, genSaltSync, hashSync } from "bcrypt";
import { Account } from "../src/models/Accounts/entities/Account";
import { AccountRepositoryMemory } from "../src/models/Accounts/repositories/implementations/AccountRepositoryMemory";
import { RegisterAccountUseCase } from "../src/models/Accounts/UseCases/RegisterAccountUseCase";

describe('Account tests', () => {
    describe('Register Account', () => {
        it('Should create a new account', async () => {
            const input = {
                name: "Matheus",
                email: "matheuspetrato@gmail.com",
                password: "121312212321aA",
                created_at: new Date()
            }
    
            const account =  new Account(input);
            const accountRepositoryMemory = new AccountRepositoryMemory();
            const registerAccountUseCase = new RegisterAccountUseCase(accountRepositoryMemory);
            await registerAccountUseCase.execute(account);
            const createdAccount = await accountRepositoryMemory.findOne(account.email);
            expect(createdAccount).toBe(true);
        })
        it('Should return a error if account exists', async () => {
            const input = {
                name: "Matheus",
                email: "matheuspetrato@gmail.com",
                password: "121312212321aA",
                created_at: new Date()
            }
    
            const account =  new Account(input);
            const accountRepositoryMemory = new AccountRepositoryMemory();
            const registerAccountUseCase = new RegisterAccountUseCase(accountRepositoryMemory);
            await registerAccountUseCase.execute(account);
            expect(registerAccountUseCase.execute(account)).rejects.toBeInstanceOf(Error)
        })
        it('Should encrypt the account password', async () => {
            const input = {
                name: "Matheus",
                email: "matheuspetrato@gmail.com",
                password: "121312212321aA",
                created_at: new Date()
            }
    
            const account =  new Account(input);
            const accountRepositoryMemory = new AccountRepositoryMemory();
            const registerAccountUseCase = new RegisterAccountUseCase(accountRepositoryMemory);
            await registerAccountUseCase.execute(account);
            const registredAccount = await accountRepositoryMemory.getAccount(account.email)
            expect(compareSync(account.password, registredAccount.password)).toBeTruthy();
        })
    })
    describe('Login Account', () => {
        it('Should be able to login a registred account', () => {
            
        })
    })
})