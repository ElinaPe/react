import axios from 'axios';

const url = "https://reactkurssi.azurewebsites.net/api/Authentication";

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth);
    return request.then(response => response);
};

const authenticationService = {
    authenticate
    
};

export default authenticationService;