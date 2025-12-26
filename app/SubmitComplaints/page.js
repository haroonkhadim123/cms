"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Loader from "../components/Loader";

const Page = () => {
  const { data: session } = useSession();
  const [loader, setLoader] = useState(false); // form submit loader
  const [logoutLoader, setLogoutLoader] = useState(false); // logout loader

  const params = useSearchParams();
  const logout = params.get("logout");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
    cnic: "",
    location: "",
  });

  const [errorname, setErrorName] = useState("");
  const [errordes, setErrorDes] = useState("");
  const [errorcnic, setErrorCnic] = useState("");
  const [erroremail, setErrorEmail] = useState("");

  useEffect(() => {
    if (logout === "success") {
      toast.success("Logout Successfully");
    }
  }, [logout]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // CNIC validation: only digits allowed
    if (name === "cnic" && !/^[0-9]*$/.test(value)) {
      toast.error("CNIC must contain only numbers!");
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = async () => {
    setLogoutLoader(true);
    await signOut({ callbackUrl: "/?logout=success" });
    setLogoutLoader(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorName("");
    setErrorDes("");
    setErrorCnic("");
    setErrorEmail("");

    // --- Validation ---
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      setErrorName("Please enter a valid name (letters only)");
      return;
    }
    if (formData.name.length < 3) {
      setErrorName("Name must be at least 3 characters long.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorEmail("Please enter a valid email address.");
      return;
    }
    if (!formData.cnic.startsWith("81202")) {
      setErrorCnic("Your CNIC is not valid for this area");
      return;
    }

    const description = formData.description.trim();
    const words = description.split(/\s+/);
    if (
      description.length < 10 ||
      words.length < 2 ||
      !words.every((word) => /^[A-Za-z]{2,}[.,!?']?$/.test(word)) ||
      /\d/.test(description)
    ) {
      setErrorDes(
        "Description must be at least 10 chars, 2 words, letters only, no numbers."
      );
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.category ||
      !formData.description ||
      !formData.location ||
      !formData.cnic
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      setLoader(true);

      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success === true || result.success === "true") {
        toast.success("Complaint submitted successfully!");
        router.push("/");
      } else {
        toast.error(result.message || "Failed to submit complaint. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error submitting your complaint.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {/* Logout */}
      <div className="bg-gray-100 p-5 flex justify-end">
        <button
          onClick={handleLogout}
          disabled={logoutLoader}
          className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold px-4 py-2 rounded shadow flex items-center justify-center gap-2 transition duration-200 disabled:opacity-60"
        >
          {logoutLoader ? <Loader size={16} /> : "Logout"}
        </button>
      </div>

      {/* Form */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Submit a Complaint
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="new-name"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {errorname && <p className="text-red-500 text-sm mt-1">{errorname}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="new-email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              {erroremail && <p className="text-red-500 text-sm mt-1">{erroremail}</p>}
            </div>

            {/* CNIC */}
            <div>
              <label htmlFor="cnic" className="block text-gray-700 font-semibold mb-1">
                CNIC
              </label>
              <input
                id="cnic"
                type="text"
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                placeholder="Enter CNIC (e.g. 35202-1234567-8)"
                maxLength={13}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
                autoComplete="new-cnic"
              />
              {errorcnic && <p className="text-red-500 text-sm mt-1">{errorcnic}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select category</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Streetlight Issue">Streetlight Issue</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Road Damage">Road Damage</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Location</option>
                <option value="Kotli City">Kotli City</option>
                <option value="Goi">Goi</option>
                <option value="Naar">Naar</option>
                <option value="Fateh Pur">Fateh Pur</option>
                <option value="Khuiratta">Khuiratta</option>
                <option value="Charhoi">Charhoi</option>
                <option value="Sehnsa">Sehnsa</option>
                <option value="Tattapani">Tattapani</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your issue..."
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              ></textarea>
              {errordes && <p className="text-red-500 text-sm mt-1">{errordes}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loader}
              className={`w-full ${loader ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 flex items-center justify-center gap-2`}
            >
              {loader ? <Loader size={20} /> : "Submit Complaint"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
