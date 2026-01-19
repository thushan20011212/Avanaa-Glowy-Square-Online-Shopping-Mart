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
    <div className="w-full min-h-screen bg-[url('/login-bg.jpg')] flex bg-cover bg-center items-center justify-center md:justify-evenly px-4 py-6">
      <div className="hidden md:block w-[50%] h-full"></div>

      <div className="w-full md:w-[50%] h-auto md:h-full flex items-center justify-center py-8 md:py-0">

        <div className="w-full max-w-[350px] md:max-w-[500px] h-auto backdrop-blur-md shadow-xl flex flex-col items-center justify-center rounded-[20px] p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Register</h1>

          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="w-full max-w-[300px] h-[45px] border border-[#ccc] rounded-[15px] my-2 px-4 text-sm md:text-base focus:outline-none focus:border-accent"
          />

          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="w-full max-w-[300px] h-[45px] border border-[#ccc] rounded-[15px] my-2 px-4 text-sm md:text-base focus:outline-none focus:border-accent"
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full max-w-[300px] h-[45px] border border-[#ccc] rounded-[15px] my-2 px-4 text-sm md:text-base focus:outline-none focus:border-accent"
          />

          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full max-w-[300px] h-[45px] border border-[#ccc] rounded-[15px] my-2 px-4 text-sm md:text-base focus:outline-none focus:border-accent"
          />

          <button
            onClick={handleRegister}
            className="w-full max-w-[300px] h-[45px] cursor-pointer border border-accent bg-accent text-white rounded-[15px] my-6 hover:bg-secondary transition font-semibold text-sm md:text-base"
          >
            Register
          </button>

          <p className="text-white text-center text-xs md:text-sm px-4">
            Already have an account? <a href="/login" className="text-accent font-bold hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
