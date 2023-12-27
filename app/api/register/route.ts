import { NextRequest, NextResponse } from "next/server";
import connect from "@/utilities/mongoose";
import { App_User } from "@/models/UserSchema";
export const POST = async (request: NextRequest) => {
 
  const body = await request.json();
  const { username, email, image } = body.formData;
  console.log("User : ", body.formData);
  connect();

  try {
    const existing = await App_User.findOne({ email });

    if (existing) {
      return NextResponse.json({
        message: "Account already exists , Login",
        status: 401,
      });
    }

    const newUser = await App_User.create({
      email,
      name: username,
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
