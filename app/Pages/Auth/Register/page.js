'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')

  const handleChange = e => {
    setError('')
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
    setIsLoading(true)
    
    try {
        if (!formData.email || !formData.password || !formData.name) {
            setError('Please fill in all fields')
            return
        }

        const res = await fetch('/api/users', {
            method: "POST",
            body: JSON.stringify({ formData }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()
        
        if (!res.ok) {
            setError(data.message)
            return
        }

        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password
        })

        if (result.error) {
            setError(result.error)
            return
        }

        router.push('/')
    } catch (err) {
        setError('An unexpected error occurred. Please try again.')
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className='min-h-[calc(100vh-65px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md p-8 space-y-8 transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-xl'>
        <form onSubmit={handleSubmit} method='post' className='space-y-6'>
          <div className='text-center'>
            <h2 className='mb-2 text-3xl font-extrabold text-gray-900'>Create account</h2>
            <p className='text-sm text-gray-600'>Join us today</p>
          </div>

          {error && (
            <div className='p-4 mb-4 transition-all duration-300 border-l-4 border-red-500 bg-red-50'>
              <p className='text-red-700'>{error}</p>
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <input 
                onChange={handleChange} 
                name='name' 
                value={formData.name || ''} 
                className='relative block w-full px-3 py-3 transition-all duration-300 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                required 
                type="text" 
                placeholder="Username"
              />
            </div>
            <div>
              <input 
                onChange={handleChange} 
                name='email' 
                value={formData.email || ''} 
                className='relative block w-full px-3 py-3 transition-all duration-300 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                required 
                type="email" 
                placeholder="Email address"
              />
            </div>
            <div>
              <input 
                onChange={handleChange} 
                name='password' 
                value={formData.password || ''} 
                className='relative block w-full px-3 py-3 transition-all duration-300 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                required 
                type="password" 
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300`}
          >
            {isLoading ? (
              <span className='flex items-center'>
                <svg className='w-5 h-5 mr-3 -ml-1 text-white animate-spin' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Creating account...
              </span>
            ) : (
              'Create account'
            )}
          </button>

          <div className='text-center'>
            <Link 
              href='/Pages/Auth/Login'
              className='text-sm text-indigo-600 transition-colors duration-300 hover:text-indigo-800'
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page