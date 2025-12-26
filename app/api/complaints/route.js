import clientPromise from "@/lib/complaintdb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


async function sendEmail(newComplaint){
     // 📧 Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // your Gmail
        pass: process.env.PASSWORD, // your App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "haroonkhadim23@gmail.com",
      subject: "New Complaint Received",
      text: `
A new complaint has been submitted.

Name: ${newComplaint.name}
Email: ${newComplaint.email}
Category: ${newComplaint.category}
Description: ${newComplaint.description}
CNIC: ${newComplaint.cnic}
Location: ${newComplaint.location}

Check your dashboard for more details.
      `,
    });
}

export async function POST(request) {
  try {
    const body = await request.json();


    if (!body.cnic || !body.name || !body.email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields (name, email, or CNIC)" },
        { status: 400 }
      );
    }


    const cnicValue = String(body.cnic).trim();

    const client = await clientPromise;
    const db = client.db("complaintdb");
    const collection = db.collection("complaints");


    const existingComplaint = await collection.findOne({ cnic: cnicValue });
    if (existingComplaint) {
   
      
      return NextResponse.json(
        { success: false, message: "Complaint already exists for this CNIC" },
        { status: 409 }
      );
    }

    const newComplaint = {
      id: Date.now().toString(),
      name: body.name.trim(),
      email: body.email.trim(),
      category: body.category || "General",
      description: body.description || "",
      cnic: cnicValue,
      location: body.location || "Not provided",
      status: "pending",
      createdAt: new Date(),
    };

    await collection.insertOne(newComplaint);
   sendEmail(newComplaint).catch((err) => console.error("Email error:", err));

 

    // ✅ Success
    return NextResponse.json(
      {
        success: true,
        message: "Complaint submitted successfully and email sent",
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in complaint submission:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET route unchanged
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("complaintdb");
    const collection = db.collection("complaints");

    const complaints = await collection.find({}).toArray();
    return NextResponse.json(complaints, { status: 200 });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

export async function  DELETE(request) {
    try {
        const body= await request.json();
        const client =await clientPromise;
        const db= client.db("complaintdb");
        const collection= db.collection("complaints");
        await collection.deleteOne({cnic:body.cnic});
        return NextResponse.json({success:true,error:false,message:"Password deleted successfully"
        });
        
    } catch (error) {
        console.log('Api error',error)
        return NextResponse.json({success:false,error:true,message:"Internal server error"})
        
    }
} 
export async function PUT(request){
  try {
    const {id,status} = await request.json();
    const client =await clientPromise;
    const db= client.db("complaintdb");
    const collection= db.collection("complaints");
    await collection.updateOne({ id:id }, { $set: { status: status } });
    return NextResponse.json({success:true,error:false,message:"Status updated successfully"
    });

    
  } catch (error) {
    console.log('Api error',error)
    return NextResponse.json({success:false,error:true,message:"Internal server error"})
    
  }
}