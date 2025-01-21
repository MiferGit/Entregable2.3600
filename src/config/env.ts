process.loadEnvFile(); //cargamos el archivo .env

import {get} from 'env-var'; //importamos get de env-var que es una libreria para validar variables de entorno

export const envs = { //creamos un objeto envs
    PORT: get('PORT').required().asPortNumber(), //creamos una variable PORT que es un numero de puerto
    DB_PASSWORD: get('PASSWORD_DATABASE').required().asString(), //creamos una variable DB_PASSWORD que es un string
    DB_USERNAME: get('USERNAME_DATABASE').required().asString(), //creamos una variable DB_USERNAME que es un string
    DB_DATABASE: get('DATABASE').required().asString(), //creamos una variable DB_DATABASE que es un string
    DB_PORT: get('PORT_DATABASE').required().asPortNumber(), //creamos una variable DB_PORT que es un numero de puerto
    DB_HOST: get('HOST_DATABASE').required().asString(), //creamos una variable DB_HOST que es un string
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),
}