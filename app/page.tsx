"use client";

import { useSession } from "next-auth/react";
import { useRef } from "react";
import axios from "axios";
import "@/app/globals.css";
import { Post } from "@/globals/GlobalTypes";
import { useState, useEffect, useContext } from "react";
import {
  Main,
  PostGrid,
  Card,
  CardTitle,
  CardImage,
  CardFooter,
  CommentButton,
  LikeButton,
  ShareButton,
  CardDescription,
  ProfileImage,
  UserInfo,
  Username,
  Button,
  CardImageContainer,
  AlertContainer,
} from "@/globals/GlobalStyles";

import { Like, Comment, Share } from "@/globals/GlobalIcons";
import CommentSection from "@/components/CommentSection";
import { AppContext } from "@/context/GlobalContext";
import { AppContextType } from "@/globals/GlobalTypes";
import { useRouter } from "next/navigation";
import ShareSection from "@/components/Share";
export default function Home() {
  const commentSectionRef = useRef<HTMLDivElement | null>(null);
  const shareSectionRef = useRef<HTMLDivElement | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [commentSection, setCommentSection] = useState(false);
  const [commentPost, setCommentPost] = useState<Post>();
  const [sharePost, setSharePost] = useState<Post>();
  const [shareSection, setShareSection] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLS, setPostsLS] = useState<Post[]>(); // Posts from localstorage
  const { savePostsToLocalStorage, updatePostLikes } =
    useContext<AppContextType>(AppContext);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await axios.get("/api/posts");
      // console.log(response.data.posts);
      if (!response.data.posts) {
        return null;
      }
      setPosts(response.data.posts);
      savePostsToLocalStorage(response.data.posts);
      setPostsLS(JSON.parse(localStorage.getItem("All_Posts") || ""));
    };

    fetchAllPosts();

    return () => {
      // console.log("Unmounting All Posts Handler");
    };
  }, [commentSection, savePostsToLocalStorage]);


  useEffect(() => {
    const registerNewUser = async() => {
        if(session && session?.user){
          const formData = {
            username: session.user?.name,
            email: session.user?.email,
            image: session.user?.image
          }
          console.log(formData);
          try {
            const response = await axios.post("/api/register", {
              formData
            });
            console.log("Frontend: ",response.data);
          } catch (error:any) {
            console.log(error.message);
          }
        }
    }

    registerNewUser();
  },[session])

  useEffect(() => {
    const handleStrayClicks = (e: any) => {
      if (
        (commentSectionRef.current &&
          !commentSectionRef.current.contains(e.target) &&
          commentSection) ||
        (shareSectionRef.current &&
          !shareSectionRef.current.contains(e.target) &&
          shareSection)
      ) {
        setCommentSection(false);
        setShareSection(false);
      }
    };

    document.addEventListener("click", handleStrayClicks);

    return () => {
      document.removeEventListener("click", handleStrayClicks);
    };
  }, [commentSection, shareSection]);

  const likeAPost = async (post: Post) => {
    if (!session) {
      alert("Login required");
      return;
    }
    try {
      const response = await axios.post(
        `/api/post-update/?email=${post?.email}&id=${post._id}`
      );
      // console.log(response.data);

      const updatedPosts = postsLS?.map((p: Post) =>
        p._id === post._id ? { ...p, likes: Number(p.likes) + 1 } : p
      );
      setPostsLS(updatedPosts);

      updatePostLikes(post._id);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleFollow = async (email: string, initiatorEmail: string) => {
    // console.log("Follow request received for ", email);
    // console.log("Follow request initiated by ", initiatorEmail);

    if (email === initiatorEmail) {
      // console.log("Already following Youself");
      return null;
    }

    if (!initiatorEmail || initiatorEmail.length === 0) {
      router.push("/login");
    } else {
      try {
        const followResponse = await axios.get(
          `/api/users/?emailA=${email}&emailB=${initiatorEmail}`
        );

        // console.log(followResponse.data);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const toggleComment = (post: Post) => {
    // console.log("Toggle comment received");
    setCommentSection(!commentSection);
    setCommentPost(post);
  };

  const toggleShare = (post: Post) => {
    // console.log("Toggle comment received");
    setShareSection(!shareSection);
    setSharePost(post);
  };

  return (
    <>
      <PostGrid
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "1.2em",
          height: "100%",
        }}
      >
        {postsLS?.map((post) => (
          <Card key={post.title}>
            <UserInfo
              style={{
                alignItems: "center",
                gap: "0.1em",
              }}
            >
              <ProfileImage
                src={post?.image!}
                alt={"user"}
                width={50}
                height={50}
                layout="fixed"
                onClick={() => router.push(`/${post.email}`)}
                style={{
                  cursor: "pointer",
                }}
              />
              <Username>{post.userName}</Username>
              <Button
                size={"0.9em"}
                background={"black"}
                color={"white"}
                hoverText={"black"}
                hoverBackground={"white"}
                style={{ marginLeft: "10px" }}
                onClick={() => handleFollow(post?.email, session?.user?.email!)}
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
                width={300}
                height={300}
                layout="fixed"
                loading="lazy"
                style={{
                  borderRadius: "1em",
                }}
              />
            </CardImageContainer>
            <CardDescription
              style={{
                fontSize: "medium",
                marginTop: "0",
              }}
            >
              {post.description}
            </CardDescription>
            <CardFooter>
              <LikeButton onClick={() => likeAPost(post)}>
                {post?.likes.toString()}
                <Like />
              </LikeButton>
              <CommentButton onClick={() => toggleComment(post)}>
                {post?.comments?.length}
                <Comment />
              </CommentButton>
              <ShareButton onClick={() => toggleShare(post)}>
                {post?.shares.toString()}
                <Share />
              </ShareButton>
            </CardFooter>
          </Card>
        ))}
      </PostGrid>

      {commentSection && commentPost && (
        <div
          className={`comment-section ${commentSection ? "active" : ""}`}
          ref={commentSectionRef}
        >
          <div className="comment-section-header">
            <h2>Comments</h2>
          </div>
          <div className="comment-section-content">
            <CommentSection
              post={commentPost}
              setCommentSection={setCommentSection}
            />
          </div>
        </div>
      )}

      {shareSection && sharePost && (
        <div
          className={`share-section ${shareSection ? "active" : ""}`}
          ref={shareSectionRef}
        >
          <div className="share-section-header">
            <h2>Share</h2>
          </div>
          <div className="share-section-content">
            <ShareSection post={sharePost} setShareSection={setShareSection} />
          </div>
        </div>
      )}
    </>
  );
}
