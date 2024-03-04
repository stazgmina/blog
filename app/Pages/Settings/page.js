'use client'
import { useSession } from 'next-auth/react'
import { BsCameraFill } from 'react-icons/bs'


const Page = () => {
  const { data: session } = useSession()
  
  const handleImageChange = () => {''}

  if(session){
    return (
        <div className='px-4 py-8'>
            <div className='flex flex-col p-4 gap-4 items-center max-w-[400px] m-auto'>
                <img src={session.user.image || '/userPlaceholder.png'} alt='avatar' className='rounded-full shadow-xl w-[200px] object-cover p-2'/>
                <label htmlFor="image" className="flex items-center justify-center gap-2 p-2 border rounded-md shadow-xl">
                  <BsCameraFill size={25} />
                  Upload Image
                  <input id="image" name="image" type="file" className="hidden" onChange={handleImageChange} />
                </label>
                <input type='text' placeholder='Name' value={session.user.name} className='w-full p-2 text-lg text-center border rounded-md shadow-xl'/>
                <span className='w-full p-2 text-lg border rounded-md shadow-xl'>
                  <label className={'relative rounded-full cursor-pointer bg-slate-300 w-[40px] h-[20px]'+before}>
                      <input type='checkbox' className='hidden'/>
                  </label>
                </span>
                <button className='w-full p-2 text-lg border rounded-md shadow-xl cursor-pointer'>
                    Save settings
                </button>
            </div>
        </div>
    )
  }else{
    return(
      <h1>Access Denied</h1>
    )
  }
  
}

export default Page

const before = `before:absolute before:top-[2px] before:content-[''] before:left-[2px] before:width-[16px] before:height-[16px] before:bg-white`