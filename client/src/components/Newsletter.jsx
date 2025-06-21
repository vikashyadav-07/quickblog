import React from "react";

const Newsletter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-4 my-32 px-6">
            <h1 className="md:text-4xl text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Never Miss a Blog!
            </h1>
            <p className="md:text-lg text-gray-600/70 dark:text-gray-400">
                Subscribe to get the latest blogs, new tech, and exclusive news.
            </p>
            <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 mt-6">
                <input
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 placeholder-gray-500 dark:placeholder-gray-500"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
                <button
                    type="submit"
                    className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary/90 transition-all cursor-pointer rounded-md rounded-l-none"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
