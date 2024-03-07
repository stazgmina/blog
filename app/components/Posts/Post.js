import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

const Post = ({ id, title, description, content, category, likeCount, author, date, image}) => {
  return (
    <article className='overflow-hidden rounded-md shadow-xl max-w-[300px] hover:scale-110 transition cursor-pointer'>
        <img src={image} />
        <section className="flex flex-col items-start gap-2 p-4">
            <p className='px-2 text-white bg-blue-300 rounded-md'>
                {category}
            </p>
            <h1 className='text-xl'>
                {title}
            </h1>
            <p className='text-sm text-gray-400'>
                {description}
            </p>
            <section className='flex items-end justify-between w-full'>
                <div className='flex gap-2'>
                    <img src={author.image || '/assets/userPlaceholder.png'} className='rounded-md w-[50px] h-[50px] object-cover'/>
                    <div>
                        <p>
                            {author.name}
                        </p>
                        <p>
                            {new Date(date).toLocaleString()}
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