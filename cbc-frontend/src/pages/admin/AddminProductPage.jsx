import { use, useState } from "react";

export default function AdminProductPage() {
  
    const [products, setProducts] = useState(sample);

    useEffect(
        () => { 
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
                console.log(res.data);
                setProducts(res.data);
            });
        }, []
    )
  
    return (

    <div className="w-full h-full max-h-full overflow-y-scroll">
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Labeled Price</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {products.map(
                    (item,index) => (
                    <tr key={item.id}>
                        <td>{item.ProductId}</td>
                        <td>{item.name}</td>
                        <td><img src={item.image[0]} className="w-[50px] h-[50px]"/></td>
                        <td>{item.labelledPrice}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </div>
  );
}