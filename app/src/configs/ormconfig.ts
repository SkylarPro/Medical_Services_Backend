import {DataSource, DataSourceOptions} from 'typeorm'
import {User} from "../entity/user/User";
import {Analysis} from "../entity/analysis/Analysis";


const fs = require('fs')
const ini = require('ini')
const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
const config = ini.parse(configFile)['DATABASE']

const connectionOptions: DataSourceOptions = {
    type: "postgres",
    host: "db_app",
    port: 5432,
    database: 'database_app',
    username: "postgres",
    password: "postgres",
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
    entities: [__dirname + '/../entity/**/*.{ts,js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
}
export = connectionOptions
