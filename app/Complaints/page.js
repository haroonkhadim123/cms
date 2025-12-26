"use client";

import React, { useEffect, useState, Suspense } from "react";
import AdminNavbar from "../components/AdminNavbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import toast from "react-hot-toast";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    try {
      const response = await fetch("/api/complaints");
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      toast.error("Failed to fetch complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ================= MARK SOLVED =================
  const markSolved = async (id) => {
    try {
      const res = await fetch("/api/complaints", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Solved" }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setComplaints((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, status: "Solved" } : c
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // ================= MARK UNSOLVED =================
  const markUnsolved = async (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "Unsolved" } : c
      )
    );

    try {
      const res = await fetch("/api/complaints", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Unsolved" }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Marked as unsolved");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // ================= DELETE =================
  const deleteComplaint = async (id) => {
    const confirmed = confirm("Are you sure you want to delete?");
    if (!confirmed) return;

    const cnic = complaints.find((c) => c.id === id)?.cnic;
    if (!cnic) return toast.error("CNIC not found");

    try {
      await fetch("/api/complaints", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnic }),
      });

      setComplaints((prev) => prev.filter((c) => c.id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="fixed top-0 left-0 w-full z-50 bg-blue-900 text-white shadow-md">
        <div className="flex justify-center p-4">
          <h1 className="font-extrabold text-lg md:text-2xl">
            Complaint Management System
          </h1>
        </div>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="flex min-h-screen pt-16 overflow-x-hidden">

        {/* ===== SIDEBAR (SUSPENSE FIX) ===== */}
        <div className="w-16 md:w-[250px] min-h-screen">
          <Suspense fallback={<div className="p-4 text-white">Loading...</div>}>
            <AdminNavbar />
          </Suspense>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="flex-1 p-4 md:p-10 bg-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            All Complaints
          </h1>

          {complaints.length === 0 ? (
            <p>No complaints yet.</p>
          ) : (
            <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-scroll no-scrollbar">
              {complaints.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border rounded-2xl shadow p-5 md:w-[70%]"
                >
                  <h2 className="text-xl font-bold text-blue-700">
                    {c.name}
                  </h2>

                  <p>Email: {c.email}</p>
                  <p>CNIC: {c.cnic}</p>
                  <p>Location: {c.location}</p>
                  <p>Category: {c.category}</p>
                  <p>Description: {c.description}</p>
                  <p>Date: {c.createdAt}</p>

                  <p
                    className={`mt-2 font-semibold ${
                      c.status === "Solved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {c.status}
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => markSolved(c.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Solved
                    </button>

                    <button
                      onClick={() => markUnsolved(c.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Unsolved
                    </button>

                    <button
                      onClick={() => deleteComplaint(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ComplaintsPage;
