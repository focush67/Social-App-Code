// This API Route handles requests for all general requests and specific user request

import { NextRequest, NextResponse } from "next/server";
import connect from "@/utilities/mongoose";
import { Post } from "@/models/PostSchema";
export const GET = async (request: NextRequest) => {
  console.log("GET request received");
  connect();
  const email = request.nextUrl.searchParams.get("email");
  const id = request.nextUrl.searchParams.get("id");
  if (email) {
    const userPosts = await Post.find({ email });
    if (userPosts.length === 0) {
      return NextResponse.json({
        message: `0 Posts found for ${email}`,
        status: 404,
      });
    }
    return NextResponse.json({
      message: `Returning Posts for ${email}`,
      status: 201,
      posts: userPosts,
    });
  } else if (id) {
    const specificPost = await Post.findById({ _id: id });
    return NextResponse.json({
      message: "Returning requested post",
      status: 200,
      post: specificPost,
    });
  }

  const posts = await Post.find();
  if (!posts || posts.length === 0) {
    return NextResponse.json({
      message: `No posts found at the backend`,
      status: 404,
    });
  }

  return NextResponse.json({
    message: "Returning all posts",
    status: 201,
    posts: posts,
  });
};

export const POST = async (request: NextRequest) => {
  
  console.log("POST Request received");
  connect();
  const email = request.nextUrl.searchParams.get("email");
  const requestBody = await request.json();
  const post = JSON.parse(requestBody.post);
  console.log("USER POST: ", post);
  const {
    title,
    description,
    tags,
    cover,
    image,
    userName,
    likes,
    comments,
    shares,
  } = post;
  console.log("Title: ", title);
  console.log("Email: ", email);
  if (!email || !title) {
    return NextResponse.json({
      message: "Invalid Post , insert required variables",
      status: 505,
    });
  }

  const savedUser = await Post.find({ email });
  if (!savedUser || savedUser.length === 0) {
    const newUser = await Post.create({
      email,
      title,
      description,
      image,
      userName,
      tags,
      cover,
      likes,
      comments,
      shares,
    });

    return NextResponse.json({
      message: "New User created with the post",
      status: 201,
      user: newUser,
    });
  }

  const newUser = await Post.create({
    email,
    title,
    description,
    image,
    userName,
    tags,
    cover,
    likes,
    comments,
    shares,
  });

  return NextResponse.json({
    message: "New User created with the post",
    status: 201,
    user: newUser,
  });
};
