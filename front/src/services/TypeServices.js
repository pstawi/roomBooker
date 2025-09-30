import axios from "../utils/axios";

const API_URL = 'http://localhost:5000/api/types';

export const getAllTypes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};