import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getPosts } from '@/app/api/posts/route'
import Post from '../../components/Posts/Post'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Page = async () => {
  try {
    const session = await getServerSession(authOptions)
    console.log('Full session object:', JSON.stringify(session, null, 2))
    
    if (!session?.user) {
      console.log('Session or user not found, redirecting...')
      redirect('/auth/signin')  // Changed redirect path to match authOptions
      return null
    }

    const data = await getPosts()
    console.log('Posts data:', data)

    return (
      <section className='flex flex-wrap justify-center w-full gap-8 py-4 md:py-12'>
        {data?.map(post => 
          post.author.name === session.user.name && (
            <Post key={post.id} {...post} />
          )
        )}
      </section>
    )
  } catch (error) {
    console.error('Error in Posts page:', error)
    redirect('/auth/signin')
    return null
  }
}

export default Page