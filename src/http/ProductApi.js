import {$accountancyHost, $authHost, $orderHost, $productHost, $storeHost, $withData} from "./index";
import axios from "axios";

export const receiveGoods = async (orderNumber) => {
    const {data} = await $storeHost.put(`store/receive/${orderNumber}` )
    console.log(data + "resp")
    return data
}

export const deliverGoods = async (orderNumber) => {
    const {data} = await $storeHost.put(`store/deliver/${orderNumber}`)
    console.log(data + "resp")
    return data
}

export const createDevice = async (device) => {
    console.log("INSIDE HTTP")
    const {data} = await $withData.post('products', {device})
    console.log(data)
    return data
}

export const createInvoice = async (invoiceItems) => {
    console.log("INSIDE HTTP")
    const {data} = await $accountancyHost.post('accountancy/invoice/income', invoiceItems)
    console.log(data)
    return data
}

const getToken = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    return token
}

export const createDevice2 = async (device) => {
    const data = await fetch(
        'http://localhost:5000/api/devices',
        {
            method: 'POST',
            body: device,
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }
    )
    return data
}

export const fetchProducts = async (size = 10, page = 0, search = '', sortField = 'price', sortDirection = 'ASC') => {
    const response = await $productHost
        .get(`products/search?size=${size}&page=${page}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`,)
    return response
}

export const fetchPopular = async (size = 5, page = 0,) => {
    const response = await $productHost.get(`products/popular?size=${size}&page=${page}`,)
    return response
}

export const AddToCart = async (orderItems = {}) => {
    const response = await $orderHost.post('orders',orderItems)
    return response
}

export const UpdateCart = async (orderItems = {}, orderNumber) => {
    const response = await $orderHost.put(`orders/${orderNumber}`, orderItems)
    return response
}

export const getDetailsCart = async (orderId) => {
    const response = await $orderHost.get(`orders/${orderId}/details`,)
    return response
}

export const confirmOrder= async (orderNumber={}) => {
    const response = await $orderHost.post(`orders/confirm/${orderNumber}`)
    return response
}

export const fetchOneProduct = async (id) => {
    const response = await $productHost.get(`products/details/${id}`)
    return response
}

export const payOrder = async (id,money=0) => {
    const response = await $accountancyHost.put(`accountancy/invoice/pay/${id}`,Object(money))
    return response
}

