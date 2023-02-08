import { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { $authHost, $host} from './http.user';
import { IUser } from "./userSlice";



export const registration = async (email: string, password: string) => {
    const { data } = await $host.post<any, any>('user/registration', {email, password, role:'user'});    
    return jwt_decode(data);
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('user/login', {email, password});
    return jwt_decode(data);
}

export const check = async ( ) => {
    const response = $host.post('api/user/registration', );
    return response;
}