"use client";

import React, { useContext } from "react";
import { ToggleContainer, ToggleBall } from "@/globals/GlobalStyles";
import { Theme } from "@/context/GlobalContext";
import { ThemeContextType } from "@/globals/GlobalTypes";
const Toggle = () => {
  const {toggle,mode} = useContext<ThemeContextType>(Theme);
  return (
    <ToggleContainer onClick={toggle}>
      <div>🌙</div>
      <div>🌞</div>
      <ToggleBall
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
      ></ToggleBall>
    </ToggleContainer>
  );
};

export default Toggle;
