import { IRegisterAccountDTO } from "../dtos";
import { Account } from "../entities/Account";

export interface IAccountRepository {
    register (data: IRegisterAccountDTO): Promise<void>;
    findOne (email: string): Promise<Boolean>;
    getAccount (email: string): Promise<Account>;
}