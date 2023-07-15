"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5003/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      if (data.success) {
        localStorage.setItem('token',data.token);
        router.push("/chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-100 flex justify-center items-center">
      <div>
        <form onSubmit={login} action="" className="w-full bg-white p-5 rounded-md shadow-md">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={(e: any) => setEmail(e.target.value)}
              type="email"
              className="w-full px-2 py-1 border-b-[1px] border-blue-600 rounded-s-sm outline-none"
              placeholder="abhishekbhat.344@gmail.com"
            />
            <label htmlFor="">Password</label>
            <input
              required
              onChange={(e: any) => setPassword(e.target.value)}
              type="text"
              className="w-full px-2 py-1 border-b-[1px] border-blue-600 rounded-s-sm outline-none"
              placeholder="******"
            />
            <button
              type="submit"
              className="bg-purple-900 text-white py-1 rounded-sm"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
