import { NextRequest, NextResponse } from "next/server";
import connect from "@/utilities/mongoose";
import { App_User } from "@/models/UserSchema";
export const GET = async (request: NextRequest) => {
  console.log("GET request received");
  const x = process.env.NEXT_PUBLIC_MONGO_URI;

  if(!x){
    throw new Error("Some problem occured accessing the MongoDB connection string");
  }
  
  connect();
  const email = request.nextUrl.searchParams.get("email");
  if (email) {
    const user = await App_User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: `User not found`,
        status: 404,
      });
    }

    return NextResponse.json({
      message: `Returning Details for ${email}`,
      status: 201,
      user: user,
    });
  } else {
    const emailA = request.nextUrl.searchParams.get("emailA");
    const emailB = request.nextUrl.searchParams.get("emailB");

    console.log(`${emailB} wants to follow ${emailA}`);

    if (emailA && emailB && emailA === emailB) {
      return NextResponse.json({
        message: "Can't follow youself",
        status: 405,
      });
    }

    try {
      const mainAccount = await App_User.findOne({ email: emailA });
      const initiatorAccount = await App_User.findOne({ email: emailB });

      if (
        mainAccount.followers.includes(emailB) &&
        initiatorAccount.following.includes(emailA)
      ) {
        console.log("No need to follow");
        return NextResponse.json({
          message: "Already following",
        });
      }

      mainAccount.followers.push(emailB);
      initiatorAccount.following.push(emailA);

      await mainAccount.save();
      await initiatorAccount.save();

      return NextResponse.json({
        message: "Follow request processed",
        status: 201,
        follower_Account: initiatorAccount,
        followed_Account: mainAccount,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
};
