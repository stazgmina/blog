import prisma from '@/prisma/prisma'

export async function GET(req, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: { likedPosts: true }
    })

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response('Error fetching likes', { status: 500 })
  }
}
