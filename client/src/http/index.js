import axios from "axios";

const $host = axios.create({ // инстанс для запросов, не требующих авторизации
    baseURL: process.env.REACT_APP_API_URL, 
}) 

const $authHost = axios.create({ // инстанс для запросов, требующих авторизацию. автоматически подставляется хеддер authorization и добавляеться токен
    baseURL: process.env.REACT_APP_API_URL
}) 

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` // подставляем токен
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}