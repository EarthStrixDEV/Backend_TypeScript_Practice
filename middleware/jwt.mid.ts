import express, { Application } from "express"
import { Request ,Response ,NextFunction } from "express"
import { generateToken ,verifyToken } from "../jwt/jwt"
import {VerifyErrors ,JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import 'dotenv/config'

const jwtMid:Application = express()

const secretKey = process.env.JWT_SECRET || "your_secret_key"

jwtMid.use(express.json())

jwtMid.use((request: Request ,response: Response ,next: NextFunction) => {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return response.sendStatus(401)
    
    jwt.verify(token ,secretKey ,(err: VerifyErrors | null ,result: string | JwtPayload | undefined) => {
        if (err) return response.sendStatus(403)
        request.user = result
        next()
    })
})

export {jwtMid}