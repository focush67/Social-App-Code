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
  Followers,
} from "@/globals/GlobalStyles";
import { Share, Comment, Like } from "@/globals/GlobalIcons";
import { Post } from "@/globals/GlobalTypes";
import {useRouter} from "next/navigation";

interface UserProps {
  email: string;
  image: string;
  followers: string[];
  following: string[];
}
const UserDetailsForVisitor = ({params}:any) => {
  const [userDetails,setUserDetails] = useState<UserProps>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userPostsLS,setUserPostLS] = useState<Post[]>([]);
  let email = params.id.slice(0, (params.id.indexOf("%")));
  email = email.concat("@gmail.com");
  // console.log(params);
  // console.log("EMAIL: ",email);
  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await axios.get(`/api/posts/?email=${email}`);
      if(!response.data.posts) return null;
      // console.log(response.data.posts);
      setUserPosts(response.data.posts);
      setUserPostLS(JSON.parse(localStorage.getItem("All_Posts") || ""));
    };

    fetchUserPosts();

    const fetchUserDetails = async () => {
      const response = await axios.get(`/api/users/?email=${email}`);
      setUserDetails(response?.data?.user);
    }

    fetchUserDetails();

  }, [email]);

  const filteredPosts = userPostsLS.filter((post:Post) => post.email === email);
  // console.log(filteredPosts);
  return (
    <div>
      <UserDetailsContainer>
        <ProfileImage src={userDetails?.image!} alt="User Profile" width={60} height={60} layout="fixed" />
        <UserInfo>
          <Username>{userPosts[0]?.userName}</Username>  
        <Followers>
          <div style={{marginTop:"1em"}}>Followers</div>
          <div>{userDetails?.followers?.length}</div>
        </Followers>
        <Followers>
          <div style={{marginTop:"1em"}}>Following</div>
          <div>{userDetails?.following?.length}</div>
        </Followers>
        </UserInfo>       
        
      </UserDetailsContainer>

      {filteredPosts?.map((post, index) => (
        <PostGrid style={{margin:"1em"}} key={index}>
          <Card key={index} style={{display:"flex",justifyContent:"space-around",alignItems:"center"}} >
            <CardTitle>{post.title}</CardTitle>
            <CardImage src={post.cover} alt="Post" width={200} height={200} layout="responsive"/>
            <CardDescription>{post.description}</CardDescription>
            <CardFooter style={{display:"flex",gap:"2em"}}>
              <LikeButton>
                <Like />
                {post?.likes.toString()}
              </LikeButton>
              <CommentButton>
                <Comment />
                {post?.comments?.length}
              </CommentButton>
              <ShareButton>
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

export default UserDetailsForVisitor;
