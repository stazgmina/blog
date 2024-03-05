'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { BsCameraFill } from 'react-icons/bs'

const Page = () => {
  const { data: session } = useSession()

  const handleImageChange = () => { /* Handle image change logic */ }

  if (session) {
    return (
      <div className="px-4 py-8">
        <div className="flex flex-col items-center max-w-[400px] p-4 gap-4 m-auto">
          <img
            className="rounded-full w-[200px] object-cover shadow-xl p-2"
            src={session.user.image || '/userPlaceholder.png'}
            alt="avatar"
          />
          <label
            className="flex items-center justify-center gap-2 p-2 border rounded-md shadow-xl"
            htmlFor="image"
          >
            <BsCameraFill size={25} />
            Upload Image
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <input
            className="w-full p-2 text-lg text-center border rounded-md shadow-xl"
            type="text"
            name="imageUrl"
            placeholder="Image Url"
          />
          <input
            className="w-full p-2 text-lg text-center border rounded-md shadow-xl"
            type="text"
            placeholder="Name"
            value={session.user.name}
            onChange={handleImageChange}
          />
          <div className="w-full p-2 text-lg border rounded-md shadow-xl">
            <label className="relative rounded-full cursor-pointer bg-slate-300 w-[40px] h-[20px]">
              <input type="checkbox" className="hidden" />
            </label>
          </div>
          <button className="w-full p-2 text-lg border rounded-md shadow-xl cursor-pointer">
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


const before = `before:absolute before:top-[2px] before:content-[''] before:left-[2px] before:width-[16px] before:height-[16px] before:bg-white`