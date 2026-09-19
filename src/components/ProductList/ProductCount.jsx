import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '../../api/productsApi';

export default function ProductCount() {
    const { data, isPending } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 10_000,
        gcTime: 60_000,
    });

    if (isPending) {
        return <p>Loading product count...</p>;
    }

    return <p>Products count: {data.length}</p>;
}