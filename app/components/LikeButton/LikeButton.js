'use client'
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs"

const LikeButton = ({ likeCount, postId }) => {
  const { data: session } = useSession()
  const userId = session?.user.id

  useEffect(() => {
    if(session){
      fetch(`/api/users/${userId}`)
    }
  },[])

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
    <button disabled={!session} onClick={handleLike} className='flex gap-1 text-lg'>
        {likeCount}
        <BsHandThumbsUp size={25}/>
    </button>
  )
}

export default LikeButton