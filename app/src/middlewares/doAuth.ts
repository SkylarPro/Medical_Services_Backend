import fetch, {Headers} from "node-fetch";
import config from "../configs/config";
const api_config = config["API"]

export async function doAuth(id:number) {
    const address_auth = "http://auth:8800/v1/auth/doAuth"
    return await fetch(address_auth, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id,
            secret_token: api_config.secret_token
        })
    }).then(function (response: any) {
        return response.json();
    }).then(function (jsonResponse: any) {
        return jsonResponse;
    })
}