import dbConnect from "@/lib/db/connect";
import Doctor from "@/lib/db/models/Doctor";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    try {
      jwt.verify(token, secret);
    } catch (error) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    const doctors = await Doctor.find({}).select("-password -__v").lean();

    return NextResponse.json(
      {
        doctors,
        message: "Doctors fetched successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
