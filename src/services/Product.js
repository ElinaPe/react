import Axios from "axios"

const baseUrl = "https://reactkurssi.azurewebsites.net/api/products"
// const baseUrl = "https://localhost:7205/api/products"

const getAll = () => {
    const request = Axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newProduct => {
    return Axios.post(baseUrl, newProduct)
}

const remove = id => {
    return Axios.delete(`${baseUrl}/${id}`)
}

const update = object => {
    return Axios.put(`${baseUrl}/${object.productId}`, object)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update }