import express, {NextFunction, Request ,Response} from "express"
import {MailTransporter ,MailOption} from "../types/mail.type"
import nodemailer, { SentMessageInfo, Transport, Transporter, TransportOptions } from "nodemailer"
import "dotenv/config"
import { join } from "path"

const mailRoute = express.Router();

const transporterOption: MailTransporter = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: process.env.SERVICE_MAIL,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    }
}

const transporter:Transporter = nodemailer.createTransport(transporterOption)

mailRoute.post("/send" ,(request: Request ,response: Response ,next: NextFunction) => {
    const {
        from,
        to,
        subject,
        text,
        html,
        filename,
        path
    } = request.body;

    const mailOption: MailOption = {
        from,
        to,
        subject,
        text,
        html,
        attachments: [
            {
                filename,
                path: join(__dirname, path)
            }
        ]
    }

    transporter.sendMail(mailOption ,(err: Error | null ,info: SentMessageInfo) => {
        if (err) {
            console.log(err);
            return response.sendStatus(500)
        }
        response.json({
            mailOption,
            status: true,
            message: "E-mail sent successfully"
        }).sendStatus(201)
    })
})

export {mailRoute}