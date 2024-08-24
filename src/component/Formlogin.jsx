import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { MdOutlineRefresh } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { login } from '../Utils/ApiUsers';
import Cookies from "js-cookie";


const Formlogin = () => {
    const [captcha, setCaptcha] = useState("");
    const [textCaptcha, setTextCaptcha] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const navigation = useNavigate();

    const refreshString = () => {
        setCaptcha(Math.random().toString(36).slice(2, 8));
    };

    useEffect(() => {
        refreshString();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (textCaptcha === captcha) {
            setLoading(true);
            setValid(true);

            try {
                const response = await login.loginPost({ email, password });
                setEmail("");
                setPassword("");
                const token = response.token;
                Cookies.set("refreshToken", token);

                if (!Cookies.get("refreshToken")) {
                    Cookies.set("refreshToken", response.token, { secure: false, sameSite: 'Strict' });
                }


                setTimeout(() => {
                    setLoading(false);
                    navigation('/dashboard');
                }, 2000);

                
            } catch (error) {
                setLoading(false);
                toast.error(error.message || "Login failed", {
                    position: "top-right",
                });
            }
        } else {
            setValid(false);
            toast.error("Captcha not valid", {
                position: "top-right",
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <form className="space-y-6 mt-5" onSubmit={handleSubmit}>
                <div className="relative">
                    <FaEnvelope className="absolute text-gray-400 top-[17px] left-3" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-10 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                <div className="relative">
                    <FaLock className="absolute text-gray-400 top-[17px] left-3" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-10 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="flex flex-col text-sm">
                    <div className="flex space-x-5 justify-start items-center mb-5 px-3">
                        <div
                            className={`text-3xl font-semibold text-gray-900 italic ${valid ? "tracking-wider" : "tracking-wider"
                                }`}
                            style={{
                                letterSpacing: '3px', // Jarak antar huruf
                                fontFamily: 'monospace', // Font yang sulit dibaca
                                transform: 'rotate(-2deg)' // Sedikit putaran
                            }}
                        >
                            {captcha.split('').map((char, index) => (
                                <span
                                    key={index}
                                    style={{
                                        transform: `rotate(${index % 2 === 0 ? -15 : 15}deg)`, // Rotasi per karakter
                                        display: 'inline-block',
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="rounded-md p-2 shadow-md shadow-slate-400"
                            onClick={refreshString}
                        >
                            <MdOutlineRefresh />
                        </button>
                    </div>
                    <input
                        type="text"
                        className={`border px-3 py-2 rounded-md ${valid ? "border-green-500" : "border-red-500"
                            }`}
                        placeholder="Enter Captcha"
                        value={textCaptcha}
                        onChange={(e) => setTextCaptcha(e.target.value)}
                    />
                </div>


                <button
                    type="submit"
                    className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Login
                </button>
            </form>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="flex items-center justify-center mb-3 z-20">
                        <ScaleLoader size={250} color={"#ffff"} loading={true} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Formlogin;
