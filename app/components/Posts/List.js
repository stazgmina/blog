import { getPosts } from '@/app/api/posts/route'

import Post from './Post'

const List = async () => {
  const data = await getPosts()

  return (
    <section className='flex flex-wrap justify-center w-full gap-8 py-4 md:py-12'>
        {data.map(post => (
            <Post key={post.id} {...post} />
        ))}
    </section>
  )
}

export default List