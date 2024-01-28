'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginForm = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData( prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        })

        if (result.error) {
            // Błąd logowania
            console.error('Błąd logowania:', result.error)
        } else {
            // Pomyślne zalogowanie
            console.log('Zalogowano pomyślnie:', result)
            // Możesz tutaj przekierować użytkownika lub zaktualizować widok
            router.push('/')
        }
    }

    return (
        <div className='border p-2 w-screen h-[calc(100vh-65px)] grid place-items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 p-4 border rounded-md'>
                <h1 className='text-2xl'>Log in</h1>
                <input
                    onChange={handleChange}
                    name='email'
                    value={formData.email || ''}
                    className='p-2 border rounded-md'
                    required
                    type='text'
                    placeholder='E-mail'
                />
                <input
                    onChange={handleChange}
                    name='password'
                    value={formData.password || ''}
                    className='p-2 border rounded-md'
                    required
                    type='password'
                    placeholder='Password'
                />
                <button type='submit' className='p-2 font-bold border rounded-md'>
                    Log in
                </button>
                <Link href='/Pages/Auth/Register'>Dont have an account yet? Register</Link>
            </form>
        </div>
    )
}

export default LoginForm
