
const BASE_URL = 'https://strangers-things.herokuapp.com/api';
const COHORT_NAME = '/2301-FTB-PT-WEB-PT';

const API_ENDPOINTS = {
    posts: "/posts",
    register: "/users/register",
    login: "/users/login",
    user: "/users/me",
}

const getURL = (endpoint) => {
    const path = API_ENDPOINTS[endpoint];
    if (!path) {
        throw new Error ("Invalid API endpoint specified");
    }

    return BASE_URL + COHORT_NAME + path;
}

const getOptions = (method, body, token) => ({
    method: method ? method.toUpperCase() : "GET",
    headers: {
        'Content-Type': 'application/json', 
        ...(token && {'Authorization': `Bearer ${token}`})
    },
    ...( body && { body: JSON.stringify(body) }),
});

export const fetchFromAPI = async({endpoint, method, body, token}) => {
    try {
        const result = await fetch(
            getURL(endpoint),
            getOptions(method, body, token),
        );
        const response = await result.json();
        if (response.error) throw response.error;
        return response?.data;
    } catch(e) {
        console.error(e);
    }
}