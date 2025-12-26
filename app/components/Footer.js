import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
  <footer className="w-full bg-blue-950 z-100 text-gray-300 py-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4 text-center md:text-left">
    <div>
      <h3 className="text-xl font-semibold text-white">Municipal Complaint Management System</h3>
      <p className="text-sm text-gray-400">
        Making your city cleaner, safer, and better — one complaint at a time.
      </p>
    </div>

    <div className="flex gap-6">
      <Link href="/" className="hover:text-white transition">Home</Link>
      <Link href="/login" className="hover:text-white transition">Submit Complaint</Link>
      <Link href="/TrackStatus" className="hover:text-white transition">Track Status</Link>
      <Link href="#contact" className="hover:text-white transition">Contact</Link>
    </div>

    <div className="flex gap-4 text-lg">
      <Link href="https://www.facebook.com/" className="hover:text-blue-400"><i className="fa-brands fa-facebook-f"></i></Link>
      <Link href="https://twitter.com/" className="hover:text-blue-400"><i className="fa-brands fa-twitter"></i></Link>
      <Link href="https://www.instagram.com/" className="hover:text-pink-400"><i className="fa-brands fa-instagram"></i></Link>
      <Link href="https://www.linkedin.com/" className="hover:text-blue-400"><i className="fa-brands fa-linkedin-in"></i></Link>
    </div>
  </div>

  <div className="text-center text-gray-500 text-sm mt-4 border-t border-gray-800 pt-3">
    © {new Date().getFullYear()} Municipal CMS. All Rights Reserved.
  </div>
</footer>

  )
}

export default Footer