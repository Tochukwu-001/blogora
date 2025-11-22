import React from 'react'
import { redirect } from "next/navigation";
import Blog from "./blog";
import { auth } from "@/auth";

const page = async () => {

  //this will protect the blog route
  const session = await auth();
  if (!session) {
    redirect("/auth/login")
  }
  return (
    <main>
      <Blog session={session} />
    </main>
  )
}

export default page
