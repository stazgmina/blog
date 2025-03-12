'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { BsCameraFill } from 'react-icons/bs'
import Image from 'next/image'

const Page = () => {
  const { data: session } = useSession()
  const [darkMode, setDarkMode] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  if (session) {
    return (
      <div className="min-h-screen px-4 py-12 bg-gray-50">
        <div className="max-w-2xl p-8 mx-auto bg-white shadow-lg rounded-2xl">
          <h1 className="mb-8 text-3xl font-bold text-center">Account Settings</h1>
          <div className="flex flex-col items-center space-y-8">
            <div className="relative group">
              <div className="relative rounded-full w-[200px] h-[200px] overflow-hidden border-4 border-white shadow-xl transition-transform group-hover:scale-105">
                <Image
                  className="object-cover"
                  src={imagePreview || session.user.image || '/avatars/Default.jpg'}
                  alt="avatar"
                  fill
                  priority
                />
              </div>
              <label
                className="absolute p-3 transition bg-white rounded-full shadow-lg cursor-pointer bottom-2 right-2 hover:bg-gray-100"
                htmlFor="image"
              >
                <BsCameraFill size={20} className="text-gray-600" />
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Profile Image URL</label>
                <input
                  className="w-full p-3 transition border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Display Name</label>
                <input
                  className="w-full p-3 transition border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  placeholder="Your name"
                  value={session.user.name}
                  onChange={(e) => {}}
                />
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-sm font-medium text-gray-600">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <button className="w-full py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="grid min-h-screen place-items-center">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
      </div>
    )
  }
}

export default Page