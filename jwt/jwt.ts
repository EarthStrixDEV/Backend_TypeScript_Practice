import jwt from "jsonwebtoken"
import {User, UserAuth} from "../types/model.type"
import 'dotenv/config'

type Token = string

const secretKey = process.env.JWT_SECRET || "your_secret_key"

export const generateToken = (user: UserAuth) => {
    const payload = {
        id: user?.id,
        name: user?.name
    }
    const token = jwt.sign(payload ,secretKey ,{expiresIn: '1h'})
    return token
}

export const verifyToken = (token: Token) => {
    try {
        const decoded = jwt.verify(token ,secretKey)
        return decoded
    } catch (error) {
        return null
    }
}