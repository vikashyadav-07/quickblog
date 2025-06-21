import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt, isPublished } = blog;
    const BlogDate = new Date(createdAt);

    const { axios } = useAppContext();

    const deleteBlog = async () => { 
        const confirm = window.confirm('Are you sure you want to delete this blog?');
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/blog/delete',{id: blog._id});
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }    
    }

    const togglePublish = async () => { 
        try {
            const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
            if (data.success) {
                toast.success(data.message);
                await fetchBlogs();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <tr className="border-y border-gray-300 dark:border-gray-700">
        <th className="px-4 py-4">{index}</th>
        <td className="px-4 py-4">{title}</td>
        <td className="px-4 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
        <td className="px-4 py-4 max-sm:hidden">
            <span
            className={`font-semibold ${
                isPublished ? 'text-green-600 dark:text-green-400' : 'text-orange-700 dark:text-orange-500'
            }`}
            >
            {isPublished ? 'Published' : 'Unpublished'}
            </span>
        </td>
        <td className="px-4 py-4 text-xs flex gap-3">
            <button onClick={togglePublish} className={`border px-4 py-1 mt-1 cursor-pointer rounded transition-all ${
                blog.isPublished
                ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300'
                : 'bg-orange-100 dark:bg-orange-700 hover:bg-orange-200 dark:hover:bg-orange-600 text-orange-800 dark:text-orange-100'
            }`}
            >
            {blog.isPublished ? 'Unpublish' : 'Publish'}
            </button>
            <img
            src={assets.cross_icon}
            onClick={deleteBlog}
            alt="Delete Blog Icon"
            className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer dark:brightness-100 dark:invert "
            />
        </td>
        </tr>
    );
};

export default BlogTableItem;
