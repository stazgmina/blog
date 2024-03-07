import List from './components/Posts/List'

const Page = () => {
  return (
    <main className="relative p-4 overflow-x-hidden">
      <section className='relative flex items-center justify-center w-full'>
        <img className='w-full max-w-[1650px]  rounded-md' src='https://picsum.photos/1650/300' alt='Hero Image'/>
        <div className='absolute grid w-full max-w-[1650px] h-full border rounded-md place-items-center bg-black/50'>
          <h1 className='text-2xl text-white md:text-4xl'>
            - Dive into Discovery -
          </h1>
        </div>
      </section>
      <List />
    </main>
  );
}

export default Page
