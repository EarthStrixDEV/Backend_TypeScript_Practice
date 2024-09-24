import { createPool } from "mysql2"

const configObject = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user',
    port: 3306
}

const pool = createPool(configObject)

export {pool}