import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogIn() {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password
      });
      toast.success("Login successful!");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if(response.data.role === "admin") {
        navigate("/admin/");
      }else{
        navigate("/");
      }
      
      // Handle successful login (e.g., redirect, store token, etc.)
    } catch (error) {
      toast.error(error.response.data.message);
      // Handle login failure (e.g., show error message)
    }
  }


  return (
    <div className="w-full h-screen bg-[url('/login-bg.jpg')] flex bg-cover bg-center items-center justify-evenly">
      <div className="w-[50%] h-full">

      </div>
      <div className="w-[50%] h-full flex items-center justify-center">

        <div className="w-[500px] h-[600px] backdrop-blur-md shadow-xl flex flex-col items-center justify-center rounded-[20px]">
          <input 
          onChange={
            (e) => 
            setEmail(e.target.value)
          }
          value={email}
          className="w-[300px] h-[50px] border border-[#ccc] rounded-[20px] my-5"/>
          <input 
          onChange={
            (e) => 
            setPassword(e.target.value)
          }
          value={password}
          type="password" className="w-[300px] h-[50px] border border-[#ccc] rounded-[20px] my-5"/>
          <button onClick={handleLogIn} className="w-[150px] h-10 cursor-pointer border border-[#ccc] text-white rounded-[20px] my-5">Log In</button>
        </div>
      </div>
    </div>
  );
}