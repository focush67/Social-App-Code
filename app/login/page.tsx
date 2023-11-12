"use client";

import {
  FormContainer,
  LabelWrapper,
  FormLabel,
  FormInput,
  ButtonContainer,
  FormButton,
  Button,
  AlertContainer
} from "@/globals/GlobalStyles";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [alert,setAlert] = useState(false);
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    if(alert){
      const id = setTimeout(()=>{
        setAlert(false);
        setFormData({
          email:"",
          password:"",
        });
      },4000);

      return () => clearInterval(id);

    }
  },[alert])


  const isLoggedIn = session ? true : false;

  useEffect(() => {
    if(isLoggedIn){
      const id = setTimeout(()=>{
        setFormData({
          email:"",
          password:"",
        });
        router.push("/");
      },2000);

      return () => clearInterval(id);

    }
  },[isLoggedIn,router])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("FormData received: ", formData);

    try {
      const response = await signIn("credentials", {
        email: formData?.email,
        password: formData?.password,
        redirect: false,
      });

      // console.log(response);
      if(response?.status === 401){
        console.log("User not found");
        setAlert(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <FormContainer style={{
        width:"fit-content"
    }}>
      <h2>Login</h2>
      {
        alert && (
          <AlertContainer>Invalid Credentials , Retry</AlertContainer>
        )
      }
      <form onSubmit={handleSubmit}>
        <LabelWrapper>
          <FormLabel>Email</FormLabel>
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={(e: any) =>
              setFormData((prev: any) => ({
                ...formData,
                email: e.target.value,
              }))
            }
            required
          />
        </LabelWrapper>

        <LabelWrapper>
          <FormLabel>Password</FormLabel>
          <FormInput
            type="password"
            name="password"
            value={formData.password}
            onChange={(e: any) =>
              setFormData((prev: any) => ({
                ...formData,
                password: e.target.value,
              }))
            }
            required
          />
        </LabelWrapper>

        <ButtonContainer>
          <FormButton
            disabled={isLoggedIn}
            style={{ pointerEvents: isLoggedIn ? "none" : "inherit" }}
          >
            Login with Email
          </FormButton>
        </ButtonContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          or
        </div>
        <ButtonContainer>

          <Button
            type="button"
            background="dimgray"
            color="white"
            size="1em"
            hoverBackground="black"
            hoverText="white"
            onClick={() => router.push("/register")}
            style={{ pointerEvents: isLoggedIn ? "none" : "inherit" }}
          >
            SignUp
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default Login;
