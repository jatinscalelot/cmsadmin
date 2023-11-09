import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import bgImage from "../../assets/images/login-images.png"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/top-circle.png"
import bottomCircle from "../../assets/images/bottom-circle.png";
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function ForgotPassword() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ email: "" });
    const [error, setError] = useState(false);

    const setFormField = (field, value) => {
        setUserData({ ...userData, [field]: value })
    }


    const handelReset = async (data) => {
        data.preventDefault();
        try {
            const response = await axios.post(`${baseurl}/api/user/reset-password-email`, { email: userData.email });

            if (response.data.IsSuccess) {
                toast.success(response.data.Message);
                setTimeout(() => {
                    localStorage.setItem("email", userData.email)
                    navigate("../verifyreset")
                }, 1000);
            } else {
                toast.error(response.data.Message);
            }
        } catch (error) {
            toast.error('Something went wrong!!!');
            setError(true);
        }
    }
    return (
        <div className="flex h-screen">
            <div className="flex w-full flex-wrap bg-white">
                <div className="w-full relative lg:w-1/2 flex p-7 md:p-[60px]">
                    <div className="">
                        <div className="absolute top-0 sm:right-20 md:right-32 sm:block hidden">
                            <img src={topCircle} alt="Top Circle Shape" />
                        </div>
                        <div className="absolute bottom-0 sm:left-20 md:left-32 sm:block hidden">
                            <img src={bottomCircle} alt="Bottom Circle Shape" />
                        </div>
                    </div>
                    <Link to='' className='absolute'><img src={logo} alt="Alt Text" /></Link>
                    <div className="max-w-md w-full m-auto">
                        <h1>Forgot Password</h1>
                        <p className="text-base sm:text-lg text-[#64748B] font-normal pt-3.5 xl:pr-8 md:whitespace-nowrap">Enter your email or phone number for reset password </p>
                        <div className="w-full pt-7 sm:pt-9">
                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="" className="input-titel">Email or Phone</label>
                                    <input type="text" name="email" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter your email or phone' value={userData.email} onChange={(e) => { setFormField('email', e.target.value); setError(false) }} required />
                                </div>
                                <button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold" onClick={handelReset}>Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full lg:w-1/2 hidden lg:block">
                    <img src={bgImage} alt="login-bg" className="w-full h-full object-cover object-bottom" />
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword