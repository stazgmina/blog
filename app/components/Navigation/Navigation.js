import Link from 'next/link'
import { BsHouse, BsGrid, BsHeart, BsPlusSquare, BsGear, BsBoxArrowLeft, BsFileEarmarkText, BsBoxArrowInRight } from "react-icons/bs"

const Navigation = ({ isOpen }) => {
    const session = false

    return (
      <aside className={`bg-white transition shadow-lg flex rounded-bl-md flex-col border-b border-l absolute right-0 top-[101%] max-w-[300px] w-full ${isOpen ? '' : 'translate-x-[100%]'}`}>
          <Link href='/' className='flex items-center justify-center gap-1 p-4'>
              <BsHouse />Home
          </Link>
                            {/* <hr/>
                            <Link href='/Pages/Categories' className='flex items-center justify-center gap-1 p-4'>
                                <BsGrid />Categories
                            </Link> */}
          {session && (
              <>
                  <hr/>
                  <Link href='/Pages/Liked' className='flex items-center justify-center gap-1 p-4'>
                      <BsHeart />Liked
                  </Link>
                  <hr/>
                  <Link href='/Pages/Create' className='flex items-center justify-center gap-1 p-4'>
                      <BsPlusSquare />Create
                  </Link>
                  <hr/>
                  <Link href='/Pages/Posts' className='flex items-center justify-center gap-1 p-4'>
                      <BsFileEarmarkText />Posts
                  </Link>
                  <hr/>
                  <Link href='/Pages/Settings' className='flex items-center justify-center gap-1 p-4'>
                      <BsGear />Settings
                  </Link>
                  <hr/>
                  <button className='flex items-center justify-center gap-1 p-4'><BsBoxArrowLeft />Log out</button>
              </>
          )}
          {!session && (
              <>
                  <hr/>
                  <Link href='/api/auth/signin' className='flex items-center justify-center gap-1 p-4'>
                      <BsBoxArrowInRight />Log in
                  </Link>
              </>
          )}
      </aside>
    );
  }
  
  export default Navigation;
  