import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cart.js";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    name,
    description,
    price,
    labelledPrice,
    image,
    stock,
    isAvailabel,
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${name} added to cart!`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
          }
        ]
      }
    });
  };

  return (
    <Link to={"/overview/"+product.productId} className="block">
      <div
        className={`w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
        ${!isAvailabel ? "opacity-60 pointer-events-none" : ""}`}
      >
        {/* Image */}
        <div className="relative h-52 bg-gray-100">
          <img
            src={image?.[0] || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/placeholder.svg";
            }}
          />

          {!isAvailabel && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-900">
            {name}
          </h3>

          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-900">
              ₨{price?.toFixed(2)}
            </span>

            {labelledPrice > price && (
              <span className="text-sm text-gray-400 line-through">
                ₨{labelledPrice?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div
            className={`text-sm font-medium ${
              stock > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "No stock available"}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-2">
            <button
              disabled={!isAvailabel || stock === 0}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold
              bg-blue-900 text-white transition-colors
              hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              disabled={!isAvailabel || stock === 0}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold
              bg-accent text-white transition-colors
              hover:bg-secondary disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
