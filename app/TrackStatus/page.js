"use client";

import React, { useState,useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";


const TrackStatus = () => {
  const [cnic, setCnic] = useState("");
  const [complaints, setcomplaints] = useState([])
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchComplaints = async () => {
    const res= await fetch('api/complaints');
    const data= await res.json();
    setcomplaints(data);
    
  }
  useEffect(() => {
    fetchComplaints();
  }, []);



  const handleCheckStatus = (e) => {
    e.preventDefault();
   const cnicPattern = /^\d{13}$/;
    if (!cnicPattern.test(cnic.trim())) {
      toast.error("Please enter a valid 13-digit CNIC.");
      return;
    }

    setLoading(true);
    setStatus(null);
    setCnic("");

    setTimeout(() => {
     const found = complaints.find(
  (complaint) =>
    complaint.cnic.replace(/\D/g, "") === cnic.replace(/\D/g, "")
);


      if (found) {
        setStatus(found.status);
      } else {
        setStatus("No complaint found for this CNIC.");
      }

      setLoading(false);
      
    }, 1000); // simulate loading delay
  };

  return (
    <>
     <div className='bg-gray-100 p-5'><Link className=' text-blue-600 pl-5 inline-block' href="/">← Back to Home</Link></div>  
    <div className="flex w-full bg-gray-100 min-h-screen items-center justify-center">
      <div className="w-[90%] md:w-[40vw] bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Track Complaint Status
        </h2>

        <form onSubmit={handleCheckStatus} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="cnic"
              className="block text-gray-700 font-semibold mb-1"
            >
              CNIC
            </label>
            <input
              id="cnic"
              type="text"
              name="cnic"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="Enter CNIC (e.g. 8120212344567)"
              maxLength={13}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            {loading ? "Checking..." : "Check Status"}
          </button>
        </form>

        {status && (
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800">Status:</h3>
            <p
              className={`mt-2 text-base ${
                status.includes("Resolved")
                  ? "text-green-600"
                  : status.includes("Progress")
                  ? "text-yellow-600"
                  : status.includes("Pending")
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {status}
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TrackStatus;
