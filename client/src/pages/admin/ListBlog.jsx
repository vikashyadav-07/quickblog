import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';

const ListBlog = () => {

  const [blogs, setBlogs] = useState([])
  const axios = useAppContext()

  
  const fetchBlogs = async () => { 
    try {
      const { data } = await axios.axios.get('/api/admin/blogs');
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        console.error(data.message);
      }
    } catch (error) {
        console.error(error.message); 
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-gray-900 min-h-screen'>
      <h1 className='text-xl font-bold text-gray-700 dark:text-gray-200'>All Blogs</h1>

      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white dark:bg-gray-800'>
          <table className='w-full text-sm  text-gray-600 dark:text-gray-300'>
            <thead className='text-xs text-gray-600 dark:text-gray-300  uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Blog Title</th>
                <th scope='col' className='px-2 py-4'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />;
              })}
            </tbody>
          </table>
        </div>
      
    </div>
  )
}

export default ListBlog
