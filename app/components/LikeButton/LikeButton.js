'use client'
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs"
import { useSession } from "next-auth/react"

const LikeButton = ({ likeCount, postId }) => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const handleLike = () => {
    fetch('/api/like',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: postId,
            userId: userId,
            likeCount: likeCount
        })
    })
  }

  return (
    <button onClick={handleLike} className='flex gap-1 text-lg'>
        {likeCount}
        <BsHandThumbsUp size={25}/>
    </button>
  )
}

export default LikeButton