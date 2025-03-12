'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import Link from 'next/link'
import Navigation from './Navigation';

import { BsList } from "react-icons/bs";


const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  
  const path = usePathname()

  useEffect(()=>{
    setOpenMenu(false)
  },[path])
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-4 bg-white border-b shadow-lg backdrop-blur-sm bg-opacity-90">
        <Link href={'/'}>
          <h1 className="text-2xl font-semibold transition-colors hover:text-gray-700">News</h1>
        </Link>
        <button 
          onClick={e=>setOpenMenu(!openMenu)}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <BsList size={25}/>
        </button>
        <Navigation isOpen={openMenu}/>
    </header>
  )
}

export default Header