import axios from "axios";
const productURL = 'http://localhost:8081/api/v1/'
const orderURL = 'http://localhost:8082/api/v1/'
const storeURL = 'http://localhost:8083/api/v1/'
const accountancyURL = 'http://localhost:8084/api/v1/'

const $productHost = axios.create({
      baseURL: productURL
})

const $orderHost = axios.create({
    baseURL: orderURL
})

const $accountancyHost = axios.create({
    baseURL: accountancyURL
})

const $storeHost = axios.create({
    baseURL: storeURL
})

const $authHost = axios.create({
    baseURL: productURL
})

const $withData = axios.create({
    baseURL: productURL,
    headers: { "Content-Type": "multipart/form-data" }
})

const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$withData.interceptors.request.use(authInterceptor)

export  {
    $productHost,
    $authHost,
    $withData,
    $orderHost,
    $accountancyHost,
    $storeHost
}
