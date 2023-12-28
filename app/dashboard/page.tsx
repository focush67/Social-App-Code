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
import { Post, Profile } from "@/globals/GlobalTypes";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export interface UserProps {
  email: string;
  image: string;
  followers: string[];
  following: string[];
}

const UserDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);
  const [userDetails, setUserDetails] = useState<UserProps>();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userPostsLS, setUserPostLS] = useState<Post[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followerProfiles, setFollowerProfiles] = useState<Profile[]>([]);
  const [followingProfiles, setFollowingProfiles] = useState<Profile[]>([]);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const router = useRouter();

  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await axios.get(`/api/posts/?email=${email}`);
      if (!response.data.posts) return null;
      setUserPosts(response.data.posts);
      setUserPostLS(JSON.parse(localStorage.getItem("All_Posts") || ""));
    };

    fetchUserPosts();

    const fetchUserDetails = async () => {
      const response = await axios.get(
        `/api/users/?email=${session?.user?.email}`
      );
      setUserDetails(response?.data?.user);
    };

    fetchUserDetails();

    const fetchUserFollowersAndFollowing = async () => {
      try {
        const response = await axios.get(
          `/api/users/?email=${session?.user?.email}`
        );
        const currentUserDetails = response?.data?.user;
        if (currentUserDetails) {
          const { followers, following } = currentUserDetails;

          const followersPromises = followers?.map((followerEmail: string) =>
            axios.get(`/api/users/?email=${followerEmail}`)
          );

          const followersResponses = await Promise.all(followersPromises);

          const followersProfiles = followersPromises
            ?.map((response: any) => response?.data?.user)
            .filter(Boolean);

          const followingPromises = following?.map((followingEmail: string) =>
            axios.get(`/api/users/?email=${followingEmail}`)
          );

          const followingResponses = await Promise.all(followingPromises);

          const followingProfiles = followingResponses
            .map((response) => response?.data?.user)
            .filter(Boolean);

          setFollowerProfiles(followersProfiles);
          setFollowingProfiles(followingProfiles);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchUserFollowersAndFollowing();
  }, [email, session?.user?.email]);

  const filteredPosts = userPostsLS?.filter(
    (post: Post) => post?.email === email
  );

  const handlePostDelete = async (post: Post) => {
    console.log("Post received for deletion: ", post);
    try {
      const response = await axios.delete(`/api/post-update/?_id=${post._id}`);
      console.log(response.data);

      setUserPostLS((prevUserPostsLS) => {
        const updatedUserPostsLS = prevUserPostsLS.filter(
          (userPost: Post) => userPost._id !== post._id
        );
        localStorage.setItem("All_Posts", JSON.stringify(updatedUserPostsLS));
        return updatedUserPostsLS;
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleFollowersClick = () => {
    setFollowerProfiles(followerProfiles);
    setShowFollowers(true);
    setShowFollowing(false);
    setSelectedProfiles(followerProfiles);
    setIsDialogOpen(true);
  };

  const handleFollowingClick = () => {
    setFollowingProfiles(followingProfiles);
    setShowFollowing(true);
    setShowFollowers(false);
    setSelectedProfiles(followingProfiles);
    setIsDialogOpen(true);
  };

  return (
    <div
    >
      <UserDetailsContainer
      >
        <ProfileImage
          src={session?.user?.image!}
          alt="User Profile"
          width={60}
          height={60}
          layout="fixed"
        />
        <UserInfo>
          <Username>{session?.user?.name}</Username>
          <Followers
            onClick={handleFollowersClick}
            style={{
              cursor: "pointer",
              margin: "1em",
            }}
          >
            <div style={{ marginTop: "1em" }}>Followers</div>
            <div>{userDetails?.followers?.length}</div>
          </Followers>
          <Followers
            onClick={handleFollowingClick}
            style={{
              cursor: "pointer",
              marginTop: "1em",
            }}
          >
            <div style={{ marginTop: "1em" }}>Following</div>
            <div>{userDetails?.following?.length}</div>
          </Followers>

          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>
              {showFollowers ? "Followers" : "Following"}
            </DialogTitle>
            <DialogContent>
              {selectedProfiles?.map((profile, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "2em",
                    margin: "1em",
                    textAlign: "center",
                    cursor:"pointer"
                  }}
                >
                  <ProfileImage
                    src={profile?.image}
                    alt={`Profile Image of ${profile?.name}`}
                    width={40}
                    height={40}
                    onClick={() => router.push(`/${profile?.email}`)}
                  />
                  <div>{profile?.name}</div>
                  {/* Add additional profile information as needed */}
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)} disabled={false}>Close</Button>
            </DialogActions>
          </Dialog>
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
              minHeight: "500px",
            }}
          >
            <CardTitle>{post.title}</CardTitle>
            <Button
              size="1em"
              background="darkred"
              hoverBackground="maroon"
              color="white"
              hoverText="white"
              onClick={() => handlePostDelete(post)}
            >
              Delete
            </Button>
            <CardImage
              src={post.cover}
              alt="Post"
              width={200}
              height={200}
              layout="fixed"
            />
            <CardDescription>{post.description}</CardDescription>
            <CardFooter style={{ display: "flex", gap: "2em" }}>
              <LikeButton style={{ pointerEvents: "none" }}>
                <Like />
                {post?.likes.toString()}
              </LikeButton>
              <CommentButton style={{ pointerEvents: "none" }}>
                <Comment />
                {post?.comments?.length}
              </CommentButton>
              <ShareButton style={{ pointerEvents: "none" }}>
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
