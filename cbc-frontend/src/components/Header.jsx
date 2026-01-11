import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    console.log("Header Component Loading")

    return(
        <Header className="w-full h-[80px] bg-white shadow-md flex justify-between items-center px-4">
    )

}