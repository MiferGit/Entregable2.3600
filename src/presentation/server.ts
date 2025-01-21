
   import express, { Router }  from "express";


interface Optiones { //
    port: number;
    routes: Router
}
   export class Server {
    
    //TRES PROPIEDADES PARA CREAR EL ARCHIVO SERVER**********************************************************
    private readonly app = express();  
    private readonly port: number;  
    private readonly routes: Router; 

   
 //******************************************************* */   
    constructor(options: Optiones) { 
        this.port = options.port;  
        this.routes = options.routes

    }

 //***************************************************** */   

    //Creamos un Metodo Asincrono start   
    async start(){  // este metodo va  a lanzar la ejecucion de la aplicacion
        this.app.use(express.json()) //Permite leer formato json
        this.app.use(express.urlencoded({extended: true})) 
        this.app.use(this.routes) // Ejecuta las rutas que el servido va a resibir

        this.app.listen(this.port, () => {  
            console.log(`Server started on port ${this.port} 🦾💫`);
        })
    }

   }; 


