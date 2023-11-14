import Axios from "axios"

const baseUrl = "https://reactkurssi.azurewebsites.net/nw/customers"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = Axios.get(baseUrl, config)
    return request.then(response => response.data)
}

const create = newCustomer => {
    const config = {
        headers: { Authorization: token },
    }
    return Axios.post(baseUrl, newCustomer, config)
}

const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return Axios.delete(`${baseUrl}/${id}`, config)
}

const update = object => {
    const config = {
        headers: { Authorization: token },
    }
    return Axios.put(`${baseUrl}/${object.customerId}`, object, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update, setToken }