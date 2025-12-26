"use client"

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Loader from "./components/Loader";
import { useState } from "react";




export default function Home() {
  const router = useRouter()
  const { data: session } = useSession();
  const [loader, setloader] = useState(false)




  const handleclick = () => {
    setloader(true)
    if (!session) {


      router.push('/login')

      return;

    }
    else {

      router.push('/SubmitComplaints')

    }
    setloader(false)
  }
  return (
    <div className="w-full">

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/download.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-5xl px-4 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
            Complaint Management System – Kotli
          </h1>

          <p className="text-slate-200 text-sm md:text-lg max-w-3xl mx-auto mb-4">
            A digital platform enabling citizens to report municipal issues and
            track their resolution with transparency and efficiency.
          </p>

          <p className="text-slate-300 text-sm max-w-3xl mx-auto mb-6">
            From waste collection and road maintenance to streetlight repairs,
            this system helps improve communication between citizens and local
            authorities for a better city.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/TrackStatus"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              Track Status
            </Link>

            <span
              onClick={handleclick}
              className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              {loader ? <Loader /> : "Submit Complaint"}
            </span>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            How the System Works
          </h2>
          <p className="text-gray-600 mb-10">
            A simple and transparent process for reporting and resolving issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Submit Complaint</h3>
              <p className="text-gray-600">
                Citizens submit complaints related to sanitation, roads, lighting,
                water supply, and other municipal services.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Review & Assign</h3>
              <p className="text-gray-600">
                Authorities review each complaint and forward it to the concerned
                department for action.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-xl mb-2">Track Resolution</h3>
              <p className="text-gray-600">
                Citizens track complaint progress in real time until resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Why Choose This Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Transparency</h3>
              <p className="text-gray-600">
                Every complaint is recorded and monitored with full visibility.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Efficient Response</h3>
              <p className="text-gray-600">
                Faster communication between citizens and municipal departments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Citizen Empowerment</h3>
              <p className="text-gray-600">
                Encourages public participation in city improvement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Data-Driven Planning</h3>
              <p className="text-gray-600">
                Helps authorities identify problem areas and plan better solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold">5,000+</h3>
            <p className="text-sm mt-1">Complaints Registered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">85%</h3>
            <p className="text-sm mt-1">Resolved Successfully</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">24/7</h3>
            <p className="text-sm mt-1">System Availability</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">10+</h3>
            <p className="text-sm mt-1">Connected Departments</p>
          </div>
        </div>
      </section>

      {/* ================= ACCESSIBILITY ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Designed for All Citizens
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            This platform is optimized for mobile phones, tablets, and desktop
            devices, ensuring ease of use for all residents of Kotli regardless
            of technical expertise.
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="w-full bg-gray-100 text-gray-800 py-12">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">
            Contact Information
          </h2>

          <p className="text-gray-600 mb-8">
            For assistance, suggestions, or municipal inquiries, please contact:
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 text-lg">
            <div>📞 +92 311 9799229</div>
            <div>✉ support@municipalcms.gov.pk</div>
            <div>📍 Municipal Office, City Hall, Kotli</div>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            Office Hours: Monday – Friday, 9:00 AM to 5:00 PM
          </p>
        </div>
      </section>

    </div>
  );
}
