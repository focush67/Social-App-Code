import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/models/MessengerSchema";
import connect from "@/utilities/mongoose";
import { Post } from "@/models/PostSchema";

export const GET = async (request: NextRequest) => {
  connect();

  const sender = request.nextUrl.searchParams.get("sender");
  const receiver = request.nextUrl.searchParams.get("receiver");

  console.log({ sender, receiver });

  if (!sender || !receiver) {
    return NextResponse.json({
      message: "Sender and receiver data might be missing",
      status: 404,
    });
  }

  const messages = await Message.find({
    sender: sender,
    receiver: receiver,
    content: { $ne: null },
  });
  const messages2 = await Message.find({
    sender: receiver,
    receiver: sender,
    content: { $ne: null },
  });

  const messagesWithEmptyContent = await Message.find({
    content: null,
    sender: sender,
    receiver: receiver,
  });

  const messagesWithEmptyContent2 = await Message.find({
    content: null,
    sender: receiver,
    receiver: sender,
  });

  return NextResponse.json({
    message: "Returning messages",
    status: 201,
    conversations: messages.concat(messagesWithEmptyContent),
    conversations2: messages2.concat(messagesWithEmptyContent2),
  });
};

export const POST = async (request: NextRequest) => {
  connect();
  
  const requestBody = await request.json();
  const content = request.nextUrl.searchParams.get("content");
  const { imageUrl, post } = requestBody;
  console.log({ imageUrl, post });
  const sender = request.nextUrl.searchParams.get("sender");
  const receiver = request.nextUrl.searchParams.get("receiver");
  console.log("Message post request received at backend: ", {
    content,
    sender,
    receiver,
    imageUrl,
    post,
  });

  if ((!content || content.length === 0) && (!post || post.length === 0)) {
    return NextResponse.json({
      message: "Both content and shared post of a message were absent",
      status: 405,
    });
  }

  if (!sender || !receiver) {
    return NextResponse.json({
      message: "Check Sender and Receiver values",
      status: 404,
    });
  }

  const newMessage = await Message.create({
    content,
    sender,
    receiver,
    sender_image: imageUrl,
    post,
  });

  await newMessage.save();

  if (post) {
    const specificPost = await Post.findById(post._id);
    if (specificPost) {
      specificPost.shares += 1;
      await specificPost.save();
    }
  }

  return NextResponse.json({
    message: "New message created",
    status: 201,
    sender: sender,
    receiver: receiver,
    post: post,
  });
};