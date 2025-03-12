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
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl px-4 py-8 mx-auto md:py-16">
        <h1 className="mb-8 text-3xl font-bold leading-tight text-center md:text-5xl">
          {title}
        </h1>
        <div className="relative w-full h-[300px] md:h-[500px] mb-8 rounded-xl overflow-hidden">
          <img 
            src={'/images/Default.jpg'|| ImageBig} 
            alt='thumbnail' 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <p className={`px-4 py-1 text-sm md:text-base font-medium text-white rounded-full ${categoryColors[category]}`}>
              {category}
            </p>
            <p className="text-sm text-gray-500 md:text-base">
              {moment(date).format('MMMM DD, YYYY')}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            {description}
          </p>
          <div className="w-full h-px my-8 bg-gray-200"></div>
          <p className="text-lg leading-relaxed md:text-xl">
            {content}
          </p>
        </div>
        <section className="flex flex-col items-center justify-between gap-4 py-6 mt-12 border-t sm:flex-row">
          <div className="flex items-center gap-4">
            <img 
              src={author.image || '/avatars/Default.jpg'} 
              alt="author" 
              className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <p className="text-lg font-semibold md:text-xl">
                {author.name}
              </p>
              <p className='text-sm text-gray-500 md:text-base'>
                {moment(date).fromNow()}
              </p>
            </div>
          </div>
          <LikeButton likeCount={likeCount} postId={id} />
        </section>
      </div>
    </article>
  )
}

export default Page