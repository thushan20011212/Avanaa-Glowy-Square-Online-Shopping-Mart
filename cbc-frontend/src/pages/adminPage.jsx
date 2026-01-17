import { Link } from "react-router-dom";
import { Route, Routes , useLocation } from "react-router-dom";
import AdminProductPage from "./admin/productPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrderPage from "./admin/adminOrderPage";


export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;

  function getClass(name){
    if(path.includes(name)){
      return "bg-accent text-white p-4"
    }
    return "text-accent p-4"
  }

  return (
    <div className="w-full h-screen flex bg-accent">
        <div className="h-full w-[300px]  flex flex-col text-accent font-bold px-4 gap-6 text-xl bg-white">
            <Link to="/admin/products" className={getClass("products")}>Products</Link>
            <Link to="/admin/orders" className={getClass("orders")}>Orders</Link>
            <Link to="/admin/users" className={getClass("users")}>Users</Link>
            <Link to="/admin/reviews" className={getClass("reviews")}>Reviews</Link>
        </div>
        <div className="h-full w-[calc(100%-300px)] border-accent border-4 rounded-xl bg-white">
          <Routes path="/*">
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrderPage />} />
            <Route path="/users" element={<h1>Admin Users</h1>} />
            <Route path="/reviews" element={<h1>Admin Reviews</h1>} />
            <Route path="/addProductPage" element={<AddProductPage />} />
            <Route path="/editProductPage/:id" element={<EditProductPage />} />
          </Routes>
        </div>
    </div>
  );
}
