import "reflect-metadata";
import { envs } from "./config";
import { PostgresDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

process.loadEnvFile();

async function main() {
  const postgres = new PostgresDatabase({
    username: envs.DB_USERNAME || "",
    password: envs.DB_PASSWORD || "",
    host: envs.DB_HOST || "",
    database: envs.DB_DATABASE || "",
    port: envs.DB_PORT || 3000,
  });

  await postgres.connect();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  console.log(process.env.PORT);
  await server.start();
}

main();
