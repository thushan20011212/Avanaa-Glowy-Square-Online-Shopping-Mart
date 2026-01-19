import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images || []
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className="w-[500px] h-[600px] bg-gray-100 rounded-3xl flex items-center justify-center">
                <img src="/placeholder.svg" className="w-full h-full object-cover rounded-3xl" />
            </div>
        )
    }

    return(
        <div className="w-[90% ] md:w-[500px] h-[600px] ">
            <img 
                src={images[currentIndex]} 
                className="w-full h-full object-cover rounded-3xl" 
                onError={(e) => {
                    e.target.src = "/placeholder.svg"
                }}
            />
            <div className="w-full h-[100px] flex justify-center items-center">
                {
                images?.map(
                    (image, index) => {
                        return(
                            <img 
                                key={index} 
                                className={"w-[90px] h-[90px] m-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-accent "+(index==currentIndex&&"border-accent border-4")} 
                                src={image}
                                alt={"Product view " + (index + 1)}
                                onError={(e) => {
                                    e.target.src = "/placeholder.svg"
                                }}
                                onClick={() => { 
                                    setCurrentIndex(index)
                                }}
                            />
                        )
                    })}
            </div>
        </div>
    )
}