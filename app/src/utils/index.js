import axios from 'axios';

const URL_API = 'http://localhost:3002';

export const callService = async ({ method, url, config }) => {
    try {
        const response = await axios({
            method,
            url: `${URL_API}${url}`,
            data: config
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const capitalize = word => {
    return word.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
};