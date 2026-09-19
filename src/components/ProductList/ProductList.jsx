import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './products.module.css';
import { fetchProducts } from '../../api/productsApi';

export default function ProductList() {
    const [searchingProduct, setSearchingProduct] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const {
        data,
        isPending,
        isFetching,
        isError,
        error,
    } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 10_000,
        gcTime: 60_000,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchingProduct);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [searchingProduct]);

    if (isPending) {
        return <p>Loading products...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    const filteredProducts = data.filter((product) =>
        product.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
    );

    return (
        <section className={styles.productList}>
            <h1>Products from DummyJSON</h1>

            <input
                type="text"
                value={searchingProduct}
                onChange={(e) => setSearchingProduct(e.currentTarget.value)}
                placeholder="Search products..."
            />

            {isFetching && <p>Updating...</p>}

            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        <div className={styles.product}>
                            <span>
                                {product.title} — ${product.price}
                            </span>

                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}