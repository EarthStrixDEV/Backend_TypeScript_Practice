"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const users = [
    "Jane Doe",
    33,
    "Accounting Services",
    32000,
    true,
    true,
];
if (false) {
    database_1.pool.execute("INSERT INTO users (name ,age ,department ,salary ,isMarried ,isSeniorJob) VALUES (? ,?, ? ,? ,? ,?)", users, (err, result) => {
        if (err)
            throw err;
        console.log(result);
    });
}
database_1.pool.execute("SELECT * FROM Users", (err, result) => {
    if (err)
        throw err;
    console.log(result);
});
//# sourceMappingURL=app.js.map