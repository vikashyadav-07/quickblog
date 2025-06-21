import React, { useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem.jsx';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const { axios } = useAppContext();
  
  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');
      data.success? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message); 
    }
  }


  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between max-w-3xl dark:text-gray-100">
        <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-all ${
              filter === 'Approved'
                ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-600 border-gray-400 dark:text-gray-300 dark:border-gray-600 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-all ${
              filter === 'Not Approved'
                ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-600 border-gray-400 dark:text-gray-300 dark:border-gray-600 hover:text-blue-500 hover:border-blue-500'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative mt-6 max-w-3xl overflow-x-auto shadow rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-gray-600 dark:text-gray-300">
          <thead className="text-xs uppercase text-gray-600 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">Blog Title & Comment</th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if (filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment,index)=><CommentTableItem key={comment._id} comment={comment} index = {index+1} fetchComments={fetchComments}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
