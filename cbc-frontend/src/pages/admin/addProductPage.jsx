import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { mediaUpload } from "../../utils/mediaUpload.jsx"



export default function AddProductPage() {

    const [productId,setProductId] = useState('') 
    const [name,setName] = useState('')
    const [altNames,setAltNames] = useState('')
    const [description,setDescription] = useState('')
    const [images,setImages] = useState([])
    const [labelledPrice,setLabelledPrice] = useState(0)
    const [price,setPrice] = useState(0)
    const [stock,setStock] = useState(0)
    const navigate = useNavigate()

    async function AddProduct() {

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please Login First")
            return
        }

        if (images.length <=0){
            toast.error("Please select at least one image")
            return
        }

        // Validate required fields
        if (!productId || !name || !description || !labelledPrice || !price || !stock) {
            toast.error("Please fill in all required fields")
            return
        }

        const promisesArray = [];

        for (let i=0; i < images.length; i++){
            promisesArray[i] = mediaUpload(images[i]);
        }
        try{
            const imageUrls = await Promise.all(promisesArray);
            console.log("Image URLs uploaded:", imageUrls);

            const altNamesArray = altNames ? altNames.split(",").filter(name => name.trim() !== "") : []

            const product = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                description : description,
                image : imageUrls,
                labelledPrice : parseFloat(labelledPrice),
                price : parseFloat(price),
                stock : parseInt(stock),
                isAvailabel : true
            }
            console.log("Product being sent:", product);
            
            axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products" , product , {
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then((res) => {
                toast.success("Product Added Successfully")
                navigate("/admin/products")

            }).catch((e) => {
                console.log("Error details:", e)
                console.log("Error response:", e.response)
                const errorMessage = e.response?.data?.message || e.message || "Failed to add product"
                toast.error(errorMessage)
            })

        } catch(e){
            console.log("Upload error:", e);
            toast.error("Failed to upload images: " + e);
        }
    }

    return (
        <div className="w-full h-full p-6 overflow-y-auto bg-linear-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary mb-2">Add New Product</h1>
                <p className="text-gray-600">Fill in all the details below to create a new product</p>
            </div>

            {/* Form Container */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                
                {/* Product ID & Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product ID *</label>
                        <input 
                            type="text" 
                            placeholder="e.g., PROD_001_MOISTURIZER" 
                            className="input input-bordered w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2"
                            value={productId} 
                            onChange={(e)=>setProductId(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">Unique identifier for the product</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                        <input 
                            type="text" 
                            placeholder="e.g., Hydrating Face Moisturizer" 
                            className="input input-bordered w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2"
                            value={name} 
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Alternative Names */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alternative Names</label>
                    <input 
                        type="text" 
                        placeholder="e.g., Daily Hydration Cream, Moisture Boost Lotion (comma separated)" 
                        className="input input-bordered w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2"
                        value={altNames} 
                        onChange={(e)=>setAltNames(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple names with commas</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea 
                        placeholder="Enter detailed product description..." 
                        className="w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2 min-h-28 resize-none"
                        value={description} 
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>

                {/* Pricing Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Labelled Price (LKR) *</label>
                        <input 
                            type="number" 
                            placeholder="e.g., 45000" 
                            className="input input-bordered w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2"
                            value={labelledPrice} 
                            onChange={(e)=>setLabelledPrice(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">Original/marked price in LKR</p>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price (LKR) *</label>
                        <input 
                            type="number" 
                            placeholder="e.g., 32000" 
                            className="input input-bordered w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2"
                            value={price} 
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">Final selling price in LKR</p>
                    </div>
                </div>

                {/* Stock */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                    <input 
                        type="number" 
                        placeholder="e.g., 50" 
                        className="input input-bordered w-full border-2 border-gray-300 focus:border-accent focus:outline-none rounded-lg px-4 py-2"
                        value={stock} 
                        onChange={(e)=>setStock(e.target.value)}
                    />
                </div>

                {/* Images Upload */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                    <div className="border-2 border-dashed border-accent rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition">
                        <input 
                            type="file" 
                            multiple 
                            className="hidden" 
                            id="imageInput"
                            onChange={(e)=>setImages(e.target.files)}
                        />
                        <label htmlFor="imageInput" className="block cursor-pointer">
                            <div className="text-accent text-3xl mb-2">📸</div>
                            <p className="font-semibold text-gray-700">Click to select images</p>
                            <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, WebP</p>
                        </label>
                    </div>
                    {images.length > 0 && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-accent font-semibold">✓ {images.length} image(s) selected</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6 border-t border-gray-200">
                    <Link 
                        to="/admin/products" 
                        className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </Link>
                    <button 
                        onClick={AddProduct}
                        className="px-6 py-3 rounded-lg font-semibold bg-accent text-white hover:bg-secondary transition shadow-md"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}