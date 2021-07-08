import {$authHost, $host, $withData} from "./index";

export const createType = async (name) => {
    const {data} = await $authHost.post('api/types', {name})
    console.log(data)
    return data
}
export const editType = async (id,name) => {
    const {data} = await $authHost.put(`api/types/${id}`, {name})
    console.log(data)
    return data
}
export const deleteType = async (id) => {
    const {data} = await $authHost.delete(`api/types/${id}` )
    console.log(data)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/types', )
    return data
}

export const createBrand = async (name) => {
    const {data} = await $authHost.post('api/brands', {name})
    console.log(data)
    return data
}
export const editBrand = async (id,name) => {
    const {data} = await $authHost.put(`api/brands/${id}`, {name})
    console.log(data)
    return data
}
export const deleteBrand = async (id) => {
    const {data} = await $authHost.delete(`api/brands/${id}` )
    console.log(data)
    return data
}
export const fetchBrands= async () => {
    const {data} = await $host.get('api/brands', )
    return data
}

export const createDevice = async (device) => {
    console.log("INSIDE HTTP")
    const {data} = await $withData.post('api/devices', {device})
    console.log(data)
    return data
}

const getToken = ()=>{
    const token =  localStorage.getItem('token');
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

export const deleteDevice = async (id) => {
    const {data} = await $authHost.delete(`api/devices/${id}` )
    console.log(data)
    return data
}

export const editDevice2 = async (id,device) => {
    const data = await fetch(
        `http://localhost:5000/api/devices/${id}`,
        {
            method: 'PUT',
            body: device,
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        }
    )
    return data
}

export const fetchDevices= async (typeId,brandId,page,limit=12) => {
    const {data} = await $host.get('api/devices',{
        params: {typeId,brandId,page,limit}
    } )
    return data
}

export const fetchOneDevice= async (id) => {
    const {data} = await $host.get(`api/devices/${id}` )
    return data
}
