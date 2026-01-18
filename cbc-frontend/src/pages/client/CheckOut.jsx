import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiMinus , BiPlus , BiTrash } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";


export default function CheckOutPage() {
    const location = useLocation()
    const navigate = useNavigate()
    
    if (!location.state || !location.state.cart) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold text-secondary mb-4">No items in checkout</h1>
                <button 
                    onClick={() => navigate("/products")}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-secondary transition"
                >
                    Continue Shopping
                </button>
            </div>
        )
    }

    const [cart, setCart] = useState(location.state?.cart || [])
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    function getTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty
        })
        return total
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
        toast.success("Item removed from checkout");
    }

    function changeQty(index, change) {
        const newCart = [...cart];
        const newQty = newCart[index].qty + change;
        
        if (newQty <= 0) {
            removeFromCart(index);
            return;
        }
        
        newCart[index].qty = newQty;
        setCart(newCart);
    }

    async function placeOrder(){
        const token = localStorage.getItem("token")
        if(!token) {
            toast.error("You need to be logged in to place an order.")
            return
        }

        if(!phoneNumber || !address) {
            toast.error("Please fill in all fields")
            return
        }

        if(cart.length === 0) {
            toast.error("Cart is empty")
            return
        }

        const orderInformation = {
            products: cart.map(item => ({
                productId: item.productId,
                qty: item.qty
            })),
            phone: phoneNumber,
            address: address
        }

        try{
            // TODO: Implement /api/orders endpoint in backend
            // For now, show success message without sending to server
            toast.success("Order placed successfully! (Feature coming soon)")
            console.log("Order details:", orderInformation)
            
            // Uncomment below when orders API is ready:
            // const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", orderInformation, {
            //     headers: { Authorization: "Bearer " + token }
            // });
            // if (res.status === 201) {
            //     navigate("/");
            // }
        } catch (err) {
            console.error(err)
            toast.error("Failed to place order.")
            return
        }

    }

    return (
        <div className="w-full h-full flex flex-col items-center pt-4 relative">
            {/* Summary Card */}
            <div className="w-full max-w-[600px] mb-6 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-secondary mb-4">Order Summary</h2>
                <p className="text-xl text-secondary font-bold mb-4">
                    Total: <span className="text-accent">₨{getTotal().toFixed(2)}</span>
                </p>
                
                <div className="space-y-3 mb-4">
                    <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Address" 
                        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>
                
                <button 
                    onClick={placeOrder}
                    className="w-full text-white bg-accent px-4 py-3 rounded-lg hover:bg-secondary transition-all duration-300 font-semibold"
                >
                    Place Order
                </button>
            </div>

            {/* Cart Items */}
            <div className="w-full max-w-[600px] space-y-4">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No items in checkout</p>
                    </div>
                ) : (
                    cart.map((item, index) => {
                        return (
                            <div key={item.productId + index} className="w-full h-24 rounded-xl bg-primary shadow-md flex flex-row items-center justify-between p-4 relative">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover rounded-lg"/>
                                
                                <div className="flex-1 flex flex-col justify-center items-start pl-4">
                                    <h1 className="text-lg text-secondary font-semibold">{item.name}</h1>
                                    <h1 className="text-sm text-gray-600">{item.productId}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                        <div>
                                            <span className="text-sm text-gray-500 line-through">₨{item.labelledPrice.toFixed(2)}</span>
                                            <span className="text-sm font-bold text-accent ml-2">₨{item.price.toFixed(2)}</span>
                                        </div>
                                        : <span className="text-sm font-bold text-accent">₨{item.price.toFixed(2)}</span>
                                    }
                                </div>
                                
                                <div className="flex flex-row gap-2 items-center">
                                    <button 
                                        className="text-white font-bold rounded-lg p-1 bg-accent hover:bg-secondary transition"
                                        onClick={() => changeQty(index, -1)}
                                    >
                                        <BiMinus/>
                                    </button>
                                    <span className="text-lg font-semibold text-secondary w-8 text-center">{item.qty}</span>
                                    <button 
                                        className="text-white font-bold rounded-lg p-1 bg-accent hover:bg-secondary transition"
                                        onClick={() => changeQty(index, 1)}
                                    >
                                        <BiPlus/>
                                    </button>
                                </div>
                                
                                <div className="w-24 text-right">
                                    <p className="text-lg font-semibold text-secondary">₨{(item.price * item.qty).toFixed(2)}</p>
                                </div>
                                
                                <button 
                                    className="text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition"
                                    onClick={() => removeFromCart(index)}
                                >
                                    <BiTrash/>
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
