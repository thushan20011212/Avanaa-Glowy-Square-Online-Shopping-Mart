import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCart3 } from "react-icons/bs";

export default function Header() {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const navigate = useNavigate();

    return(
        <header className="w-full h-[80px] shadow-2xl flex justify-center relative">
            <GiHamburgerMenu className="text-3xl h-full md:hidden absolute left-2" onClick={
                () => {
                    setSideDrawerOpen(true)
                }
            }/> 
            <img onClick={() => {
                navigate("/")
            }} src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer"/>
            <div className="w-[calc(100%-160px)] h-full hidden md:flex items-center justify-center gap-6">
                <Link to="/" className="text-[20px] font-bold hover:text-blue-600 transition">Home</Link>
                <Link to="/products" className="text-[20px] font-bold hover:text-blue-600 transition">Products</Link>
                <Link to="/about" className="text-[20px] font-bold hover:text-blue-600 transition">About</Link>
                <Link to="/contact" className="text-[20px] font-bold hover:text-blue-600 transition">Contact</Link>
            </div>
            <Link to="/cart" className="w-[80px] h-[80px] hidden md:flex items-center justify-center hover:bg-blue-700 transition">
                <AiOutlineShoppingCart className="text-white text-3xl" title="Shopping Cart" />
            </Link>
            {
                sideDrawerOpen &&
                <div className="fixed h-screen w-full bg-[#00000060] flex md:hidden z-50">
                    <div className="w-[350px] bg-white h-full">
                        <div className="w-full h-[80px] shadow-2xl flex justify-center items-center relative">
                            <GiHamburgerMenu className="text-3xl h-full md:hidden absolute left-2 cursor-pointer" onClick={() => {
                                setSideDrawerOpen(false)
                            }}/>
                            <img onClick={() => {
                                window.location.href = "/";
                            }} src="/logo.png" alt="Logo" className="w-[40px] h-[40px] object-cover cursor-pointer"/>
                        </div>
                        <div className="w-full h-[calc(100%-80px)] flex flex-col item-center gap-2">
                            <a href="/" className="text-[20px] font-bold mx-2 my-4">Home</a>
                            <a href="/products" className="text-[20px] font-bold mx-2 my-4">Products</a>
                            <a href="/about" className="text-[20px] font-bold mx-2 my-4">About</a>
                            <a href="/contact" className="text-[20px] font-bold mx-2 my-4">Contact</a>
                            <a href="/cart" className="text-[20px] font-bold mx-2 my-4"><BsCart3 /></a>
                        </div>

                    </div>
                </div>
            }

        </header>
    )

}