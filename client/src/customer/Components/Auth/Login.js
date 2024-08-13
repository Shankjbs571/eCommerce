import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import { signInWithGooglePopup } from "../../../firebaseConfig.js";
import "./loginpg.css";
import "react-toastify/dist/ReactToastify.css";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux"; 

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', { email, password }, { withCredentials: true });
      if (response.data.status) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('role', response.data.data.role);
        toast.success("Login successful");

        if (response.data.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GoogleSignINUP = () => {
    const logGoogleUser = async () => {
      const response = await signInWithGooglePopup();
      const user = response.user;
      const email = user.email;
      const userName = user.displayName;
      const uniqueUserID = user.uid;
      await handleRegisterWithGoogle(email, userName, uniqueUserID);
    };

    return (
      <div className="flex mt-4 items-center w-full justify-center">
        <div className="px-4 py-2 w-full border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-gray-100 hover:text-slate-900 hover:shadow transition duration-150">
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
          <button onClick={logGoogleUser}>Continue With Google</button>
        </div>
      </div>
    );
  };

  const handleRegisterWithGoogle = async (email, userName, uniqueUserID) => {
    try {
      const payload = {
        email,
        userName,
        password: uniqueUserID,
      };
      const response = await axiosInstance.post('/auth/registerWithGoogle', payload);
      if (response.data.status) {
        toast.success("Google registration successful. User created.");
        toast.success("Logging you in...");
        handleLoginwithGoogle(email, uniqueUserID);
      } else if (response.data.message === "User already exists") {
        handleLoginwithGoogle(email, uniqueUserID);
        toast.success("User already exists. Logging in...");
      }
    } catch (error) {
      console.error("Error registering with Google:", error);
      toast.error("An error occurred while registering with Google. Please try again.");
    }
  };

  const handleLoginwithGoogle = async (email, password) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, { email, password }, { withCredentials: true });
      if (response.data.status) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('role', response.data.data.role);
        toast.success("Login successful");

        if (response.data.data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      <div className="flex h-auto">
        <div className="flex justify-center items-center bg-orange-600">
          <div className="pt-64 pb-96 text-white">
            <div className="flex m-20 flex-col max-w-full rounded-lg bg-slate-400 shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col px-6 pt-16 pb-6 w-full rounded-lg border-gray-400 border-solid border-[3px]">
                <h1 className="flex gap-2 text-6xl font-bold max-md:text-4xl">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/62d78fa3be3f2101c74f9051e30d75727fa4cfa97fa148fe239f5c97685a0dd5?placeholderIfAbsent=true&apiKey=b18cd05798ae4dd7bd4cecc4acd64b6b" alt="" className="object-contain shrink-0 self-start w-px aspect-[0.01]" />
                  <span className="max-md:text-4xl">
                    Welcome to <br /> Apla Bajar
                  </span>
                </h1>
                <p className="mt-5 text-sm tracking-wide leading-7 w-[305px] max-md:ml-2">
                  Let's get you all set up so you can verify your personal account and begin setting up your profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center bg-white">
          <div className="px-20 pt-64 pb-96 text-white bg-white">
            <div className="flex flex-col max-w-full rounded-lg bg-white">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-5">
                  <Link to="/" className="link-style text-xs">
                    Back to Home
                  </Link>
                  <Link to="/signup" className="link-style text-xs">
                    Sign Up
                  </Link>
                </div>
                <h2 className="text-xl text-black font-bold mb-4">Login</h2>

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-zinc-500 dark:text-zinc-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="w-full p-2 border-zinc-300 rounded  border-[1px] text-black dark:bg-input dark:border-zinc-600 transition duration-150 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-zinc-500 dark:text-zinc-500 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full p-2 border-zinc-300 text-black rounded  border-[1px] dark:bg-input dark:border-zinc-600 transition duration-150 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded transition duration-150 transform hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                  <ToastContainer />
                </form>

                <div className="flex justify-between items-center mt-6">
                  <Link to="/forgot-password" className="link-style text-xs">
                    Forgot Password?
                  </Link>
                </div>
                <div className="mt-4">
                  <GoogleSignINUP />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-5 cursor-pointer">
        <Link to="/">
          <img src="/close-icon.png" alt="Close" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
