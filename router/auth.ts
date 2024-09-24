import express, { RouterOptions } from "express";
import {pool} from "../database"
import { QueryError ,QueryResult } from "mysql2";
import { Request ,Response ,NextFunction ,Application } from "express";
import jwt from "jsonwebtoken"
import { generateToken ,verifyToken } from "../jwt/jwt";
import { UserArray, UserAuth ,User } from "../types/model.type";

const authRoute = express.Router();

var token = ""

authRoute.post("/login" ,(request: Request ,response: Response ,next: NextFunction) => {
    const {
        id,
        name
    }: UserAuth = request.body

    const sql:string = "SELECT * FROM users WHERE id = ? AND name = ?"
    
    pool.execute(sql ,[id ,name] ,(err: QueryError | null ,result: QueryResult | any) => {
        if (err) return response.sendStatus(500)
        
        if (!result) {
            return response.sendStatus(404)
        }

        const user: User = result[0]

        token = generateToken({
            id: user?.id,
            name: user?.name
        })

        response.json({
            token
        })
    })
})

authRoute.get("/session", (request: Request ,response: Response) => {
    const verifyToken_ = verifyToken(token);
    if (!verifyToken_) {
        return response.sendStatus(401)
    }
    return response.sendStatus(200)
})

export {authRoute}