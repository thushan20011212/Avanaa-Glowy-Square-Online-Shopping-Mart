import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Header() {
    const navigate = useNavigate();

    return(
        <header className="w-full h-[80px] shadow-2xl flex items-center">
            <img onClick={() => {
                navigate("/")
            }} src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover cursor-pointer"/>
            <div className="w-[calc(100%-160px)] h-full flex items-center justify-center gap-6">
                <Link to="/" className="text-[20px] font-bold hover:text-blue-600 transition">Home</Link>
                <Link to="/products" className="text-[20px] font-bold hover:text-blue-600 transition">Products</Link>
                <Link to="/about" className="text-[20px] font-bold hover:text-blue-600 transition">About</Link>
                <Link to="/contact" className="text-[20px] font-bold hover:text-blue-600 transition">Contact</Link>
            </div>
            <Link to="/cart" className="w-[80px] h-[80px] bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition">
                <AiOutlineShoppingCart className="text-white text-3xl" title="Shopping Cart" />
            </Link>
        </header>
    )

}