import { apiClient } from "../lib/api/axios.js";

export async function fetchProducts() {
    console.log('🌐 API REQUEST: GET /products');


    const response = await apiClient.get('/products');

    return response.data.products;
}