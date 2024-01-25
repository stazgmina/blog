'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
  const router = useRouter()
  
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    
    const res = await fetch('/api/users',{
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json"
    })

    if(!res.ok){
      const response = await res.json()
      setError(response.message)
    } else {
      router.refresh()
      router.push('/')
    }
  }

  return (
    <div className='border p-2 w-screen h-[calc(100vh-65px)] grid place-items-center'>
      <form onSubmit={handleSubmit} method='post' className="flex flex-col items-center gap-4 p-4 border rounded-md">
        <h1 className='text-2xl'>
          Regsiter
        </h1>
        <input onChange={handleChange} name='name' value={formData.name || ''} className='p-2 border rounded-md' required type="text" placeholder="Username"/>
        <input onChange={handleChange} name='email' value={formData.email || ''} className='p-2 border rounded-md' required type="text" placeholder="E-mail"/>
        <input onChange={handleChange} name='password' value={formData.password || ''} className='p-2 border rounded-md' required type="password" placeholder="password"/>
        <button type='submit' className='p-2 font-bold border rounded-md'>
          Regsiter
        </button>
        <p className='text-red-500'>
          {error}
        </p>
        <Link href='/Pages/Auth/Login'>
          Already have an account? Log in
        </Link>
      </form>
    </div>
  )
}

export default Page