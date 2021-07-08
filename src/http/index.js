import axios from "axios";
const URL = 'http://localhost:5000/'

const $host = axios.create({
      baseURL: URL
})

const $authHost = axios.create({
    baseURL: URL
})

const $withData = axios.create({
    baseURL: URL,
    headers: { "Content-Type": "multipart/form-data" }
})

const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$withData.interceptors.request.use(authInterceptor)

export  {
    $host,
    $authHost,
    $withData
}
