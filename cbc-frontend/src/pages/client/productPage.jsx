import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard';

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            if(isLoading){
                axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                    (res) => {
                        setProducts(res.data);
                        setIsLoading(false);
                    }
                )
            }
        },[isLoading]
    )

    return (
        <div className="w-full h-full bg-red-900">
            {
            products.map((product) => {
                return (
                    <ProductCard key={product.productId} product={product} />
                );
            })}
        </div>
    );
}
