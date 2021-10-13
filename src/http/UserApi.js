import {$authHost, $productHost} from "./index";
import jwtDecode from "jwt-decode";


export const registration = async (email, password) => {
    const {data} = await $productHost.post('api/user/registration', {email, password, role: 'ADMIN'})
    console.log(data)
    return data
}

export const login = async (email, password) => {
    const {data} = await $productHost.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    const user = jwtDecode(data.token)
    localStorage.setItem('user', JSON.stringify(user))
    return user;
}

export const check = async () => {
    const response = await $authHost.get('api/user/auth')
    return response
}

const getUserRole = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user!=null){
    return user.role
    }else{
        return null
    }
}

export const isAdmin = () => {
    const role = getUserRole().toString()
    if(role!=null){
        return role===('ADMIN');
    }
}
