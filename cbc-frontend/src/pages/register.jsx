import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/",
        {
          email,
          firstName,
          lastName,
          password,
        }
      );

      toast.success("Registration successful!");
      console.log(response.data);

      navigate("/login"); // Redirect to login page after registration

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login-bg.jpg')] flex bg-cover bg-center items-center justify-evenly">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex items-center justify-center">

        <div className="w-[500px] h-[650px] backdrop-blur-md shadow-xl flex flex-col items-center justify-center rounded-[20px]">

          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="w-[300px] h-[50px] border border-[#ccc] rounded-[20px] my-3 px-4"
          />

          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="w-[300px] h-[50px] border border-[#ccc] rounded-[20px] my-3 px-4"
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-[300px] h-[50px] border border-[#ccc] rounded-[20px] my-3 px-4"
          />

          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-[300px] h-[50px] border border-[#ccc] rounded-[20px] my-3 px-4"
          />

          <button
            onClick={handleRegister}
            className="w-[150px] h-10 cursor-pointer border border-[#ccc] text-white rounded-[20px] my-5"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
