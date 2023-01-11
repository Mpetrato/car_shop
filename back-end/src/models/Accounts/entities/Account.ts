import { randomUUID } from "crypto";

class Account {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;

    constructor ({ name, email, password, created_at }) {
        this.id = randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
    }
}

export { Account }