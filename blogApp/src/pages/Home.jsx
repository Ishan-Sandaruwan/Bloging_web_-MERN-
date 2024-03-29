import React from 'react'
import {useSelector } from "react-redux";
export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser && currentUser.email}
      Home
    </div>
  )
}
