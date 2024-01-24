import React from 'react'
import avatar from '../../assets/userPlaceholder.png'

const Page = () => {
  return (
    <div className='px-4 py-8'>
        <div className='flex flex-col p-4 gap-4 items-center max-w-[400px] m-auto'>
            <img src='https://picsum.photos/200' alt='avatar' className='rounded-full shadow-xl w-[200px]'/>
            <input type='text' placeholder='Name' className='border shadow-xl text-lg border p-2 w-full text-center rounded-md'/>
            <button className='border rounded-md shadow-xl text-lg p-2 w-full cursor-pointer'>
                Save settings
            </button>
        </div>
    </div>
  )
}

export default Page