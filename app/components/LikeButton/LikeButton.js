'use client'
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs"

const LikeButton = ({ likeCount: initialLikeCount, postId }) => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if(session) {
      fetch(`/api/users/${userId}/likes`)
        .then(res => res.json())
        .then(data => {
          setIsLiked(data.likedPosts.includes(postId))
        })
    }
  }, [session, userId, postId])

  const handleLike = async () => {
    const response = await fetch('/api/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        userId,
        action: isLiked ? 'unlike' : 'like'
      })
    })

    if (response.ok) {
      setIsLiked(!isLiked)
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    }
  }

  return (
    <button disabled={!session} onClick={handleLike} className='flex items-center gap-1 text-lg'>
      {likeCount}
      {isLiked ? <BsHandThumbsUpFill size={25}/> : <BsHandThumbsUp size={25}/>}
    </button>
  )
}

export default LikeButton