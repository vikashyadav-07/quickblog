import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  
  const {axios} = useAppContext()

	const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  

	const fetchBlogData = async () => {
		try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog): toast.error(data.message);
    } catch (error) {
      toast.error(error.message)
    }
	};
	const fetchComments = async () => {
    try {
        const { data } = await axios.post('/api/blog/comments',{blogId: id});
        if (data.success) {
            setComments(data.comments);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

  
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success) {
        toast.success(data.message);
        setName('');
        setContent('');
      } else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
      
    }
  };

	useEffect(() => {
		fetchBlogData();
		fetchComments();
	}, []);

	return data ? (
		<div className="relative dark:bg-gray-900 dark:text-white">
			<img
				src={assets.gradientBackground}
				alt=""
				className="absolute -top-50 -z-1 opacity-50"
			/>

			<Navbar />

			<div className="text-center mt-20 text-gray-600 dark:text-gray-300">
				<p className="text-primary dark:text-blue-400 py-4 font-medium">
					Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
				</p>
				<h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 dark:text-gray-300">
					{data.title}
				</h1>
				<h1 className="my-5 max-w-lg truncate mx-auto dark:text-gray-300">
					{data.subTitle}
				</h1>
				<p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary dark:text-blue-400">
					Sakshi Chak
				</p>
			</div>

			<div className="mx-4 max-w-5xl md:mx-auto my-12 space-y-12">
				<img
					src={data.image}
					alt="Blog Image"
					className="rounded-3xl mb-6 shadow-lg"
				/>

				<div
					className="rich-text max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        
				<div className="mt-12 max-w-3xl mx-auto rich-text">
					<h2 className=" text-gray-800 dark:text-gray-200">
						Summary
					</h2>
					<p className=" text-gray-600 dark:text-gray-300 leading-relaxed">
						{data.summary}
          </p>
        </div>

				{/* Comments Section */}
				<div className="mt-16 mb-12 max-w-3xl mx-auto">
					<p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
						Comments ({comments.length})
					</p>

					<div className="flex flex-col gap-6 mt-6">
						{comments.map((item, index) => (
              <div key={index}
                className="relative bg-primary/2 dark:bg-gray-800 border border-primary/5 dark:border-gray-600 p-4 rounded-lg shadow-sm"
              >
								<div className="flex items-center gap-2 mb-2">
									<img src={assets.user_icon} alt="User" className="w-8 h-8 rounded-full shadow-sm"/>
									<p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400 ml-11">{item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {Moment(item.createdAt).fromNow()}
                </div>
							</div>
						))}
					</div>
        </div>
        
        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto mt-12 p-4 bg-white dark:bg-gray-900  rounded-lg">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Add Your Comment
          </p>
          <form
            onSubmit={addComment}
            className="flex flex-col  gap-4"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 outline-none"
            />

            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Write your comment..."
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 outline-none h-36 resize-none"
              required
            ></textarea>

            <div className="self-start">
              <button
                type="submit"
                className="bg-primary text-white font-semibold rounded-md py-2 px-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 transform cursor-pointer"
              >
                Submit
              </button>
            </div>
              
          </form>
        </div>

        
         {/* Share Buttons */}
        <div className="max-w-3xl mx-auto my-12  p-4 bg-white dark:bg-gray-900  rounded-lg">
  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
    Enjoyed this article? Share it with your friends!
  </p>
  
  <div className="flex gap-4 mt-4">
    <img
      src={assets.facebook_icon}
      width={40}
      height={40}
      alt="Facebook"
      className="cursor-pointer hover:scale-110 transition-transform"
    />
    <img
      src={assets.twitter_icon}
      width={40}
      height={40}
      alt="Twitter"
      className="cursor-pointer hover:scale-110 transition-transform"
    />
    <img
      src={assets.googleplus_icon}
      width={40}
      height={40}
      alt="Google Plus"
      className="cursor-pointer hover:scale-110 transition-transform"
    />
  </div>
</div>

      </div>
      <Footer/>
		</div>
	) : (
		<div><Loader /></div>
	);
};

export default Blog;
