import { Route } from "react-router-dom";
import Header from "../components/Header";



export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
        <Header />
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<h1>404 not found</h1>} />
            </Routes>
        </div>
    </div>
  );
}
