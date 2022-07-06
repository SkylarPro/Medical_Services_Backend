import {AppDataSource} from "../dataSource/data-source";
import {User} from "../entity/user/User";
import * as jwt from "jsonwebtoken";
import AuthError from "../errors/auth/Auth";
import config from "../configs/config";
import RefreshTokenService from "./RefreshToken";
import UserError from "../errors/users/User";
import {validate} from "class-validator";

const config_jwt = config['JWT']

class AuthService {

    public async getById(id: number): Promise<User> {
        return await AppDataSource.getRepository(User).findOneOrFail({ where: { id: id }}).then((user) => {
            return user;
        }).catch(err =>{
            throw err
        });
    }

    async get_jwt_token(id:number) {

        const user_repo  = await AppDataSource.getRepository(User)
        if (await user_repo.count({ where: { id: id} }) === 0){
            const user = new User()
            user.id = id
            await user_repo.save(user)
        }
        return await user_repo.findOneOrFail({ where: { id: id} }).then(async user => {
            const accessToken = jwt.sign(
                {id: user.id},
                config_jwt.secretOrKey,
            );
            const refreshTokenService = new RefreshTokenService(user)
            const refreshToken = await refreshTokenService.generateRefreshToken(-1)
            console.log(refreshToken)
            return {accessToken, refreshToken}
        }).catch(err => {
            throw String(new AuthError(err))
        })
    }
     async refreshToken(request: any):Promise<{ accessToken: string; refreshToken: string }> {
         const refreshToken = request.body.refreshToken
         console.log(refreshToken)
         if (refreshToken === undefined){
             throw String(new AuthError('Incorrect body'))
         }
         const refreshTokenService = new RefreshTokenService()
         return await refreshTokenService
             .isRefreshTokenExpired(refreshToken).then(async data => {
                 if (!data.isExpired && data.userId && data.tokenId) {
                     const user = await this.getById(data.userId)
                     const accessToken = jwt.sign({id: data.userId},
                         config_jwt.secretOrKey)
                     const refreshTokenService = new RefreshTokenService(user)
                     const refreshToken = await refreshTokenService.generateRefreshToken(data.tokenId)
                     return {accessToken, refreshToken}
                 } else {
                     throw String(new AuthError('Invalid credentials'))
                 }
             })
     }

}

export default AuthService