import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "rentx",
    password: "rentx",
    database: "rentx",
    synchronize: true,
    logging: true,
    migrationsTableName: "migrations",
    migrations: ["./src/database/migrations/**/*{.ts,.js}"],
    entities: [
        "./src/modules/cars/entities/**/*.ts",
        "./src/modules/accounts/entities/**/*.ts",
    ],
});

export function createConnection(host = "db"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}

export default AppDataSource;