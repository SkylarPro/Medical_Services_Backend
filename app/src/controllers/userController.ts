import UserService from '../services/UserService'
import UserError from '../errors/users/User'
import {User} from '../entity/user/User'
import config from "../configs/config";

const config_api = config["API"]

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }
    passwordChange = async (request: any, response: any) => {
        // менять состояние в бд аунтификации
        const { oldPassword, newPassword } = request.body;
        if (!(oldPassword && newPassword)) {
            response.status(400).send("Data doesn't found ");
        }
        if (typeof oldPassword !== "string" || typeof newPassword !== "string") {
            response.status(400).send("Uncorrected data type");
        }
        await this.userService.change_password({ oldPassword, newPassword },request.user.id).then(status => {
            response.status(200).send("Password changed")
        }).catch(err => {
            response.status(404).send({"error":err})
        })
    };

    registration = async (request: any, response: any) => {
        try {
            // менять состояние в бд аунтификации
            await this.userService.create(request.body);
            response.status(201).send("Registration successful!");
        }catch (err){
            response.status(404).send({"error": err})
        }
    };

    login = async (request: any, response: any) => {
        let { email, password} = request.body;

        try{
            if (!(email && password)) {
                throw String(new UserError("No username or password"))
            }

            const token = await this.userService.login(email, password)

            response.status(200).send(token);
        }catch(err) {
            response.status(404).send({'error': err});
        }
    };

    get_profile = async (request: any, response: any) => {
        try {
            const user: User | UserError = await this.userService.getById(
                Number(request.params.id)
            )
            for (let field of config_api.ignore_field_user.split(' ')){
                // @ts-ignore
                delete user[field]
            }
            response.status(200).send(user)
        } catch (error) {
            response.status(404).send({
                "error": error
            })
        }

    }

    me = async (request: any, response: any) => {
        await this.userService.getById(request.user.id).then(self => {
            response.status(200).send(self)
        }).catch(err =>{
            response.status(404).send(err)
        })
    }

    delete = async (request: any, response: any) => {
        try {
            await this.userService.delete(request.user.id);
            response.status(200).send({"massage": 'user deleted'});
        } catch (error) {
            response.status(404).send({
                "error": error
            })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const user = await this.userService.update(request.user.id, request.body);
            response.status(200).send(user);
        } catch (error) {
            response.status(400).send({
                "error": error
            })
        }
    }
}
export default UserController
