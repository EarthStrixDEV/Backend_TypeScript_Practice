"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql2_1 = require("mysql2");
const configObject = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    port: 3306
};
const pool = (0, mysql2_1.createPool)(configObject);
exports.pool = pool;
//# sourceMappingURL=database.js.map