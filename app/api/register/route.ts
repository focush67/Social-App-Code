import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/utilities/mongoose";
import { User } from "@/models/UserSchema";
export const POST = async (request: NextRequest) => {
 
  const body = await request.json();
  const { username, email, image, password } = body.formData;
  console.log("User : ", body);
  connect();

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json({
        message: "Account already exists , Login",
        status: 401,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      name: username,
      password: hashedPassword,
      image,
    });

    return NextResponse.json({
      message: "New User created",
      status: 201,
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error creating a new user:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};
