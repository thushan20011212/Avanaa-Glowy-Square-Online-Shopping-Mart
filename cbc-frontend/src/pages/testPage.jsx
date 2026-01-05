import { use, useState } from "react";

export default function TestPage() {

    const [count, setCount] = useState(0);
    const [status, setStatus] = useState("Passed");


    return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
            <div className="w-[450px] h-[250px]  shadow flex items-center justify-center">
                <button onClick={() => {
                    setCount(count - 1);
                } } className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer">
                    -
                </button>
                <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
                    {count}
                </span>
                <button onClick={() => {
                    setCount(count + 1);
                } } className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer">
                    +
                </button>
            </div>
            <div className="w-[450px] h-[250px] shadow flex flex-col items-center justify-center ">
                <span className={`text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center`}>
                    {status}
                </span>
                <div>
                    <button onClick={() => {
                        setStatus("Passed");
                    } } className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] mx-10 text-[20px] cursor-pointer">
                        Passed
                    </button>
                    <button onClick={() => {
                        setStatus("Failed");
                    } } className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer">
                        Failed
                    </button>
                </div>
            </div>
                
    </div>
    );
}