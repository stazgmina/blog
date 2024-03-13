'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { BsCameraFill } from 'react-icons/bs'

const Page = () => {
  const { data: session } = useSession()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Technology',
    image: null,
    published: false,
    authorId: session?.user.id || null
  })

  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageChange = e => {
    const file = e.target.files[0]

    if(file){
        setFormData({
            ...formData,
            image: file
        })
        
        const previewUrl = URL.createObjectURL(file)
         setImagePreview(previewUrl)
    }
  }

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
  
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formDataToSend
      });
  
      if (response.ok) {
        console.log('Data sent');
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="px-4 py-8">
      <section className="flex flex-col gap-8 m-auto items-center max-w-[1000px] border-b">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="flex-1 w-full p-2 text-xl text-center border rounded-md shadow-xl"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 text-lg border rounded-md shadow-xl resize-y"
          value={formData.description}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          className="border shadow-xl p-2 rounded-md w-full h-[250px] resize-y text-lg"
          value={formData.content}
          onChange={handleInputChange}
        />
        <select
          name="category"
          className="w-full p-2 text-center border rounded-md shadow-xl"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option>Technology</option>
          <option>Environment</option>
          <option>Politics</option>
          <option>Art</option>
        </select>
        <label htmlFor="image" className="flex items-center justify-center w-full gap-2 p-2 border rounded-md shadow-xl">
          <BsCameraFill size={25} />
          {formData.image ? formData.image.name : 'Upload thumbnail image'}
          <input id="image" name="image" type="file" className="hidden" onChange={handleImageChange} />
        </label>
        {imagePreview && 
            <div className='grid p-4 border rounded-md shadow-xl place-items-center aspect-square'>
                <img src={imagePreview} alt='image preview' className='object-contain'/>
            </div>
        }
        <select
          name="published"
          className="w-full p-2 text-center border rounded-md shadow-xl"
          value={formData.published}
          onChange={handleInputChange}
        >
          <option value={false}>Draft</option>
          <option value={true}>Publish</option>
        </select>
        <button onClick={handleSubmit} className="max-w-[250px] w-full p-2 text-center border rounded-md shadow-xl">
          Submit
        </button>
        <p>{new Date().toISOString().slice(0, 10)}</p>
      </section>
    </div>
  )
}

export default Page
