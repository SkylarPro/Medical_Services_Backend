import passport from 'passport'
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import UserService from "../services/UserService";
import config from "../configs/config";
import { RequestInfo, RequestInit } from 'node-fetch';
import {Headers} from "node-fetch";
const fetch = require('node-fetch')

//https://habr.com/ru/post/435106/

const config_jwt = config['JWT']
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `${config_jwt.accessTokenLifetime}ms`
    },
    passReqToCallback: true
}

async function isAuth(rawToken: string) {
    const address_auth = "http://auth:8800/v1/auth/isauth"
    console.log("isAuth request")
    return await fetch(address_auth, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + rawToken,
            'Content-Type': 'application/json'
        }),
    }).then(function (response: any) {
        return response.json();
    }).then(function (jsonResponse: any) {
        return jsonResponse;
    })
}

const customJwtStrategy = new JwtStrategy(opts, async function(req:any, jwt_payload:any, next:any) {

    const userService = new UserService()
    const rawToken = req.headers['authorization'].split(' ')[1];
    console.log(rawToken)
    const res = await isAuth(rawToken)
    const id = res.id

    // делаю запрос в микросервис авторизации rawToken и оттуда летит ответ с id пользователя
    //jwt_payload -> чекаю его в промежуточной бд и все?
    // auth должен регать в бд app

    // @ts-ignore
    const user = await userService.getById(id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use("jwt",customJwtStrategy)

export { opts as jwtOptions }

export default passport