import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
	const { title, summary, category, image, _id } = blog;
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/blog/${_id}`)}
			className="w-full rounded-lg overflow-hidden shadow-md hover:scale-102 hover:shadow-primary/25 dark:hover:shadow-gray-600/25 duration-300 cursor-pointer  dark:bg-gray-800"
		>
			<img src={image} alt={title} className="aspect-video" />
			<span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 dark:bg-gray-600 rounded-full text-primary dark:text-gray-300 text-xs">
				{category}
			</span>
			<div className="p-5">
				<h5 className="mb-2 font-medium text-gray-900 dark:text-gray-100">{title}</h5>
				<p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
					{summary && summary.length > 100 ? `${summary.substring(0, 100)}...` : summary || "No summary available."}
				</p>
				<button className="text-primary mt-4 font-medium">Read More</button>
			</div>
		</div>
	);
};

export default BlogCard;
