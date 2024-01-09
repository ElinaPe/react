import Axios from "axios"

const baseUrl = "https://reactkurssi.azurewebsites.net/nw/users"
//const baseUrl = "https://localhost:7205/nw/users"

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

const create = newUser => {
    const config = {
        headers: { Authorization: token },
    }
    return Axios.post(baseUrl, newUser, config)
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
    return Axios.put(`${baseUrl}/${object.userId}`, object, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update, setToken }