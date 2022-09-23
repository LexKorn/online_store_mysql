import { $authHost} from "./index";

export const addToBasket = async (deviceId) => {
    const {response} = await $authHost.post('api/basket', deviceId)
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}

export const deleteFromBasket = async (id) => {
    const {data} = await $authHost.delete('api/basket/' + id)
    return data
}