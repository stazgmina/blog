'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import avatar from '../../assets/userPlaceholder.png'

const Page = () => {
  const { data: session } = useSession()

  if(session){
    return (
      <div className='px-4 py-8'>
          <div className='flex flex-col p-4 gap-4 items-center max-w-[400px] m-auto'>
              <img src='https://picsum.photos/200' alt='avatar' className='rounded-full shadow-xl w-[200px]'/>
              <input type='text' placeholder='Name' value={session?.user.name} className='w-full p-2 text-lg text-center border rounded-md shadow-xl'/>
              <button className='w-full p-2 text-lg border rounded-md shadow-xl cursor-pointer'>
                  Save settings
              </button>
          </div>
      </div>
    )
  } else {
    return <h1>Access Denied</h1>
  }
}

export default Page