import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import ImageSlider from "../../components/imageSlider"
import Loading from "../../components/loading"
import { addToCart } from "../../utils/cart.js"

export default function ProductOverviewPage() {
    const params = useParams()
    const navigate = useNavigate()
    const productId = params.id
    const [status, setStatus] = useState("loading") //loading ,success, error
    const [product, setProduct] = useState(null)

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then(
                (response) => {
                    setProduct(response.data)
                    setStatus("success")
                }
            ).catch(
                (error) => {
                    console.error(error)
                    setStatus("error")
                    toast.error("Failed to fetch product")
                });
        },[]);

        return (
            <>
               {status == "success" && (
                <div className="w-full h-full flex flex-col md:flex-row md:max-h-full md:overflow-y-scroll pt-4">
                    <h1 className="w-full md:hidden block my-8 text-center text-4xl text-secondary font-semibold">
                                {product.name}
                                {
                                    product.altNames && product.altNames.map((altName, index) => {      
                                        return (
                                        <span key={index} className="text-4xl text-gray-600">{" | " +altName}</span>
                                        )
                                    })  
                                }
                            </h1>
                    <div className="w-full md:w-[50%] md:h-full flex justify-center ">
                        <ImageSlider images={product.image || []} />
                    </div>
                    <div className="md:w-[50%] w-full md:h-full flex justify-center">
                        <div className="md:w-[500px] md:h-[600px] w-full flex flex-col items-center">
                            <h1 className="w-full hidden md:block text-center text-4xl text-secondary font-semibold">
                                {product.name}
                                {
                                    product.altNames && product.altNames.map((altName, index) => {      
                                        return (
                                        <span key={index} className="text-4xl text-gray-600">{" | " +altName}</span>
                                        )
                                    })  
                                }
                            </h1>
                            
                            {/* product Id */}
                            <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productId}</h1>
                            <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.description}</p>
                            {
                                product.labelledPrice > product.price ? 
                                    <div>
                                        <span className="text-4xl mx-4 text-gray-500 line-through">₨{product.labelledPrice.toFixed(2)}</span>
                                        <span className="text-4xl mx-4 font-bold text-accent">₨{product.price.toFixed(2)}</span>
                                    </div> 
                                    : <span className="text-4xl mx-4 font-bold text-accent">₨{product.price.toFixed(2)}</span>
                            }

                            <div className="w-full flex flex-col md:flex-row gap-2 justify-center items-center mt-4">
                                <button 
                                    className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300"
                                    onClick={ () => {
                                        addToCart(product, 1);
                                        toast.success(`${product.name} added to cart!`);
                                    }}>
                                    Add to Cart
                                </button>
                                <button 
                                    className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-secondary/80 transition-all duration-300"
                                    onClick={ () => {
                                        navigate("/checkout", { 
                                            state: { 
                                                cart: [
                                                    {
                                                        productId: product.productId,
                                                        name: product.name,
                                                        image: product.image?.[0] || "/placeholder.svg",
                                                        price: product.price,
                                                        labelledPrice: product.labelledPrice,
                                                        qty: 1
                                                    },
                                                ],
                                            }, 
                                        });
                                    }}>
                                        Buy Now
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
              )}
              {
                status == "loading" && <Loading />
              }
            
            </>
        );

}
