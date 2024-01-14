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
    <header className="relative z-10 flex items-center justify-between w-full p-4 bg-white border-b shadow-lg">
        <Link href={'/'}>
          <h1 className="text-2xl cursor-pointer">News</h1>
        </Link>
        <button onClick={e=>setOpenMenu(!openMenu)}>
          <BsList size={25}/>
        </button>
        <Navigation isOpen={openMenu}/>
    </header>
  )
}

export default Header