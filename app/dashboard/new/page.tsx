"use client";

import {
  ButtonContainer,
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
  FormTextArea,
  LabelWrapper,
} from "@/globals/GlobalStyles";

import {Comment} from "@/globals/GlobalIcons";
import React, { useEffect, useState } from "react";
import ImageUpload from "@/components/Firebase/PostUpload";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";

interface Comment {
  content: string,
  user: string,
  user_email: string,
  image: string,
};

export interface FormProps {
  _id: string; // Use id here because if localStorage is cached it will also be availabel
  email: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  userName: string;
  image: string;
  likes: Number;
  comments: Comment[];
  shares: Number;
}
const NewPost = () => {
  const initialPostState: FormProps = { 
    _id:"",
    email:"",
    title: "", // post title
    description: "", // post description
    tags: [], // post tags
    cover: "", // post's cover photo
    userName: "", // user's username
    image: "", // user's profile image
    likes: 0, // likes on an image
    comments: [
      {
        content:"",
        user:"",
        user_email:"",
        image: '',
      }
    ], // comments on an image
    shares: 0, // shares of an image
  };

  const { data: session } = useSession();
  const [submitted,setSubmitted] = useState(false);
  const [post, setPost] = useState<FormProps>({
    ...initialPostState,
    email: session?.user?.email!,
    image: session?.user?.image!,
    userName: session?.user?.name!,
  });

  useEffect(()=>{
    if(session){
      setPost((prev:FormProps) => ({
        ...prev,
        email: session?.user?.email || "",
        image: session?.user?.image || "",
        userName: session?.user?.name || "",
      }));
    }
  },[session,submitted])

  const [isCoverUploaded, setIsCoverUploaded] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
  const handleImageUpload = (imageUrl: string) => {
    setPost((prev: any) => ({
      ...prev,
      cover: imageUrl,
    }));

    setIsCoverUploaded(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "tags") {
      const tagsArray = value.split(/[,\s]+/);
      const filteredTags = tagsArray.filter((tag: string) => tag.trim() != " ");
      setPost({
        ...post,
        [name]: filteredTags,
      });
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("Form Data: ", post);
    // console.log("Session: ",session);
    if(!session){
      throw new Error("Some problem occured");
    }

    else if (isCoverUploaded) {
      try {
        setImageUploading(true);
        const response = await axios.post(`/api/posts/?email=${post?.email}`, {
          post: JSON.stringify(post),
        });
        // console.log(response.data);
        setPost(initialPostState);
        setSubmitted(true);
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setImageUploading(false);
      }
    } else {
      console.log("Image upload not complete");
    }
  };
  return (
    <FormContainer>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <LabelWrapper>
          <FormLabel>Title</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </LabelWrapper>
        <LabelWrapper>
          <FormLabel>Description</FormLabel>
          <FormTextArea
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
        </LabelWrapper>
        <LabelWrapper>
          <FormLabel>Tags</FormLabel>
          <FormInput
            type="text"
            name="tags"
            value={post.tags.join(" ")}
            onChange={handleChange}
            required
          />

          <LabelWrapper>
            <FormLabel>Picture</FormLabel>
            <div style={{
              display:"flex",
              
            }}>
            <ImageUpload
              cluster="first"
              title={post.title}
              onImageUpload={handleImageUpload}
            />
          
            </div>
          </LabelWrapper>
        </LabelWrapper>
        <LabelWrapper>
          <FormLabel>Email</FormLabel>
          <FormInput
            type="email"
            name="email"
            value={session?.user?.email!}
            disabled={session?.user?.email === undefined}
            required
          />
        </LabelWrapper>
        <ButtonContainer>
          <FormButton type="submit" disabled={!isCoverUploaded || imageUploading}>
            {
              imageUploading ? <CircularProgress/> : "Create Post"
            }
          </FormButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default NewPost;
