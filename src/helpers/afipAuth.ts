import { BadRequestException } from "@nestjs/common";
import { Afip } from "afip.ts";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });
export async function ticketReturn (){
    try {
        const afip: Afip =new Afip({
            key: process.env.AFIP_KEY,
            cert: process.env.AFIP_CERT,
            cuit: 20446287096,
            handleTicket: false,
            production:false,
            ticketPath: "../utils"
        });
        
        const ticket = await afip.electronicBillingService.login();
        
        const status = afip.electronicBillingService.isCredentialStillValid();

        return ticket;
    } catch (error) {

        console.log(error);
        
    }    
}
