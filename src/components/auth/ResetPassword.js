import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/login-images.png"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/top-circle.png"
import bottomCircle from "../../assets/images/bottom-circle.png";
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { changePassword } from './AuthSlice';
import { toast } from 'sonner';


function ResetPassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const initialValues = {
		old_password: "",
		new_password: ""
	}

	const validationSchema = Yup.object().shape({
		old_password: Yup.string().required("Old Password Require !"),
		new_password: Yup.string().required("New Password Require !")
	})

	const onSubmit = async (values) => {
		

		const payload = Object.assign({}, values)
		try {
			const response = await dispatch(changePassword(payload))
			if (response?.payload?.data?.IsSuccess) {
				toast.success(response?.payload?.data?.Message)
				navigate("/")
			}
		} catch (error) {
			console.log('error', error)

		}

	}

	// const handelSubmitNewPassword = async (data) => {
	// 	data.preventDefault();
	// 	try {
	// 		const response = await axios.post(`${baseurl}/api/user/reset-password`, { email: email, password: userData.password, password2: userData.password2 });
	// 		if (response.data.IsSuccess) {
	// 			toast.success(response.data.Message);
	// 			setTimeout(() => {
	// 				localStorage.clear();
	// 				navigate("../")
	// 			}, 1000);
	// 		} else {
	// 			toast.error(response.data.Message);
	// 		}
	// 	} catch (error) {
	// 		toast.error('Something went wrong!!!');
	// 		setError(true);
	// 	}
	// }
	return (
		<div className="flex h-screen">
			<div className="flex w-full flex-wrap bg-white">
				<div className="w-full relative lg:w-1/2 flex p-5 sm:p-7 md:p-[60px]">
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
						<h1>Reset Password</h1>
						<p className="text-base sm:text-lg text-[#64748B] font-normal pt-3.5 xl:pr-8 whitespace-nowrap">Enter your New Password</p>
						<div className="w-full pt-7 sm:pt-9">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{
									({ formik }) => {
										return (
											<>
												<Form className="space-y-5">
													<div>
														<label htmlFor="" className="input-titel">Enter Old Password</label>
														<Field type="Password" name="old_password" placeholder='Enter old password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base" required />
														<div className='text-base text-red-500'> <ErrorMessage name="old_password" /></div>
													</div>
													<div>
														<label htmlFor="" className="input-titel">Enter New Password</label>
														<Field type="Password" name="new_password" placeholder='Enter new password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base" />
														<div className='text-base text-red-500'><ErrorMessage name="new_password" /></div>
													</div>
													<button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold">Submit a new password</button>
												</Form>
											</>
										)
									}
								}
							</Formik>
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

export default ResetPassword