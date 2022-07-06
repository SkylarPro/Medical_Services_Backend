import AuthService from "../services/AuthService";
import AuthError from "../errors/auth/Auth";
import config from "../configs/config";

const config_API = config["API"]

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }


    doAuth = async (request: any, response: any) => {
        let { id, secret_token } = request.body;
        if (secret_token !== config_API.secret_token){
            response.status(404).send({'error': "Secret tokens don't match"});
        }
        try{
            if (!id) {
                throw String(new AuthError("No id"))
            }
            const token = await this.authService.get_jwt_token(id)
            response.status(200).send(token);
        }catch(err) {
            response.status(404).send({'error': err});
        }
    }

    isAuth = async (request: any, response: any) => {
        try{
            console.log("Auth app User id",request.user.id)
            response.status(200).send({id: request.user.id});
        }catch(err) {
            response.status(404).send({'error': err});
        }
    };

    refresh_token = async (request: any, response: any) => {
        try{
            let {accessToken, refreshToken} = await this.authService.refreshToken(request)
            response.status(200).send({accessToken, refreshToken})
        }catch(err) {
            response.status(400).send({"error": err});
        }
    };
}
export default AuthController;