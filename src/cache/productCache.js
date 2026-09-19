import { fetchProducts } from '../api/productsApi';

const cache = new Map();

const PRODUCTS_KEY = 'products';

export async function getProducts() {
    if (cache.has(PRODUCTS_KEY)) {
        console.log('⚡ CACHE HIT');

        return cache.get(PRODUCTS_KEY);
    }

    console.log('❌ CACHE MISS');

    const products = await fetchProducts();

    cache.set(PRODUCTS_KEY, products);

    return products;
}

export function clearProductsCache() {
    cache.delete(PRODUCTS_KEY);

    console.log('🗑️ PRODUCTS CACHE CLEARED');
}