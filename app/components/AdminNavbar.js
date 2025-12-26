"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AdminNavbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(null);

  const params = useSearchParams();
  const logout = params.get("logout");

  useEffect(() => {
    if (logout === "success") {
      toast.success("Logout Successfully");
      setLoading(null);
    }
  }, [logout]);

  const handleNavigate = (path, type) => {
    setLoading(type);
    router.push(path);
  };

  const handleLogout = async () => {
    setLoading("logout");
    await signOut({ callbackUrl: "/?logout=success" });
  };

  return (
    <div className="bg-blue-600 flex flex-col items-center py-5 w-16 md:w-[250px] sticky top-0 left-0 h-screen p-3">
      <h1 className="text-white font-bold text-center text-2xl mb-5 hidden md:block">
        Dashboard
      </h1>

      <ul className="flex flex-col gap-5 w-full">
        {/* Admin */}
        <li>
          <button
            disabled={loading !== null}
            onClick={() => handleNavigate("/dashboard", "admin")}
            className="flex text-white items-center justify-center md:justify-start gap-3 p-3 rounded-lg bg-blue-400 hover:bg-blue-700 transition-all w-full disabled:opacity-60"
          >
            <i className="fa-solid fa-user"></i>
            <span className="hidden md:inline">
              {loading === "admin" ? <Loader size={16} /> : "Admin"}
            </span>
          </button>
        </li>

        {/* Complaints */}
        <li>
          <button
            disabled={loading !== null}
            onClick={() => handleNavigate("/Complaints", "complaints")}
            className="flex text-white items-center justify-center md:justify-start gap-3 p-3 rounded-lg bg-blue-400 hover:bg-blue-700 transition-all w-full disabled:opacity-60"
          >
            <i className="fa-solid fa-comments"></i>
            <span className="hidden md:inline">
              {loading === "complaints" ? <Loader size={16} /> : "Complaints"}
            </span>
          </button>
        </li>

        {/* Logout */}
        <li className="mt-auto">
          <button
            disabled={loading !== null}
            onClick={handleLogout}
            className="flex text-white items-center justify-center md:justify-start gap-3 p-3 rounded-lg bg-blue-400 hover:bg-blue-700 transition-all w-full disabled:opacity-60"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="hidden md:inline">
              {loading === "logout" ? <Loader size={16} /> : "Log Out"}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
