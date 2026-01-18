import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load products");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    if (!productId || productId.toString().length === 0) {
      toast.error("Product ID is invalid");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const deleteUrl = import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId;

    axios
      .delete(deleteUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Delete failed");
      });
  }

  return (
    <div className="w-full h-full p-6 overflow-y-auto relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary">
          Product Management
        </h1>

        <Link
          to="/admin/addProductPage"
          className="bg-accent hover:bg-secondary hover:text-white transition px-5 py-2 rounded-lg font-semibold shadow"
        >
          + Add Product
        </Link>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <div className="w-[60px] h-[60px] border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-accent text-secondary">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Product ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Labelled Price</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr
                    key={item._id || item.productId || item.id || index}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.productId}</td>
                    <td className="p-3 font-medium">{item.name}</td>

                    <td className="p-3 flex justify-center">
                      <img
                        src={item.image?.[0] || "/placeholder.svg"}
                        alt={item.name}
                        className="w-[50px] h-[50px] object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                    </td>

                    <td className="p-3">{item.labelledPrice} LKR</td>
                    <td className="p-3 font-semibold">{item.price} LKR</td>
                    <td className="p-3">{item.stock}</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-4">
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:scale-110 transition"
                          onClick={() => deleteProduct(item.productId || item._id)}
                        />
                        <FaEdit
                          className="text-blue-500 cursor-pointer hover:scale-110 transition"
                          onClick={() =>
                            navigate(
                              `/admin/editProductPage/${item.productId || item._id}`,
                              { state: item }
                            )
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
