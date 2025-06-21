import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const { axios, setToken } = useAppContext(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", { email, password });
      
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `${data.token}`;
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
			<div className="w-full max-w-sm p-6 max-md:m-6 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg bg-white dark:bg-gray-800">
				<div className="flex flex-col items-center justify-center">
					<div className="w-full py-6 text-center">
						<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
							<span className="text-primary">Admin</span> Login
						</h1>
						<p className="font-light text-gray-600 dark:text-gray-400 mt-2">
							Enter your credentials to access the admin panel
						</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 w-full sm:max-w-md text-gray-700 dark:text-gray-300">
            <div className="flex flex-col space-y-4">
              {/* Email Field */}
              <div>
                <label className=" font-medium mb-1">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600 outline-none "
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className=" font-medium mb-1">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600 outline-none "
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Login
            </button>
          </form>

				</div>
			</div>
		</div>
	);
};

export default Login;
