import React from "react"
import LoginPage from "./Pages/LoginPage/LoginPage"
import Home from "./Pages/Home/Home"
import SignupPage from "./Pages/SignupPage/SignupPage"
import { Route, Routes } from "react-router-dom"


export default function app(){
  return(
    <>
    <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Home/>} />
    <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </>
  )
}