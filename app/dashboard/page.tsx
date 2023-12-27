"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserDetailsContainer,
  ProfileImage,
  UserInfo,
  Username,
  PostGrid,
  Card,
  CardImage,
  CardFooter,
  CardTitle,
  CommentButton,
  LikeButton,
  ShareButton,
  CardDescription,
  Button,
  Followers,
} from "@/globals/GlobalStyles";
import { Share, Comment, Like } from "@/globals/GlobalIcons";
import { useSession } from "next-auth/react";
import { Post } from "@/globals/GlobalTypes";
import { useRouter } from "next/navigation";

export interface UserProps {
  email: string;
  image: string;
  followers: string[];
  following: string[];
}

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState<UserProps>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userPostsLS, setUserPostLS] = useState<Post[]>([]);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/posts/?email=${email}`);
      if (!response.data.posts) return null;
      setUserPosts(response.data.posts);
      setUserPostLS(JSON.parse(localStorage.getItem("All_Posts") || ""));
    };

    fetchUserPosts();

    const fetchUserDetails = async () => {
      const response = await axios.get(
        `${process.env.NEXTAUTH_URL}/api/users/?email=${session?.user?.email}`
      );
      setUserDetails(response?.data?.user);
    };

    fetchUserDetails();
  }, [email,session?.user?.email]);

  const filteredPosts = userPostsLS?.filter(
    (post: Post) => post?.email === email
  );

  const handlePostDelete = async(post: Post) => {
    console.log("Post received for deletion: ",post);
    try {
      const response = await axios.delete(`${process.env.NEXTAUTH_URL}/api/post-update/?_id=${post._id}`);
      console.log(response.data);

      setUserPostLS((prevUserPostsLS) => {
        const updatedUserPostsLS = prevUserPostsLS.filter((userPost:Post) => userPost._id !== post._id);
        localStorage.setItem("All_Posts",JSON.stringify(updatedUserPostsLS));
        return updatedUserPostsLS;
      })
    } catch (error:any) {
      console.log(error);
    }
  }

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      
    }}>
      <UserDetailsContainer style={{
        display:"flex",
        flexDirection:"row",
        fontSize:"2vw",
        justifyContent:"space-between",
        alignItems:"center",
      }}>
        <ProfileImage
          src={session?.user?.image!}
          alt="User Profile"
          width={60}
          height={60}
        />
        <UserInfo>
          <Username>{session?.user?.name}</Username>
          <Followers>
            <div style={{ marginTop: "1em" }}>Followers</div>
            <div>{userDetails?.followers?.length}</div>
          </Followers>
          <Followers>
            <div style={{ marginTop: "1em" }}>Following</div>
            <div>{userDetails?.following?.length}</div>
          </Followers>
        </UserInfo>
        <Button
          size={"1em"}
          background={"darkblue"}
          color={"white"}
          hoverBackground={"mediumblue"}
          hoverText={"white"}
          onClick={() => router.push("/dashboard/new")}
          disabled={!session}
        >
          New
        </Button>
      </UserDetailsContainer>

      {filteredPosts?.map((post, index) => (
        <PostGrid key={index}>
          <Card
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              minHeight:"500px"
            }}
          >
            <CardTitle>{post.title}</CardTitle>
            <Button size="1em" background="darkred" hoverBackground="maroon" color="white" hoverText="white" onClick={() => handlePostDelete(post)}>Delete</Button>
            <CardImage
              src={post.cover}
              alt="Post"
              width={200}
              height={200}
              layout="fixed"
            />
            <CardDescription>{post.description}</CardDescription>
            <CardFooter style={{ display: "flex", gap: "2em" }}>
              <LikeButton style={{pointerEvents:"none"}}>
                <Like />
                {post?.likes.toString()}
              </LikeButton>
              <CommentButton style={{pointerEvents:"none"}}>
                <Comment />
                {post?.comments?.length}
              </CommentButton>
              <ShareButton style={{pointerEvents:"none"}}>
                <Share />
                {post?.shares.toString()}
              </ShareButton>
            </CardFooter>
          </Card>
        </PostGrid>
      ))}
    </div>
  );
};

export default UserDetails;
