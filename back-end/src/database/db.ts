import pgp from 'pg-promise'

const pg = pgp();

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'car_shop_db',
    user: 'admin',
    password: 'admin'
}

const db = pg(connection)

export { db }