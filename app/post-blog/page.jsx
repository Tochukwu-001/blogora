"use server"
import React from 'react'
import PostBlog from './post-blog'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


const page = async () => {
 const session = await auth()
 console.log(session);
 
 
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <main>
        <PostBlog session={session} />
    </main>
  )
}
export default page