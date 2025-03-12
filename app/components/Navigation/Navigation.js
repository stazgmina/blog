'use client'
import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react"
import Link from 'next/link'

import { BsHouse, BsGrid, BsHeart, BsPlusSquare, BsGear, BsBoxArrowLeft, BsFileEarmarkText, BsBoxArrowInRight } from "react-icons/bs"

const Navigation = ({ isOpen }) => {
    const { data: session } = useSession()
    console.log(session)

    return (
        <aside className={`bg-white transition-transform duration-300 ease-in-out shadow-lg flex rounded-bl-md flex-col border-b border-l fixed right-0 top-[73px] lg:top-[81px] max-w-[300px] w-[85vw] sm:w-[300px] min-h-[200px] ${isOpen ? '' : 'translate-x-[100%]'}`}>
            <Link href='/' className='flex items-center justify-start gap-2 p-4 transition-colors hover:bg-gray-50'>
                <BsHouse className="text-gray-600" />
                <span>Home</span>
            </Link>
            {session && (
                <>
                    <hr className="border-gray-100"/>
                    <Link href='/Pages/Liked' className='flex items-center justify-start gap-2 p-4 transition-colors hover:bg-gray-50'>
                        <BsHeart className="text-gray-600" />
                        <span>Liked</span>
                    </Link>
                    <hr className="border-gray-100"/>
                    <Link href='/Pages/Create' className='flex items-center justify-start gap-2 p-4 transition-colors hover:bg-gray-50'>
                        <BsPlusSquare className="text-gray-600" />
                        <span>Create</span>
                    </Link>
                    <hr className="border-gray-100"/>
                    <Link href='/Pages/Posts' className='flex items-center justify-start gap-2 p-4 transition-colors hover:bg-gray-50'>
                        <BsFileEarmarkText className="text-gray-600" />
                        <span>Posts</span>
                    </Link>
                    <hr className="border-gray-100"/>
                    <Link href='/Pages/Settings' className='flex items-center justify-start gap-2 p-4 transition-colors hover:bg-gray-50'>
                        <BsGear className="text-gray-600" />
                        <span>Settings</span>
                    </Link>
                    <hr className="border-gray-100"/>
                    <button 
                        onClick={() => signOut()} 
                        className='flex items-center justify-start w-full gap-2 p-4 text-red-500 transition-colors hover:bg-gray-50'
                    >
                        <BsBoxArrowLeft />
                        <span>Log out</span>
                    </button>
                </>
            )}
            {!session && (
                <>
                    <hr className="border-gray-100"/>
                    <Link href='/Pages/Auth/Login' className='flex items-center justify-start gap-2 p-4 transition-colors hover:bg-gray-50'>
                        <BsBoxArrowInRight className="text-gray-600" />
                        <span>Log in</span>
                    </Link>
                </>
            )}
        </aside>
    );
}

export default Navigation;
