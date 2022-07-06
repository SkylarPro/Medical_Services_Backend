import express from "express"
import { createServer, Server } from "http"
import routes from "../routes"
import bodyParser from 'body-parser'
import {AppDataSource} from '../dataSource/data-source'
import passport from "../middlewares/passport";

class App {
    public port: number
    public host: string

    private app: express.Application
    private server: Server

    constructor(port = 8000, host = "localhost") {
        this.port = port
        this.host = host


        this.app = this.createApp()
        this.server = this.createServer()
        this.initDB()
        this.syncDB()

        // this.checkDBconnection()

    }

    private createApp(): express.Application {
        // включаем роуты
        const app = express()
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use('/v1', routes)


        // https://levelup.gitconnected.com/generating-swagger-api-docs-and-ui-automatically-for-express-js-apps-2ea1436a0f59
        const swaggerUI = require('swagger-ui-express')
        const options = require('../openapi.ts')
        const swaggerJSDoc = require('swagger-jsdoc');
        console.log(options.default)
        const specs = swaggerJSDoc(options.default)
        app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

        return app
    }


    private createServer(): Server {
        // поднятие сервера
        const server = createServer(this.app)
        return server
    }
    private async initDB(){
        await AppDataSource.initialize().then((status) => {
        }).catch((error) => console.log(error , " Initialize error"))
    }

    private async syncDB() {
        await AppDataSource.synchronize().then(() => {
        }).catch((error) => console.log(error, "Synchronize error"))
    }

    // private checkDBconnection() {
    //         const isInitialized: boolean = AppDataSource.isInitialized;
    //         console.log(isInitialized)
    //         if (isInitialized) {
    //             console.log('Connection has been established successfully.');
    //         } else {
    //             throw new DBError('Unable to connect to the database')
    //         }
    // }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App