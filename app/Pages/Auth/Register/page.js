'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const Page = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    console.log([username, email, password])
  }

  return (
    <div className='border p-2 w-screen h-[calc(100vh-65px)] grid place-items-center'>
      <div className="flex flex-col items-center gap-4 p-4 border rounded-md">
        <h1 className='text-2xl'>Regsiter</h1>
        <input onChange={e=>setUsername(e.target.value)} className='p-2 border rounded-md' type="text" placeholder="Username"/>
        <input onChange={e=>setEmail(e.target.value)} className='p-2 border rounded-md' type="text" placeholder="E-mail"/>
        <input onChange={e=>setPassword(e.target.value)} className='p-2 border rounded-md' type="password" placeholder="password"/>
        <button onClick={handleSubmit} className='p-2 font-bold border rounded-md'>Regsiter</button>
        <Link href='/Pages/Auth/Login'>Already have an account? Log in</Link>
      </div>
    </div>
  )
}

export default Page