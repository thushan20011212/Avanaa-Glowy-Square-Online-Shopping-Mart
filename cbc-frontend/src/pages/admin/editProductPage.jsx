import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import { mediaUpload } from "../../utils/mediaUpload"



export default function EditProductPage() {

    const location = useLocation();
    const { id } = useParams();
    const productData = location.state;

    const [productId,setProductId] = useState(productData?.productId || productData?.ProductId || id || '') 
    const [name,setName] = useState(productData?.name || '')
    const [altNames,setAltNames] = useState(productData?.altNames?.join(",") || '')
    const [description,setDescription] = useState(productData?.description || '')
    const [images,setImages] = useState([])
    const [labelledPrice,setLabelledPrice] = useState(productData?.labelledPrice || 0)
    const [price,setPrice] = useState(productData?.price || 0)
    const [stock,setStock] = useState(productData?.stock || 0)
    const navigate = useNavigate()

    async function UpdateProduct() {

        if (!productId) {
            toast.error("Product ID is required")
            return
        }

        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please Login First")
            return
        }

        let imageUrls = productData?.image || [];

        const promisesArray = [];

        for (let i=0; i < images.length; i++){
            promisesArray[i] = mediaUpload(images[i]);
        }
        try{
            if(images.length > 0){
                imageUrls = await Promise.all(promisesArray);
            }

            console.log(imageUrls);

            const altNamesArray = altNames.split(",")

            const product = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                description : description,
                image : imageUrls,
                labelledPrice : labelledPrice,
                price : price,
                stock : stock
            }
            axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/"+productId , product , {
                headers : {
                    "Authorization" : "Bearer "+token
                }
            }).then((res) => {
                toast.success("Product Updated Successfully")
                navigate("/admin/products")

            }).catch((e) => {
                console.log("Error details:", e)
                console.log("Error response:", e.response)
                const errorMessage = e.response?.data?.message || e.message || "Failed to update product"
                toast.error(errorMessage)
            })

        } catch(e){
            console.log(e);
        }
    }

    return (
        <div className="w-full h-full flex-col justify-center items-center">
            <div className="text-3xl font-bold mb-4">Edit Product</div>
            <input type="text" disabled placeholder="Product Id" className="input input-bordered w-full max-w-x" value={productId} onChange={(e)=>setProductId(e.target.value)}/>
            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-x" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Alt Names" className="input input-bordered w-full max-w-x" value={altNames} onChange={(e)=>setAltNames(e.target.value)}/>
            <input type="text" placeholder="Description" className="input input-bordered w-full max-w-x" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <input type="file" placeholder="Images" multiple className="input input-bordered w-full max-w-x" onChange={(e)=>setImages(e.target.files)}/>
            <input type="number" placeholder="Labelled Price" className="input input-bordered w-full max-w-x" value={labelledPrice} onChange={(e)=>setLabelledPrice(e.target.value)}/>
            <input type="number" placeholder="price" className="input input-bordered w-full max-w-x" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-x" value={stock} onChange={(e)=>setStock(e.target.value)}/>
            <div className="w-full flex justify-center flex-row items-center mt-4">
                <Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={UpdateProduct}>Update Product</button>
            </div>
        </div>
    )
}