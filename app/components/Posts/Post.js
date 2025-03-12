import moment from 'moment'
import Link from 'next/link'
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const Post = ({ id, title, description, content, category, likeCount, author, date, image, imageBig, published }) => {

  const categoryColors = {
    Technology: 'bg-blue-300',
    Politics: 'bg-yellow-300',
    Environment: 'bg-green-300',
    Art: 'bg-red-300',
  }

  return (
    <Link href={`/Pages/Articles/${id}`}>
        <article className='overflow-hidden rounded-lg shadow-xl w-[300px] sm:w-[320px] md:w-[340px] h-[450px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer flex flex-col bg-white'>
            <div className="relative h-[200px] w-full overflow-hidden">
                <img 
                    src={'/images/Default.jpg' || image}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                    alt={title}
                />
            </div>
            <section className="flex flex-col items-start flex-1 gap-3 p-5">
                <div className='flex flex-wrap items-center w-full gap-2'>
                    <p className={`px-3 py-1 text-sm font-medium text-white rounded-full ${categoryColors[category]}`}>
                        {category}
                    </p>
                    {!published && 
                        <p className='px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full'>
                            Draft
                        </p>
                    }
                </div>
                <h1 className='text-xl font-semibold transition-colors line-clamp-2 hover:text-blue-600'>
                    {title}
                </h1>
                <p className='flex-1 text-sm text-gray-600 line-clamp-3'>
                    {description}
                </p>
                <section className='flex items-center justify-between w-full mt-4'>
                    <div className='flex items-center gap-3'>
                        <img 
                            src={author.image || '/avatars/Default.jpg'} 
                            className='rounded-full w-[40px] h-[40px] object-cover border-2 border-gray-100'
                            alt={author.name}
                        />
                        <div>
                            <p className="text-sm font-medium">
                                {author.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                                {moment(date).fromNow()}
                            </p>
                        </div>
                    </div>
                    <button className='flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-600'>
                        <span className="font-medium">{likeCount}</span>
                        <BsHandThumbsUp size={18}/>
                    </button>
                </section>
            </section>
        </article>
    </Link>
  )
}

export default Post