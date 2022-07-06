import "reflect-metadata"
// import { DataSource } from "typeorm"
//
// import {User} from "../entity/user/User";
// import {Analysis} from "../entity/analysis/Analysis";
// import {AuthToken} from "../entity/token/Token";
// import {Clinic} from "../entity/clinic/clinic";
//
// const fs = require('fs')
// const ini = require('ini')
// const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
// const config = ini.parse(configFile)['DATABASE']
//
// export const AppDataSource = new DataSource({
//     type: config.dialect,
//     host: config.host,
//     port: config.port,
//     username: config.name,
//     password: config.password,
//     database: config.storage,
//     entities: [User,Analysis,AuthToken,Clinic],
//     synchronize: true,
//     logging: false,
//     migrationsRun: true,
//     dropSchema: false,
//     // name: 'default',
//     migrations: ["../migrations/*{.ts,.js}"],
// })
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: 'postgres',
    database: 'database_auth',
    host: "db_auth",
    port: 5433,
    username: "postgres",
    password: "postgres",
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    entities: [__dirname + '/../entity/**/*.{ts,js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
})

// #npm run typeorm migration:generate -- -d src/dataSource/data-source.ts src/migrations/migrations
// npm run typeorm migration:run -- -d src/dataSource/data-source.ts

