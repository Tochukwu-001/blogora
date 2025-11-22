import { auth, signOut } from '@/auth';
import UpdateProfile from '@/components/UpdateProfile';
import { redirect } from 'next/navigation';
import React from 'react';
import { FiLogOut } from "react-icons/fi";

const page = async () => {
    const session = await auth()
    const uid = session?.user?.id;
    const userName = session?.user?.name;

    if (!session) {
      redirect("/auth/login")
    }
  return (
    <main className='min-h-dvh bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4'>
     <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col items-center mt-2">
       <div className="relative mb-6">
        <img src={session?.user?.image} 
        alt={session?.user?.name.slice(0, 1).toUpperCase()}
        className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"/>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{session?.user?.name || "User"}</h1>
        <p>{session?.user?.email}</p>
        <div className='mt-10 w-full'>
         <h2 className='text-xl font-semibold text-gray-700 mb-4 text-center'>Update Your Profile</h2> 
         <UpdateProfile uid={uid} userName={userName} />
        </div>

          <form
      action={async () => {
        "use server"
        await signOut()
      }}
     >
      <button className='mt-8 flex items-center justify-end gap-3 bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-800 transition-all duration-300 font-medium shadow-sm'>
        <FiLogOut />
       Log Out
      </button>
    </form>
       </div> 
    </main>
  )
}

export default page
