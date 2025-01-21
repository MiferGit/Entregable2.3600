import { DataSource } from "typeorm";
import { Repair } from "./models/repair.model";
import { Users } from "./models/users.model";

interface Options {
    host: string;   
    port: number;   
    username: string; 
    password: string; 
    database: string; 
}

export class PostgresDatabase {

    public datasource: DataSource; 

    constructor(options: Options) {  

        this.datasource = new DataSource({ 
            type: 'postgres',  
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [Users, Repair],  
            synchronize: true,  
            ssl: {
                rejectUnauthorized: false
            }  
        });
    } 
    
    async connect() {
        try {
            await this.datasource.initialize();
            console.log('Data Source has been initialized!');
        } catch (error) {
            console.error('Error during Data Source initialization:', error);
            throw error;
        }
    }
}