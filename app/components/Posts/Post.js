import moment from 'moment'
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const Post = ({ id, title, description, content, category, likeCount, author, date, image}) => {

  const categoryColors = {
    Technology: 'bg-blue-300',
    Politics: 'bg-yellow-300',
    Environment: 'bg-green-300',
    Art: 'bg-red-300',
  }

  return (
    <article className='overflow-hidden rounded-md shadow-xl max-w-[300px] hover:scale-110 transition cursor-pointer flex flex-col'>
        <img src={image} />
        <section className="flex flex-col items-start flex-1 gap-2 p-4">
            <p className={`px-2 text-white rounded-md ${categoryColors[category]}`}>
                {category}
            </p>
            <h1 className='text-xl line-clamp-2'>
                {title}
            </h1>
            <p className='flex-1 text-sm text-gray-400 line-clamp-3'>
                {description}
            </p>
            <section className='flex items-end self-end justify-between w-full'>
                <div className='flex gap-2'>
                    <img src={author.image || '/assets/userPlaceholder.png'} className='rounded-md w-[50px] h-[50px] object-cover'/>
                    <div>
                        <p>
                            {author.name}
                        </p>
                        <p>
                            {moment(date).fromNow()}
                        </p>
                    </div>
                </div>
                <button className='flex gap-1'>
                    {likeCount}
                    <BsHandThumbsUp size={20}/>
                </button>
            </section>
        </section>
    </article>
  )
}

export default Post