import moment from 'moment'
import { getPostById } from "@/app/api/posts/route"
import LikeButton from '@/app/components/LikeButton/LikeButton'

const Page = async ({ params }) => {
  const data = await getPostById(params.id)
  const { id, title, description, content, category, likeCount, author, date, image, imageBig } = data

  const categoryColors = {
    Technology: 'bg-blue-300',
    Politics: 'bg-yellow-300',
    Environment: 'bg-green-300',
    Art: 'bg-red-300',
  }

  console.log(JSON.stringify(data))
  return (
    <article className="flex flex-col items-center p-2 md:p-12 w-full max-w-[1200px] m-auto">
      <h1 className="py-2 text-xl text-center md:text-4xl md:py-8">
        {title}
      </h1>
      <img src={imageBig} alt='thumbnail' className="rounded-md"/>
      <p className={`m-2 px-2 md:text-xl self-start text-white rounded-md ${categoryColors[category]}`}>
        {category}
      </p>
      <p className="self-start px-2 py-2 text-sm text-gray-400 md:text-xl">
        {description}
      </p>
      <p className="px-2 py-8 md:text-2xl">
        {content}
      </p>
      <section className="flex items-center justify-between w-full p-2 md:py-8">
        <div className="flex gap-2 md:gap-4">
          <img src={author.image || '/assets/userPlaceholder.png'} alt="author-image" className="w-[50px] h-[50px] md:w-[75px] md:h-[75px] rounded-md"/>
          <div>
            <p className="md:text-xl">
              {author.name}
            </p>
            <p className='text-sm md:text-xl'>
              {moment(date).fromNow()}
            </p>
          </div>
        </div>
        <LikeButton likeCount={likeCount} postId={id} />
      </section>
    </article>
  )
}

export default Page