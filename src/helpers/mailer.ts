import { config as dotenvConfig } from "dotenv";
import { Client } from "src/models/client.entity";
const nodemailer = require("nodemailer");

dotenvConfig({ path: ".env" });

//Config for gmail use, because is the more popular email service
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
    },
});

export async function sendMailToUser(client:Client) {
    const contentHTML = `
        <p>Agregar HTML segun corresponda el mail</p>
        `
    transporter.sendMail({
        from: process.env.MAILER_EMAIL,
        to: client.email,
        subject: "Colocar ASUNTO",
        html: contentHTML
    })
}

