"use client";
import React from 'react'
import {CircularProgress} from "@mui/material";
const Loader = () => {
  return (
    <div style={{margin:"auto auto"}}>
      Loading
        <CircularProgress size={200}/>
    </div>
  )
}

export default Loader