
const BASE_URL = 'https://strangers-things.herokuapp.com/api';
const COHORT_NAME = '/2301-FTB-PT-WEB-PT';

    const getURL = (path) => {
        const url = BASE_URL + COHORT_NAME + path;
        return url
    }

const getOptions = (method, body, token) => ({
    method: method ? method.toUpperCase() : "GET",
    headers: {
        'Content-Type': 'application/json', 
        ...(token && {'Authorization': `Bearer ${token}`})
    },
    ...( body && { body: JSON.stringify(body) }),
});

export const callAPI = async({path, method, body, token}) => {
    try {
        const result = await fetch(
            getURL(path),
            getOptions(method, body, token),
        );
        const response = await result.json();
        if (response.error) throw response.error;
        return response?.data;
    } catch(e) {
        console.error(e);
    }
}