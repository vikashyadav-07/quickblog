import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async()=>{
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id }); 
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteComment = async()=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;

      const { data } = await axios.post('/api/admin/delete-comment', { id: _id }); 
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <tr className=" border-y border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-700 dark:text-gray-300">Blog</b>: {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-700 dark:text-gray-300">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-700 dark:text-gray-300">Comment</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden text-gray-600 dark:text-gray-400">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              title="Approve Comment"
              className="w-5 hover:scale-110 transition-all cursor-pointer dark:brightness-200"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            title="Delete Comment"
            className="w-5 hover:scale-110 transition-all cursor-pointer dark:invert"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
