import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null

        });
        return response;
    } catch (error) {
        // if (error.response) {
        //     // The request was made and the server responded with a status code 
        //     console.error('API response error:', error.response.status);
        //     console.error('Error data:', error.response.data);
        // } else if (error.request) {
        //     // The request was made but no response was received 
        //     console.error('No response received:', error.request);
        // }
        // else {
        //     // Something happened in setting up the request that triggered an Error 
        //     console.error('Error during request setup:', error.message);
        // }
        throw error; // Rethrow the error for further handling if needed }

    }
}
