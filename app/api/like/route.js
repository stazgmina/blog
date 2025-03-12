import prisma from '@/prisma/prisma'

export async function PUT(req) {
  const { postId, userId, action } = await req.json()

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    const updateLikeCount = action === 'like' ? { increment: 1 } : { decrement: 1 }
    const userLikedPosts = action === 'like' 
      ? { push: postId }
      : { set: { likedPosts: { array_remove: postId } } }

    await Promise.all([
      prisma.post.update({
        where: { id: postId },
        data: { likeCount: updateLikeCount }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { likedPosts: userLikedPosts }
      })
    ])

    return new Response('Success', { status: 200 })
  } catch (error) {
    return new Response('Error processing request', { status: 500 })
  }
}