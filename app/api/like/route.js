import prisma from '@/prisma/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req) {
    try {
        const { postId, userId } = await req.json();

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { likedPosts: true }
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const isLiked = user.likedPosts.includes(postId);

        if (isLiked) {
            await prisma.post.update({
                where: { id: postId },
                data: { likeCount: { decrement: 1 } }
            });

            await prisma.user.update({
                where: { id: userId },
                data: { likedPosts: { set: user.likedPosts.filter(id => id !== postId) } }
            });
        } else {
            await prisma.post.update({
                where: { id: postId },
                data: { likeCount: { increment: 1 } }
            });

            await prisma.user.update({
                where: { id: userId },
                data: { likedPosts: { push: postId } }
            });
        }

        return NextResponse.json(
            { message: 'success' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);

        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}