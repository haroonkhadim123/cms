import { NextResponse } from "next/server";
import clientPromise from "@/lib/logindb";
import bcrypt from "bcryptjs";


export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("logindb");
    const collection = db.collection("login");

    const alreadyexist = await collection.findOne({ email: body.email });
    if (alreadyexist) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "Account already exists",
      });
    }

   const hashedPassword = await bcrypt.hash(body.password, 10);

    await collection.insertOne({
      name: body.name,
      email: body.email,
      password: hashedPassword, // ⭐ CORRECT
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("api error", error);
    return NextResponse.json(
      { success: false, error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(){
    try {
     
        const client = await clientPromise;
        const db= await client.db('logindb');
        const collection= await db.collection('login');
        const data= await collection.find({}).toArray();
        return NextResponse.json(data, { status: 200 });
        
    } catch (error) {
        console.error("api error",error)
        return NextResponse.json({success:false,error:true,message:"Internal server error"}, {status:500});
        
    }
}