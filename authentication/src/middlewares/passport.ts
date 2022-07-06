import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import AuthService from "../services/AuthService";
import config from "../configs/config";

//https://habr.com/ru/post/435106/

const config_jwt = config['JWT']
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    jsonWebTokenOptions: {
        maxAge: `${config_jwt.accessTokenLifetime}ms`
    }
}

const customJwtStrategy = new JwtStrategy(opts, async function(jwt_payload:any, next:any) {
    const authService = new AuthService()
    const user = await authService.getById(jwt_payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

passport.use("jwt",customJwtStrategy)

export { opts as jwtOptions }

export default passport