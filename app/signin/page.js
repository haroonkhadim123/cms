"use client"
import React from 'react'
import react from 'react'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import toast from 'react-hot-toast';
import Link from 'next/link';
import Loader from '../components/Loader';




const page = () => {
  const router = useRouter();
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

  })
  const [erroremail, seterroremail] = useState("")
  const [errorpassword, seterrorpassword] = useState("")
  const [errorname, seterrorname] = useState("")
  const [loader, setloader] = useState(false)

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }
  const handlesubmit = async (e) => {
    e.preventDefault();

    seterroremail("")
    seterrorpassword("")
    seterrorname("")
        setloader(true)
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(formData.name)) {
      seterrorname("Please enter a valid name (letter only)")
      setloader(false)
      return
    }

    if (formData.name?.length < 3) {
      seterrorname("Name must be at least 3 characters long.");
      setloader(false)
      return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(formData.email)) {
      seterroremail("Please enter a valid email address.");
      setloader(false)
      return
    }
    if (formData.password.length < 6) {
      seterrorpassword("password must be at least 6 characters long.");
      setloader(false)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setloader(false)
      return;
    }
    try {
      const res = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        router.push('/login');
        setformData({ name: '', email: '', password: '', confirmPassword: '' })
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Signup error", error)
      toast.error("Internal server error");

    }
    finally{
      setloader(false);
    }



  }
  return (
    <div>
      <div className='bg-gray-100 p-5'><Link className=' text-blue-600 pl-5 inline-block' href="/">← Back to Home</Link></div>
      <div className='w-full min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md '>
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
            <i className="fa-solid fa-user-plus mr-2"></i>Sign Up
          </h2>
          <form onSubmit={handlesubmit} className='flex flex-col gap-2'>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete='new-password'
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
                {errorname && (<p className="text-red-500 text-sm mt-1">{errorname}</p>)}
            </div>
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
                autoComplete='new-password'
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
                autoComplete='new-password'
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errorpassword && (<p className="text-red-500 text-sm mt-1">{errorpassword}</p>)}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete='new-password'
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              disabled={loader}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2 py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
           {loader ? <Loader/> : "Sign Up"}
            </button>


          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>

        </div>
      </div>


    </div>
  )
}

export default page