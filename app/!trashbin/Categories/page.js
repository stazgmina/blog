import React from 'react'
import Link from 'next/link'

import { BsPcDisplay, BsSearch, BsGlobe, BsFilm, BsCashCoin, BsEggFried, BsBook, BsFlower1, BsPaintBucket } from "react-icons/bs";

const categories = [
    {icon: <BsPcDisplay size={40}/>, text: 'Technology'},
    {icon: <BsSearch size={40}/>, text: 'Science'},
    {icon: <BsGlobe size={40}/>, text: 'Lifestyle'},
    {icon: <BsFilm size={40}/>, text: 'Entertainment'},
    {icon: <BsCashCoin size={40}/>, text: 'Buissnes'},
    {icon: <BsEggFried size={40}/>, text: 'Food'},
    {icon: <BsPaintBucket size={40}/>, text: 'Art'},
    {icon: <BsPcDisplay size={40}/>, text: 'Sports'},
    {icon: <BsBook size={40}/>, text: 'Education'},
    {icon: <BsFlower1 size={40}/>, text: 'Enviroment'},
]

const Page = () => {
  return (
    <section className='w-full h-[calc(100vh-65px)] flex flex-wrap p-4 justify-center items-center gap-4'>
        {categories.map(item => (
            <Link key={item.text} className='flex flex-col items-center w-[200px] h-[200px] rounded-md shadow-lg justify-center p-2 text-center border font-bold text-2xl' href=''>
                {item.icon}{item.text}
            </Link>
        ))}
    </section>
  )
}

export default Page