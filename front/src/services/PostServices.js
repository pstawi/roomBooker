import axios from "../utils/axios";

const API_URL = 'http://localhost:5000/api/posts';

export const getAllPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getPostById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPost = async (postData) => {
    try {
        const response = await axios.post(API_URL, postData);
        return response.data;
    } catch (error) {
        console.error('Error details:', error.response?.data);
        throw error;
    }
};

export const updatePost = async (id, postData) => {
    const response = await axios.put(`${API_URL}/${id}`, postData);
    return response.data;
};

export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};