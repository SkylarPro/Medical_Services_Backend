import {User} from "../entity/user/User"
import UserError from '../errors/users/User'
import {AppDataSource} from '../dataSource/data-source'
import {validate} from "class-validator";
import {doAuth} from "../middlewares/doAuth";


class UserService {
    public async getById(id: number,get_analysis = false): Promise<User> {
        return await AppDataSource.getRepository(User).findOneOrFail({ where: { id: id },relations: {
                analysis: get_analysis,
            }}).then((user) => {
                return user;
        }).catch(err =>{
            throw err
        });
    }
    public async login(email: string, password:string): Promise<User | void> {
        return await AppDataSource.getRepository(User).findOneOrFail(
            { where: { email: email}}).then((user) => {
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                        throw String(new UserError("Password doesn't match"))
            }
            const tokens = doAuth(user.id)
            return tokens;
        }).catch(err =>{
            throw err
        });
    }

    public async getByEmail(email: string): Promise<User> {
        return await AppDataSource.getRepository(User).findOne({where: {email: email}}).then((user) => {
            if (!user) {
                throw new UserError(`User (id=${email}) does not exist`);
            }
            return user;
        });
    }

    public async create(userData: User): Promise<User | void>  {
        try{
            const repo_user = await AppDataSource.getRepository(User)
            const user = repo_user.create(userData)

            user.analysis = []
            const errors = await validate(user);

            if (errors.length > 0) {
                throw String(new UserError(String(errors)))
            }
            user.hashPassword()
            await repo_user.save(user)
        }catch (err) {
            throw String(new UserError(String(err)))
        }
    }
    public async delete(id:number): Promise<void>{
        try{
            const user = await this.getById(id);
            await AppDataSource.getRepository(User).remove(user);
        }catch(err){
           throw err
        }
    }
    public async update(id:number, userData: User): Promise<User>{
        //обновление в раммках себя
        try {
            userData.id = id
            if ("password" in userData){
                throw String(new UserError("You cannot change your password, please change" +
                    " your password in auth/change-password"))
            }

            const repo_user = await AppDataSource.getRepository(User)
            const errors_user: any = await validate(userData);

            if (errors_user.length > 0) {
            throw String(new UserError(errors_user))
            }
            await repo_user.createQueryBuilder().update(userData).where({
                id: id,
            }).execute()
            return await this.getById(id)

        } catch (err) {
            throw String(new UserError(String(err)))
        }
    }
    async change_password(passwords: any, id:number) {
        const { oldPassword, newPassword } = passwords
        await AppDataSource.getRepository(User).findOneOrFail({where: {id: id}}).then(async user =>{
            if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
                throw String(new UserError('Password incorrect'))
            }
            user.password = newPassword
            const errors = await validate(user);
            if (errors.length > 0) {
                throw String(new UserError("Password aren't going validate"))
            }
            user.hashPassword()

            await AppDataSource.getRepository(User).save(user)
            return true;
        }).catch(err => {
            throw err;
        })
    }
}

export default UserService