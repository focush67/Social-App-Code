import { NextRequest, NextResponse } from "next/server";
import connect from "@/utilities/mongoose";
import { Post } from "@/models/PostSchema";
export const POST = async (request: NextRequest) => {
  
  console.log("POST Request for post updation received");
  connect();
  const email = request.nextUrl.searchParams.get("email");
  const _id = request.nextUrl.searchParams.get("id");
  const type = request.nextUrl.searchParams.get("type");

  // Adding a comment to 'email' profile from 'from' profile

  if (type && type === "addComment") {
    const from = request.nextUrl.searchParams.get("from");
    const comment = request.nextUrl.searchParams.get("comment");
    const _id = request.nextUrl.searchParams.get("id");
    const requestBody = await request.json();
    const { imageUrl } = requestBody;
    const targetPost = await Post.findById({ _id });
    console.log("Request Body: ", requestBody);
    console.log("Image from backend: ", imageUrl);

    targetPost.comments.push({
      content: comment,
      user: from,
      user_email: from,
      image: imageUrl,
    });

    await targetPost.save();

    console.log(targetPost);

    return NextResponse.json({
      message: "Comment successfully added",
      status: 201,
    });
  }

  if (_id) {
    const post = await Post.findById(_id);

    post.likes += 1;

    await post.save();

    return NextResponse.json({
      message: "Likes updated",
      status: 201,
      post: post,
    });
  }

  return NextResponse.json({
    message: "_id not compatible",
    status: 405,
  });
};

export const DELETE = async(request: NextRequest) => {
  console.log("Delete request received for post");
  connect();
  const _id = request.nextUrl.searchParams.get("_id");
  const postToBeDeleted = await Post.findById({_id});

  if(!postToBeDeleted){
    return NextResponse.json({
      message: "Post not found",
      status: 404,
    })
  }

  console.log(postToBeDeleted);

  await Post.findByIdAndDelete({_id});

  return NextResponse.json({
    message: "Post was deleted",
    status: 201,
  })
}
