'use client'
import React from 'react'
import Link from 'next/link'

const Page = () => {

  return (
    <div className='border p-2 w-screen h-[calc(100vh-65px)] grid place-items-center'>
      <div className="flex flex-col items-center gap-4 p-4 border rounded-md">
        <h1 className='text-2xl'>Log in</h1>
        <input className='p-2 border rounded-md' type="text" placeholder="E-mail"/>
        <input className='p-2 border rounded-md' type="password" placeholder="password"/>
        <button className='p-2 font-bold border rounded-md'>Log in</button>
        <Link href='/Pages/Auth/Register'>Dont have an account yet? Register</Link>
      </div>
    </div>
  )
}

export default Page