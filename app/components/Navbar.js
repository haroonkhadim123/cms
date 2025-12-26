"use client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "./Loader";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [total, settotal] = useState([])

  const params = useSearchParams();
  const logout = params.get("logout");

  useEffect(() => {
    if (logout === "success") {
      toast.success("Logout Successfully");
      setLoadingAction(null);
    }
  }, [logout]);
  const fetchdata=async()=>{
  const res= await fetch('/api/complaints');
  const data= await res.json();
  settotal(data)


}
useEffect(() => {
  fetchdata();

}, [])

  const handleNavigate = (path, action) => {
    setLoadingAction(action);
    router.push(path);
  };

  const handleLogout = async () => {
    setLoadingAction("logout");
    await signOut({ callbackUrl: "/?logout=success" });
  };

  const isLoading = (action) => loadingAction === action;

  return (
    <div className="sticky top-0 z-50 bg-blue-900 text-white shadow-md">
      <div className="flex items-center justify-between p-4 md:px-10">

        <h1 className="font-extrabold text-lg md:text-2xl">
          Complaint Management System
        </h1>

        {/* Hamburger */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-9 font-semibold">

          <button
            disabled={loadingAction}
            onClick={() => handleNavigate("/login1", "admin")}
            className="flex items-center relative gap-2 hover:text-blue-300"
          >
            <i className="fa-solid fa-user-tie"></i>
            {isLoading("admin") ? <Loader /> : "Admin"}
            <span className="bg-red-600 w-5 h-5 items-center justify-center flex absolute rounded-full -right-3 -bottom-2 ">{total.length}</span>
          </button>

          <button
            disabled={loadingAction}
            onClick={() => handleNavigate("/signin", "signin")}
            className="flex items-center gap-2 hover:text-blue-300 whitespace-nowrap "
          >
            <i className="fa-solid fa-user-plus"></i>
            {isLoading("signin") ? <Loader /> : "Sign In"}
          </button>

          {!session ? (
            <button
              disabled={loadingAction}
              onClick={() => handleNavigate("/login", "login")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <i className="fa-solid fa-user"></i>
              {isLoading("login") ? <Loader /> : "Login"}
            </button>
          ) : (
            <button
              disabled={loadingAction}
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <i className="fa-solid fa-user"></i>
              {isLoading("logout") ? <Loader /> : "Logout"}
            </button>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-blue-800 shadow-lg
        transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <ul className="flex flex-col gap-4 p-4 font-semibold">

          <button onClick={() => handleNavigate("/login1", "admin")} className="flex  gap-2">
            <span className="relative flex gap-2">
            <i className="fa-solid fa-user-tie"></i>

            {isLoading("admin") ? <Loader /> : "Admin"}
             <span className="bg-red-600 w-5 h-5 items-center justify-center flex absolute rounded-full  top-3 right-0">{total.length}</span>
             </span>
          </button>

          <button onClick={() => handleNavigate("/signin", "signin")} className="flex gap-2">
            <i className="fa-solid fa-user-plus"></i>
            {isLoading("signin") ? <Loader /> : "Sign In"}
          </button>

          {!session ? (
            <button
              onClick={() => handleNavigate("/login", "login")}
              className="bg-blue-600 px-4 py-2 rounded-lg flex gap-2"
            >
              <i className="fa-solid fa-user"></i>
              {isLoading("login") ? <Loader /> : "Login"}
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-blue-600 px-4 py-2 rounded-lg flex gap-2"
            >
              <i className="fa-solid fa-user"></i>
              {isLoading("logout") ? <Loader /> : "Logout"}
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
