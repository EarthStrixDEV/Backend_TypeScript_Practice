import express from 'express'
import {pool} from '../database'
import { Request ,Response } from 'express'
import { QueryError ,QueryResult } from 'mysql2'
import { User ,UserArray ,UserID } from '../types/model.type'

const router = express.Router()

router.post("/user/createUser", (request: Request, response: Response) => {
    const {
        name,
        age,
        department,
        salary,
        isMarried,
        isSeniorJob
    } = request.body

    const users: UserArray = [
        name,
        age,
        department,
        salary,
        isMarried,
        isSeniorJob,
        null
    ]

    pool.execute("INSERT INTO users (name ,age ,department ,salary ,isMarried ,isSeniorJob) VALUES (? ,?, ? ,? ,? ,?)" ,users ,(err: QueryError | null, result) => {
        if (err) throw err
        console.log("Create user successfully");
        response.sendStatus(201);
    })
})

router.get("/user/:id" ,(request: Request ,response: Response) => {
    const id:number = parseInt(request.params.id);
    const sql:string = `SELECT * FROM users WHERE id = ?`
    pool.execute(sql ,[id] ,(err: QueryError | null , result: QueryResult ) => {
        if (err) throw err
        console.log(result);
        response.json(result)
    })

})

router.get("/user", (request: Request ,response: Response) => {
    const sql:string = "SELECT * FROM users"
    pool.execute(sql, (err: QueryError | null, result: QueryResult) => {
        if (err) throw err
        console.log(result)
        response.json(result)
        response.sendStatus(200)
    })
})

router.put("/user/:id", (request: Request, response: Response) => {
    const { name, age, department, salary, isMarried, isSeniorJob } = request.body;
    const id: UserID = parseInt(request.params.id);
  
    const sql:string = `UPDATE users SET name = ?, department = ?, age = ?, salary = ?, isMarried = ?, isSeniorJob = ? WHERE id = ?`;
    const values:UserArray = [name, department, age, salary, isMarried, isSeniorJob, id];
  
    pool.execute(sql, values, (err: QueryError | null, result: QueryResult) => {
        if (err) throw err;
        console.log("user successfully updated");
        response.sendStatus(200);
    });
});

router.delete("/user/:id", (request: Request ,response: Response) => {
    const id: UserID = parseInt(request.params.id);
    pool.execute(`DELETE FROM users WHERE id = ?`,[id] , (err: QueryError | null, result: QueryResult) => {
        if (err) throw err
        console.log("Delete user successfully");
        response.sendStatus(200);
    })
})



export {router}