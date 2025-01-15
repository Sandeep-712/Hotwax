import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

export const getItems = async () => await axios.get(API_URL);

export const addItem = async (item) => await axios.post(API_URL, item);

export const updateItem = async (id, item) => await axios.put(`${API_URL}/${id}`, item);

export const deleteItem = async (id) => await axios.delete(`${API_URL}/${id}`);
