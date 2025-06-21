import{ useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setsubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => { 
    if (!title) return toast.error('Please enter a title');
    
    try {
      setLoading(true);
      const { data } = await axios.post('/api/blog/generate', { prompt:title });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      const blog = {
        title, subTitle,
        description: quillRef.current.root.innerHTML,
        category, isPublished
      }

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image);

      const { data } = await axios.post('/api/blog/add', formData)

      if (data.success) { 
        toast.success(data.message);
        setImage(false);
        setTitle('');
        quillRef.current.root.innerHTML = '';
        setCategory('Startup');
      }
    } catch (error) {
      toast.error(error.message);
    }finally {
      setIsAdding(false);
    }

  }

  useEffect(() => {
    // Initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow', 
      });
      
    }
   }, []);

  return (
    <form className='flex-1 bg-blue-50/50 dark:bg-gray-900 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white dark:bg-gray-700 w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p className='dark:text-gray-200'>Upload Thumbnail</p>
        <label htmlFor='image'>
          <img src={!image? assets.upload_area: URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required   />
        </label>

        <p className='mt-4 dark:text-gray-200'>Blog Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded dark:bg-gray-800 dark:text-gray-300' onChange={(e) => setTitle(e.target.value)} value={title} />

        <p className='mt-4 dark:text-gray-200'>Blog Sub Title</p>
        <input type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded dark:bg-gray-800 dark:text-gray-300' onChange={(e) => setsubTitle(e.target.value)} value={subTitle} />

        <p className='mt-4 dark:text-gray-200'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative '>
          <div className='w-full h-full  border border-gray-300 dark:text-gray-300 dark:bg-gray-800 rounded ' ref={editorRef}></div>
          {loading && (
            <div className='absolute inset-0 flex justify-center items-center bg-black/10 dark:bg-black/50 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white border-gray-300 dark:border-gray-600 dark:border-t-gray-300 animate-spin'></div>
            </div>

          )}
          <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded  cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4 dark:text-gray-200'>Blog category</p>
        <select onChange={(e) => setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2  border border-gray-300 dark:border-gray-600 outline-none rounded bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200'>
          <option value="">Select Category</option>
          {blogCategories.map((item , index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p className='dark:text-gray-200 '>Publish Now</p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e) => setIsPublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} onClick={onSubmitHandler} type="submit" className='mt-8 w-auto px-4 py-2 h-10 bg-primary text-white rounded-lg cursor-pointer text-sm hover:bg-blue-900 transition-colors'>{isAdding? "Adding..." : "Add Blog"}</button>
      </div>
    </form>
  )
}

export default AddBlog
