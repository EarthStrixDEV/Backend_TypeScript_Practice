import {pool} from "./database"
import { FieldPacket, QueryError, QueryResult } from "mysql2"
import {User ,UserArray, UserID} from "./types/model.type"
import { Request ,Response } from "express"
import morgan from "morgan"
import express from "express"
import cors from 'cors'
import {router} from "./router/user"
import {authRoute} from './router/auth'
import {jwtMid} from "./middleware/jwt.mid"
import "dotenv/config"

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))
app.use(cors())
app.use(morgan("dev"))

app.use('/user' ,router)
app.use('/auth' ,authRoute)

app.use(jwtMid)

app.listen(PORT ,() => {
    console.log(`Express server listening on http://localhost:${PORT}`);
})