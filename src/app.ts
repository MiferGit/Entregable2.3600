import "reflect-metadata"; //importamos reflect-metadata para que funcione typeorm
import { envs } from "./config";
import { PostgresDatabase } from "./data";
import { AppRoutes } from "./presentation/routes"; //impot el archivo routes
import { Server } from "./presentation/server";
// import "dotenv/config"; //importamos dotenv para que lea el archivo .env
process.loadEnvFile(); //cargamos el archivo .env

//Para traerme las cosas de server que es como mi app creo una funcion main()
async function main() {

  const postgres = new PostgresDatabase({   //instanciamos la base de datos paso al finalizar projecto y le pasamos las opciones
//Para que esta informacion no sea visible o usurpada robada creamos dos archivos en la raiz del proyecto .env y .env.template
    username: envs.DB_USERNAME || '',
    password: envs.DB_PASSWORD || '',
    host: envs.DB_HOST || '',
    database: envs.DB_DATABASE || '',
    port: envs.DB_PORT || 3000,  //El puerto de Postgres es el 5432
  });

  await postgres.connect(); //Ejecutamos la conexion a la base de datosn

  const server = new Server({ //instanciamos Server para traer las cosas teniendo en cuenta las ruta de la carpeta
    
    port: envs.PORT, // traemos lo de el contructor, port, routes
    routes: AppRoutes.routes,
  });
  console.log(process.env.PORT); //imprimimos el puerto
  await server.start(); // ejecutamos el start de inicializacion
}

main(); //Ejecutamos la aplicacion inicial


//Vamos a neon.tech que es una base de datos gratuita y copiamos el enlace ]: 
// postgresql://Academlo-blog_owner:9ieJsq2AkpIw@ep-ancient-scene-a5yzd8sf.us-east-2.aws.neon.tech/Academlo-blog?sslmode=require
//El siguiente es el formato del link de arriba por partes el databasename es Academlo-blog antes de ?
// typedatabase: // username:password@host/databasename

// OTRO: instalamos postgres : npm i pg


