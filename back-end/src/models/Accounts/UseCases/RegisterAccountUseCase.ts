import { IRegisterAccountDTO } from "../dtos";
import { IAccountRepository } from "../repositories/IAccountRepository";
import { genSaltSync, hashSync,  } from 'bcrypt'

class RegisterAccountUseCase {
    constructor (private accountRepository: IAccountRepository) {}

    async execute ({ created_at, email, id, name, password: password_ }: IRegisterAccountDTO): Promise<void | Error> {
        const accountAlreadyExists = await this.accountRepository.findOne(email)
        if (accountAlreadyExists) throw new Error('Account already exists!')

        const salt = genSaltSync(10);
        const password = hashSync(password_, salt);

        this.accountRepository.register({ created_at, email, id, name, password });
    }
}

export { RegisterAccountUseCase }