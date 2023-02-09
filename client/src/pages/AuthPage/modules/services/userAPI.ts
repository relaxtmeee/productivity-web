import jwt_decode from "jwt-decode";
import { $authHost, $host} from './http.user';


export const registration = async (email: string, password: string) => {
    const { data } = await $host.post<any, any>('user/registration', {email, password, role:'user'});    
    localStorage.setItem('token', data);
    return jwt_decode(data);
}

export const login = async (email: string, password: string) => {
    const { data } = await $host.post('user/login', {email, password});
    localStorage.setItem('token', data);
    return jwt_decode(data);
}

export const check = async ( ) => {
    const { data } = await $authHost.get('user/auth', );
    localStorage.setItem('token', data);
    return jwt_decode(data);
}