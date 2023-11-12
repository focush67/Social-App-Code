"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  UserInfo,
  ProfileImage,
  Username,
  Button,
  CardTitle,
  CardImageContainer,
  CardImage,
  CardDescription,
} from "@/globals/GlobalStyles";

import MessageDashboard from "@/app/dashboard/[id]/page";
const ShareSection = ({ post, setShareSection }: any) => {
  const { data: session } = useSession();
  console.log("Post received at share section ", post);

  return (
    <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around"
    }}>
      <Card key={post.title}>
        <UserInfo>
          <ProfileImage
            src={post?.image!}
            alt={"user"}
            width={50}
            height={50}
            layout="fixed"
          />
          <Username>{post.userName}</Username>
          <Button
            size={"0.9em"}
            background={"black"}
            color={"white"}
            hoverText={"black"}
            hoverBackground={"white"}
            style={{ marginLeft: "10px",pointerEvents:"none" }}
            disabled={!session}
          >
            Follow
          </Button>
        </UserInfo>

        <CardTitle>{post.title}</CardTitle>
        <CardImageContainer>
          <CardImage
            src={post.cover}
            alt={post.title}
            width={100}
            height={100}
            layout="fixed"
            loading="lazy"
          />
        </CardImageContainer>
        <CardDescription>{post.description}</CardDescription>
      </Card>
      <div>
        <MessageDashboard mail={session?.user?.email} post={post} setShareSection={setShareSection} />
      </div>
    </div>
  );
};

export default ShareSection;
