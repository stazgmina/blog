import { getServerSession } from 'next-auth'
import { getPosts } from '@/app/api/posts/route'

import Post from '../../components/Posts/Post'

const Page = async () => {
  const session = await getServerSession()
  console.log(`SESJA UOUO: ${JSON.stringify(session)}`)
  const data = await getPosts()

  return (
    session&&(
            <section className='flex flex-wrap justify-center w-full gap-8 py-4 md:py-12'>
                {data.map(post => (
                    post.author.name===session.user.name&&(
                        <Post key={post.id} {...post} />
                    )
                ))}
            </section>
    )
  )
}

export default Page