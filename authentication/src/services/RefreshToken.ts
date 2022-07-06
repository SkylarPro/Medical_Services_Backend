import {AuthToken} from "../entity/token/AuthToken";
import {AppDataSource} from "../dataSource/data-source";
import {User} from "../entity/user/User";
import { randomUUID } from "crypto"
import config from "../configs/config";
import AuthError from "../errors/auth/Auth";
import {where} from "@sequelize/core";

const config_jwt = config['JWT']

class RefreshTokenService {
    private user: User | null

    constructor(user: User | null = null) {
        this.user = user
    }

    generateRefreshToken = async (tokenId:number) : Promise<string> => {
        const token = randomUUID()
        const userId = this.user?.id
        const authrepo = await AppDataSource.getRepository(AuthToken)
        const isfisrt = await authrepo.count({ where: { userId: userId } })

        if (isfisrt === 0){
            await authrepo.save({userId: userId, token}).catch(err  => {
                console.log(err)
                throw String(new AuthError(String(err)))
            })
        }
        else if (tokenId!==-1){
            await authrepo.save({id:tokenId,userId:userId,
                token  }).catch(err  => {
                console.log(err)
                throw String(new AuthError(String(err)))
            })
        }
        else{
            try {
                await authrepo.createQueryBuilder().update({
                    token:token}).where({userId:userId})
                    .execute()
            }catch (err) {
                throw String(new AuthError(String(err)))
            }
        }
        return token
    }

    isRefreshTokenExpired = async (token: string) : Promise<{ tokenId: null|number; isExpired: boolean; userId: number|null }> => {
        const refreshToken = await AppDataSource.getRepository(AuthToken).findOne({ where: { token:token } })
        console.log(refreshToken)
        if (refreshToken) {
            const tokenData = refreshToken
            const currentDate = new Date()
            const timeDelta = currentDate.getTime() - tokenData.created_at.getTime()

            if (timeDelta > 0 && timeDelta < config_jwt.refreshTokenLifetime) {
                return {tokenId: tokenData.id, userId: tokenData.userId, isExpired: false }
            }
            return {tokenId: null, userId: null, isExpired: true }
        }
        return {tokenId: null, userId: null, isExpired: true }
    }
}

export default RefreshTokenService