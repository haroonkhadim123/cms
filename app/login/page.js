"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react";
import Loader from "../components/Loader";


const page = () => {
  const { data: session } = useSession();
    const [loader, setloader] = useState(false)



  const router = useRouter();



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [erroremail, seterroremail] = useState("")
  const [errorpassword, seterrorpassword] = useState("")



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterroremail("");
    seterrorpassword("");
  
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(formData.email)) {
      seterroremail("Please enter a valid email address.");
      return
    }
    if(formData.password.length<6){
      seterrorpassword("password must be at least 6 characters long.");
      return
    }
      setloader(true)
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      toast.error(res.error);
      setloader(false)
      return;
    }

    if (res?.ok) {
      toast.success("Login successful");
      router.push("/SubmitComplaints");
    }
    setloader(false);
  };

  return (
    <>
      <div className='bg-gray-100 p-5'><Link className=' text-blue-600 pl-5 inline-block' href="/">← Back to Home</Link></div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
            <i className="fa-solid fa-right-to-bracket mr-2"></i>Login
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="new-email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {erroremail && (<p className="text-red-500 text-sm mt-1">{erroremail}</p>)}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
               {errorpassword && (<p className="text-red-500 text-sm mt-1">{errorpassword}</p>)}
            </div>

            <button
            disabled={loader}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
            >
              {loader? <Loader/> : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign Up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default page;
