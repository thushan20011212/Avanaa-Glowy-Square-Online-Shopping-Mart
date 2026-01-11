import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ProductPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(
        () => { 
            if(isLoading == true){
                axios
                .get(import.meta.env.VITE_BACKEND_URL + "/products")
                .then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                    setIsLoading(false);
                });
            }
        }, [isLoading]
    );

    function deleteProduct(ProductId) {
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please Login First")
            return
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/"+ProductId , {
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then((res) => {
            toast.success("Product Deleted Successfully")
            setIsLoading(true)
        }).catch((e) => {
            toast.error(e.response.data.message)
        })
    }

    return (

    <div className="w-full h-full max-h-full overflow-y-scroll relative">
        <Link to="admin/addProduct" className="absolute cursor-pointer text-xl bottom-5 right-5 bg-green-500 text-white font-bold py-2 px-4 rounded text-center flex justify-center items-center">+</Link>
        {
        isLoading ? 
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-yellow-400 rounded-full animate-spin"></div>
        </div> :
        <table className="w-full text-center">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Labeled Price</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
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
                        <td>
                            <div className="flex justify-center items-center w-full">
                                <FaTrash onClick={() => deleteProduct(item.ProductId)} 
                                className="text-[20px] text-red-500 mx-2 cursor-pointer"/>
                                <FaEdit onClick={() => {
                                    navigate("/admin/editProduct/" , {
                                        state : item
                                    })
                                }} className="text-[20px] text-blue-500 mx-2 cursor-pointer"/>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        }
    </div>
  );
}