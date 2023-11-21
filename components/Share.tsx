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
        flexDirection:"row",
        alignItems:"center",
        maxHeight:"50vh",
        width:"fit-content",
        minWidth:"100vw",
        border:"1px solid black",
        fontSize:"100%"
    }}>
      <div style={{
        flex:2,
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
            size={"85%"}
            background={"black"}
            color={"white"}
            hoverText={"black"}
            hoverBackground={"white"}
            style={{ marginLeft: "auto",pointerEvents:"none"}}
            disabled={!session}
          >
            Follow
          </Button>
        </UserInfo>

        <CardTitle style={{fontSize:"80%"}}>{post.title}</CardTitle>
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
        <CardDescription style={{fontSize:"90%"}}>{post.description}</CardDescription>
      </Card>
      </div>
      
      <div style={{
        flex:1,
        marginTop:"auto",
        alignItems:"center",
        width:"100%"
      }}>
        <MessageDashboard mail={session?.user?.email} post={post} setShareSection={setShareSection} />
      </div>
    </div>
  );
};

export default ShareSection;
