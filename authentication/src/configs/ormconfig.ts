import {DataSource, DataSourceOptions} from 'typeorm'


const fs = require('fs')
const ini = require('ini')
const configFile = fs.readFileSync(__dirname + '/configs/settings.ini', 'utf-8')
const config = ini.parse(configFile)['DATABASE']

const connectionOptions: DataSourceOptions = {
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

}
export = connectionOptions