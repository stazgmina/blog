'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { BsCameraFill } from 'react-icons/bs'

// DODAC WYSIWYG moze(quill) dodac podgląd np: (guzik który wprzełącza podgląd i edytor
// i pokazuje jak będzie wyglądał post w czasie  rzeczywistym)

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
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <section className="flex flex-col items-stretch max-w-3xl gap-6 p-8 m-auto bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center">Create New Post</h1>
        
        <input
          type="text"
          name="title"
          placeholder="Enter post title"
          className="flex-1 w-full p-3 text-xl text-center transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.title}
          onChange={handleInputChange}
        />
        
        <textarea
          name="description"
          placeholder="Write a brief description"
          className="w-full p-3 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px] transition-all"
          value={formData.description}
          onChange={handleInputChange}
        />
        
        <textarea
          name="content"
          placeholder="Write your post content"
          className="border border-gray-200 p-3 rounded-lg w-full min-h-[300px] text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={formData.content}
          onChange={handleInputChange}
        />
        
        <select
          name="category"
          className="w-full p-3 text-center transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option>Technology</option>
          <option>Environment</option>
          <option>Politics</option>
          <option>Art</option>
        </select>
        
        <label htmlFor="image" className="flex items-center justify-center w-full gap-3 p-4 transition-all border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500">
          <BsCameraFill size={25} className="text-gray-500" />
          <span className="text-gray-600">{formData.image ? formData.image.name : 'Upload thumbnail image'}</span>
          <input id="image" name="image" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
        </label>
        
        {imagePreview && 
            <div className='relative w-full max-w-md mx-auto overflow-hidden border rounded-lg shadow-md aspect-video'>
                <img src={imagePreview} alt='image preview' className='absolute inset-0 object-cover w-full h-full'/>
            </div>
        }
        
        <select
          name="published"
          className="w-full p-3 text-center transition-all border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.published}
          onChange={handleInputChange}
        >
          <option value={false}>Draft</option>
          <option value={true}>Publish</option>
        </select>
        
        <button 
          onClick={handleSubmit} 
          className="w-full md:max-w-[250px] p-3 mx-auto mt-4 text-center text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
        
        <p className="text-sm text-center text-gray-500">
          {new Date().toISOString().slice(0, 10)}
        </p>
      </section>
    </div>
  )
}

export default Page
