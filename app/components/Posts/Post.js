import React from 'react'
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const Post = () => {
  return (
    <article className='overflow-hidden rounded-md shadow-xl max-w-[300px] hover:scale-110 transition cursor-pointer'>
        <img src="https://picsum.photos/300/200"/>
        <section className="flex flex-col items-start gap-2 p-4">
            <p className='px-2 text-white bg-blue-300 rounded-md'>
                Technology
            </p>
            <h1 className='text-xl'>
                Why is the Tesla Cybertruck designed the way it is?
            </h1>
            <p className='text-sm text-gray-400'>
                An exploration into truck's polarising design
            </p>
            <section className='flex items-end justify-between w-full'>
                <div className='flex gap-2'>
                    <img src='https://picsum.photos/50' className='rounded-md'/>
                    <div>
                        <p>
                            Author's Name
                        </p>
                        <p>
                            2h ago
                        </p>
                    </div>
                </div>
                <button className='flex gap-1'>
                    221
                    <BsHandThumbsUp size={20}/>
                </button>
            </section>
        </section>
    </article>
  )
}

export default Post