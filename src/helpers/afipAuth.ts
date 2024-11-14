import { BadRequestException } from "@nestjs/common";
import { Afip } from "afip.ts";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env" });
export async function ticketReturn() {
    try {
        const afip: Afip = new Afip({
            key: process.env.AFIP_KEY,
            cert: process.env.AFIP_CERT,
            cuit: 20446287096,//Colocas tu cuit
            handleTicket: false,//Esta propiedad avisa si manejas el ticket tu, o lo maneja el SDK
            ticketPath: `src/utils`,
        });

        const ticket = await afip.electronicBillingService.login(); //Realiza la llamada al servicio WSAA
        afip.electronicBillingService.setCredentials(ticket);
        //const status = afip.electronicBillingService.isCredentialStillValid();
        //if (!status) throw new Error("Ticket no valido para operar");

        //Podemos colocar el almacenamiento del ticket aqui, agregar mas logica para chequear su validez
        //o realizar operaciones de facturacion si necesitamos testear su funcionamiento

        //Creacion de un comprobante

        const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .split("T")[0];
        let data = {
            CantReg: 1, // Cantidad de comprobantes a registrar
            PtoVta: 1, // Punto de venta
            CbteTipo: 6, // Tipo de comprobante (ver tipos disponibles)
            Concepto: 1, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
            DocTipo: 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
            DocNro: 0, // Número de documento del comprador (0 consumidor final)
            CbteDesde: 1, // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
            CbteHasta: 1, // Número de comprobante o numero del último comprobante en caso de ser mas de uno
            CbteFch: `${parseInt(date.replace(/-/g, ""))}`, // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
            ImpTotal: 121, // Importe total del comprobante
            ImpTotConc: 0, // Importe neto no gravado
            ImpNeto: 100, // Importe neto gravado
            ImpOpEx: 0, // Importe exento de IVA
            ImpIVA: 21, //Importe total de IVA
            ImpTrib: 0, //Importe total de tributos
            MonId: "PES", //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos)
            MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
        };

        const compr = await afip.electronicBillingService.createVoucher(data);
        console.log(compr); 
        
        
        return compr;

    } catch (error) {
        console.log(error);
    }
}
