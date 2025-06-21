import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {

	const {axios,setToken,navigate} = useAppContext()

	const logout = () => {
		localStorage.removeItem("token");
		axios.defaults.headers.common["Authorization"] = null;
		setToken(null);
		navigate("/");
	};

	return (
		<>
			<div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-300 dark:border-gray-700 dark:bg-gray-900">
				{/* Logo */}
				<img src={assets.logo} alt="Logo" className="w-32 sm:w-40 cursor-pointer dark:invert" onClick={() => navigate("/")}/>

				{/* Logout Button */}
				<button
					className="text-sm px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-md"
					onClick={logout}
				>
					Logout
				</button>
			</div>

			<div className="flex h-[calc(100vh-70px)] bg-gray-50 dark:bg-gray-900">
				{/* Sidebar */}
				<Sidebar />

				{/* Outlet for dynamic content */}
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
