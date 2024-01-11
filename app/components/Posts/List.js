import React from 'react'
import Post from './Post'

const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

const List = () => {
  return (
    <section className='flex flex-wrap justify-center w-full gap-8 py-4 md:py-12'>
        {items.map(item => (
            <Post key={item}/>
        ))}
    </section>
  )
}

export default List