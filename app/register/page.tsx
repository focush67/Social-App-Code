"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/Firebase/UserUpload";
import { FaSpinner } from "react-icons/fa";

import {
  AlertContainer,
  ButtonContainer,
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
  LabelWrapper,
} from "@/globals/GlobalStyles";

const SignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [isCoverUploaded, setIsCoverUploaded] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(()=>{},[submitted])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("User details: ", formData);

    if (isCoverUploaded) {
      try {
        setImageUploading(true);
        const response = await fetch(`/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ formData }),
        });

        const userInfo = await response.json();

        // console.log(userInfo);

        if (userInfo.status === 401) {
          // Meaning user already exists so redirect to login
          setUserExists(true);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }

        setSubmitted(true);
        
        const id = setTimeout(()=>{
          router.push("/login");
        },3000)

        return () => clearInterval(id);

        
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setImageUploading(false);
      }
    } else {
      console.log("Image not uploaded");
    }
  };

  const handleImageUpload = async (imageUrl: string) => {
    setFormData((prev: any) => ({
      ...prev,
      image: imageUrl,
    }));

    setIsCoverUploaded(true);
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {
        userExists && (
          <AlertContainer>User already exists , Redirecting ...</AlertContainer>
        )
      }
      <form onSubmit={handleSubmit}>
        <LabelWrapper>
          <FormLabel>Username:</FormLabel>
          <FormInput
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </LabelWrapper>

        <LabelWrapper>
          <FormLabel>Email:</FormLabel>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </LabelWrapper>

        <LabelWrapper>
          <FormLabel>Password:</FormLabel>
          <FormInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </LabelWrapper>

        <LabelWrapper>
          <FormLabel>Cover:</FormLabel>
          <ImageUpload
            cluster="second"
            title={formData.email}
            onImageUpload={handleImageUpload}
          />
        </LabelWrapper>

        <ButtonContainer>
          <FormButton
            type="submit"
            disabled={!isCoverUploaded || imageUploading}
          >
            {imageUploading ? <FaSpinner /> : "Create Account"}
          </FormButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default SignupForm;
