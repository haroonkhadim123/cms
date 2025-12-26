"use client";

import React, { useState, useEffect, Suspense } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminNavbar from "../components/AdminNavbar";

const Page = () => {
  const [complaints, setComplaints] = useState([]);

  // ===== FETCH COMPLAINTS =====
  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints");
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const solvedComplaints = complaints.filter(
    (c) => c.status === "Solved"
  ).length;

  const unsolvedComplaints = complaints.filter(
    (c) => c.status !== "Solved"
  ).length;

  return (
    <>
      {/* ===== TOP NAVBAR ===== */}
      <div className="fixed top-0 left-0 w-full z-50 bg-blue-900 text-white shadow-md">
        <div className="flex items-center justify-center p-4">
          <h1 className="font-extrabold text-lg md:text-2xl text-center">
            Complaint Management System
          </h1>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex min-h-screen w-screen pt-16">

        {/* ===== SIDEBAR (SUSPENSE FIX) ===== */}
        <div className="w-16 md:w-[250px] min-h-screen bg-blue-900">
          <Suspense fallback={<div className="p-4 text-white">Loading...</div>}>
            <AdminNavbar />
          </Suspense>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 flex flex-col gap-6 p-4 md:p-10">

          {/* HEADER */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-center md:text-left">
              Overview of all user complaints and system activity.
            </p>
          </div>

          {/* DASHBOARD CARDS */}
          <div className="flex h-[80vh] p-2 overflow-y-scroll no-scrollbar flex-wrap gap-4 justify-center md:justify-start">

            <div className="bg-white text-gray-600 flex flex-col items-center justify-center gap-2 shadow-2xl w-64 md:w-72 h-56 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold">Total Complaints</h1>
              <h2 className="text-lg font-bold">{complaints.length}</h2>
            </div>

            <div className="bg-white text-gray-600 flex flex-col items-center justify-center gap-2 shadow-2xl w-64 md:w-72 h-56 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold">Solved Complaints</h1>
              <h2 className="text-lg font-bold">{solvedComplaints}</h2>
            </div>

            <div className="bg-white text-gray-600 flex flex-col items-center justify-center gap-2 shadow-2xl w-64 md:w-72 h-56 p-5 rounded-2xl">
              <h1 className="text-2xl font-bold">Unsolved Complaints</h1>
              <h2 className="text-lg font-bold">{unsolvedComplaints}</h2>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
