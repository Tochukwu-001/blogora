"use client"
import { db } from '@/lib/firebaseconfig';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const UpdateProfile = ({uid, userName}) => {
    const [name, setName] = useState(userName);

    const handleUpdate = async (e)=> {
        e.preventDault()
        if (!name.trim()) {
            alert("Please enter your name")
        }
        try {
            constRef = doc(db, "users", uid)
            await updateDoc(useForkRef, {name});
            alert("Profile updated")
        } catch (error) {
          console.error("Error updating your profile", error);
           alert("Sorry, An error occurred. Please try again!") 
        }
    }
  return (
    <main className='w-full'>
      <form onSubmit={handleUpdate} className='flex flex-col items-center justify-center w-full gap-4'>
        <input placeholder='Enter your name...' className='w-full rounded-md border border-stone-300 outline-none p-2'
        type='text'
        value={name}
        onChange={(e) => setName (e.target.value)} />
        <button type='Submit' className='bg-blue-500 transition-all duration-500 text-white px-5 py-2'>
            Update Your Profile
        </button>
      </form>
    </main>
  )
}

export default UpdateProfile
