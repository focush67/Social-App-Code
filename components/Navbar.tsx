"use client";

import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  NavigationWrapper,
  NavLogo,
  NavLinks,
  NavLink,
  NavProfileImage,
} from "@/globals/GlobalStyles";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Toggle from "./ToggleMode";
import { MessageIcon, Hamburger } from "@/globals/GlobalIcons";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";

const StyledNavbar = styled(NavigationWrapper)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: auto;
  background-color: #000; // Customize the background color
`;

const StyledNavLinks = styled(NavLinks)`
  display: flex;
  align-items: center;
  @media (max-width: 450px) {
    display: none;
  }
`;

const StyledNavLogo = styled(NavLogo)`
  max-width: 100%;

  @media (max-width: 450px) {
    display: none;
  }
`;

const StyledHamburger = styled.div`
  display: none;

  @media (max-width: 450px) {
    display: flex;
    align-items: center;
  }
`;

const StyledDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  width: auto;
  padding: 20px;
  background-color: #333;
  color: #fff;
`;

// ... (imports)

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 450px)');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <StyledNavbar>
      <StyledNavLogo
        src="https://firebasestorage.googleapis.com/v0/b/fir-ecommerce-6e8b5.appspot.com/o/logo.png?alt=media&token=abed9735-ba7e-40bc-a53a-9c871443a4c2&_gl=1*1fdx000*_ga*NjQ4NDcyMDg4LjE2OTY0ODIwODA.*_ga_CW55HF8NVT*MTY5ODkyODgwNi40Mi4xLjE2OTg5Mjg5MDQuNDMuMC4w"
        alt="Logo"
        width={40}
        height={40}
        style={{
          display: "block",
          textAlign: "center",
        }}
        onClick={() => router.push("/")}
      />

      {isMobile ? (
        <StyledHamburger onClick={toggleMenu}>
          {session && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "1rem",
              }}
            >
              <MessageIcon />
              <NavLink
                style={{ marginTop: "auto" }}
                href={`/dashboard/${session?.user?.email}`}
              ></NavLink>
            </div>
          )}
          <Hamburger />
        </StyledHamburger>
      ) : (
        <StyledNavLinks>
          <Toggle />
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/dashboard"}>Dashboard</NavLink>
          {session ? (
            <>
              <NavProfileImage
                src={session?.user?.image!}
                alt={session?.user?.name || "user"}
                width={50}
                height={40}
                layout="fixed"
              />
              <NavLink
                style={{ marginTop: "auto" }}
                href={`/dashboard/${session?.user?.email}`}
              >
                <MessageIcon />
              </NavLink>
              <Button
                background="red"
                color="white"
                size="1rem"
                hoverBackground="firebrick"
                hoverText="white"
                onClick={() => signOut({ redirect: false })}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                background="darkGreen"
                color="white"
                size="1rem"
                hoverBackground="green"
                hoverText="white"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                background="darkBlue"
                color="white"
                size="1rem"
                hoverBackground="mediumBlue"
                hoverText="white"
                onClick={() => router.push("/register")}
              >
                SignUp
              </Button>
            </>
          )}
        </StyledNavLinks>
      )}

      <Drawer anchor="top" open={isMenuOpen} onClose={toggleMenu}>
        <StyledDrawerContent>
          <Toggle />
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/dashboard"}>Dashboard</NavLink>
          {session ? (
            <>
              <Button
                background="red"
                color="white"
                size="1rem"
                hoverBackground="firebrick"
                hoverText="white"
                onClick={() => signOut({ redirect: false })}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                background="darkGreen"
                color="white"
                size="1rem"
                hoverBackground="green"
                hoverText="white"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                background="darkBlue"
                color="white"
                size="1rem"
                hoverBackground="mediumBlue"
                hoverText="white"
                onClick={() => router.push("/register")}
              >
                SignUp
              </Button>
            </>
          )}
        </StyledDrawerContent>
      </Drawer>
    </StyledNavbar>
  );
};

export default Navbar;

