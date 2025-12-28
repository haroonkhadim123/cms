🏛️ Complaint Management System – Municipal Issues
📌 Project Overview

The Complaint Management System is a web-based application designed to help citizens report municipal issues such as garbage collection, water supply problems, streetlight faults, road damage, and other civic concerns.
The system allows users to submit complaints online, track their status, and receive updates, while administrators can efficiently manage, assign, and resolve complaints.

This project aims to digitize and simplify municipal complaint handling, reducing manual work and improving transparency between citizens and authorities.

🚨 Problem Statement

Municipal complaint handling is often:

Slow and manual

Lacking transparency

Difficult for citizens to track complaint status

Hard for authorities to manage large numbers of complaints

As a result, many issues remain unresolved or delayed.

💡 Solution

This system provides:

A centralized online platform for complaints

User authentication for secure access

Real-time complaint tracking

Admin dashboard for complaint management

Email/notification-based updates (if enabled)

✨ Features

👤 User Registration & Login (NextAuth)

📝 Submit Municipal Complaints

📊 Complaint Status Tracking (Pending / In Progress / Resolved)

🛠️ Admin Dashboard to Manage Complaints

🗂️ Category-based Complaints (Water, Roads, Garbage, etc.)

🔐 Secure Authentication & Authorization

📱 Responsive UI (Mobile & Desktop)

🧰 Tech Stack

Frontend: Next.js (App Router), React, Tailwind CSS

Backend: Next.js API Routes

Database: MongoDB

Authentication: NextAuth.js

Styling: Tailwind CSS

Version Control: Git & GitHub

Deployment: Vercel

⚠️ Challenges Faced & How I Solved Them
1️⃣ MongoDB Connection & TLS Errors

Problem:
Faced TLS and connection issues while connecting MongoDB Atlas.

Solution:

Used a reusable MongoDB client (clientPromise)

Properly configured environment variables

Handled development vs production connections separately

2️⃣ Next.js Build & Deployment Errors

Problem:
Build failures on Vercel due to missing dependencies and incorrect imports.

Solution:

Fixed incorrect import paths (e.g. @/lib/complaintdb)

Installed missing packages

Cleaned Tailwind & PostCSS configuration

3️⃣ Authentication Issues (NextAuth)

Problem:
Session not persisting correctly and credential validation errors.

Solution:

Properly configured NextAuth providers

Used secure password hashing with bcryptjs

Debugged session handling using server logs

4️⃣ Git & GitHub Errors

Problem:

Remote repository errors

Files/folders not pushing to GitHub

Solution:

Verified correct repository URL

Used git status, git add ., and .gitignore correctly

Fixed folder structure before pushing

5️⃣ Form Validation & User Experience

Problem:
Users could submit empty or invalid complaint forms.

Solution:

Added client-side validation

Displayed real-time error messages

Used loaders and toast notifications for better UX

🚀 Demo

🔗 Live Demo:
https://cms-wjks-cl905b0io-haroonkhadim123s-projects.vercel.app/
