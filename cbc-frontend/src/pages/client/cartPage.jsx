import { useState } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart.js";
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full min-h-screen flex flex-col items-center px-4 pt-4 pb-28 md:pb-4 relative">
            {/* Desktop Summary Card */}
            <div className="z-50 hidden w-full md:w-[400px] h-auto md:h-[80px] shadow-2xl md:fixed md:top-1 md:right-1 md:flex flex-col items-start justify-start p-4 md:p-0 bg-white rounded-lg md:rounded-none">
                <p className="text-lg md:text-2xl text-secondary font-bold">Total:
                    <span className="text-accent font-bold mx-2">
                        ₨{getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-secondary transition-all duration-300 text-sm md:text-base mt-2 md:mt-0">
                    Checkout
                </Link>
            </div>

            {/* Cart Items */}
            <div className="w-full space-y-4">
            {
                cart.map(
                    (item) => {
                        return (
                            <div key={item.productId} className="w-full md:w-[600px] h-auto md:h-[100px] rounded-tl-3xl rounded-bl-3xl bg-primary shadow-2xl flex flex-col md:flex-row items-center justify-between relative p-4 md:p-0 gap-3 md:gap-0 mx-auto">
                                <img src={item.image} className="w-[80px] md:w-[100px] h-[80px] md:h-[100px] object-cover rounded-3xl"/>
                                <div className="flex-1 h-full flex flex-col justify-center items-center md:items-start pl-0 md:pl-4">
                                    <h1 className="text-base md:text-xl text-secondary font-semibold text-center md:text-left">{item.name}</h1>
                                    <h1 className="text-sm md:text-md text-gray-600 font-semibold">{item.productId}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                        <div className="flex gap-2 flex-col md:flex-row justify-center md:justify-start">
                                            <span className="text-sm md:text-md text-gray-500 line-through">₨{item.labelledPrice.toFixed(2)}</span>
                                            <span className="text-sm md:text-md font-bold text-accent">₨{item.price.toFixed(2)}</span>
                                        </div>
                                        : <span className="text-sm md:text-md font-bold text-accent">₨{item.price.toFixed(2)}</span>
                                    }
                                </div>
                                <div className="w-full md:w-auto h-full flex flex-row justify-evenly md:justify-evenly items-center gap-2">
                                    <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-base md:text-xl cursor-pointer aspect-square bg-accent"
                                    onClick={() => {
                                        addToCart(item, -1)
                                        setCart(getCart())
                                    }}>
                                        <BiMinus/>
                                    </button>
                                    <h1 className="text-base md:text-xl text-secondary font-semibold h-full flex items-center">{item.qty}</h1>
                                    <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-base md:text-xl cursor-pointer aspect-square bg-accent"
                                    onClick={() => {
                                        addToCart(item, 1)
                                        setCart(getCart())
                                    }}>
                                        <BiPlus/>
                                    </button>
                                </div>
                                {/* total */}
                                <div className="w-full md:w-[200px] h-full flex flex-col justify-center items-center md:items-end pr-0 md:pr-4 mt-2 md:mt-0">
                                    <h1 className="text-lg md:text-2xl text-secondary font-semibold">₨{(item.price * item.qty).toFixed(2)}</h1>
                                </div>
                                <button className="absolute text-red-600 cursor-pointer rounded-full hover:bg-red-600 hover:text-white p-2 top-2 right-2 md:right-[-35px]" onClick={
                                    () => {
                                    removeFromCart(item.productId)
                                    setCart(getCart())
                                }}>
                                    <BiTrash/>
                                </button>
                            </div>
                        );
                    }
                )
            }
            </div>

            {/* Mobile Summary Card */}
            <div className="z-40 fixed bottom-0 left-0 w-full md:hidden bg-white shadow-2xl flex flex-col items-start justify-start p-4 border-t border-gray-300">
                <p className="text-lg text-secondary font-bold">Total:
                    <span className="text-accent font-bold mx-2">
                        ₨{getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="text-white bg-accent px-4 py-2 rounded-lg hover:bg-secondary transition-all duration-300 w-full text-center text-sm mt-2">
                    Checkout
                </Link>
            </div>
            
        </div>
    );
}
