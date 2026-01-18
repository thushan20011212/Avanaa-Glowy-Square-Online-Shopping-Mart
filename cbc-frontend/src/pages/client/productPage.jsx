import axios from 'axios';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/productCard';

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
                    (res) => {
                        setProducts(res.data);
                        setIsLoading(false);
                    }
                ).catch(() => {
                    setIsLoading(false);
                })
            }
        },[isLoading]
    )

    return (
        <div className="w-full h-full p-6 bg-gray-50">
            {isLoading ? (
                <div className="w-full h-[60vh] flex justify-center items-center">
                    <div className="w-[60px] h-[60px] border-4 border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="w-full h-[60vh] flex justify-center items-center">
                    <p className="text-xl text-gray-500">No products available</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {
                    products.map((product) => {
                        return (
                            <ProductCard key={product.productId} product={product} />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
