import { config as dotenvConfig } from "dotenv";
const nodemailer = require("nodemailer");

dotenvConfig({ path: ".env" });
//Configurado para Gmail, ya que es el servicio más utilizado.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //Puedes consultar la documentacion para mas host y como usarlos
    port: 465,
    secure: true, // true para puerto 465, false para otros puertos
    auth: {
        user: process.env.MAILER_EMAIL,     //Aqui deberia de estar nuestro correo de origen
        pass: process.env.MAILER_PASSWORD,  //Codigo que proporciona Gmail y/o contraseña segun corresponda
    },
});

export async function sendMailToUser(email:string) { //Recibimos por parametro las variables que necesitemos
    try {
        const contentHTML = `
            <p>Agregar HTML segun corresponda el mail</p> 
            `   //Cuerpo del Correo
        await transporter.sendMail({
            from: process.env.MAILER_EMAIL, // Otra vez nuestro correo de origen
            to: email, //Aqui deberia de estar el correo del destinatario
            subject: "Colocar ASUNTO",
            html: contentHTML //Aqui coloco el cuerpo, Yo lo separo en una variable, pero puedes 
                              //Tanto importarlo desde otro archivo, como traerlo en los parametros. Tu eliges
        })
    } catch (error) {
        console.log(error.message);
    }
}

