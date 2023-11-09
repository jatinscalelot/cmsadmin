import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bgImage from "../../assets/images/login-images.png"
import logo from "../../assets/images/logo.png"
import topCircle from "../../assets/images/top-circle.png"
import bottomCircle from "../../assets/images/bottom-circle.png";
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { baseurl } from '../../api/baseurl';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";



const Register = () => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const initialState = {
		first_name: "",
		last_name: "",
		email: "",
		phone_no: "",
		password: "",
		password2: "",
	}

	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

	const ValidationSchema = Yup.object().shape({
		first_name: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Fisrt name is required*'),
		last_name: Yup.string().min(2, 'Too Short!').max(40, 'Too Long!').required('Last name is required*'),
		email: Yup.string().email('Invalid email format').required('Email address is required*'),
		phone_no: Yup.string()
			.required("Phone no is required*")
			.matches(phoneRegExp, `Phone number is not valid`)
			.min(10, "Phone no is 10 digit required")
			.max(10, "Phone no is 10 digit required"),
		password: Yup.string().min(6, 'Too Short!').required('Password is required*'),
		password2: Yup.string().min(6, 'Too Short!').required('Confirm password is required*'),
	});

	const handelRegister = async (values) => {
		console.log('values', values)
		// if (values.password === values.password2) {
		// return
		setLoading(true);
		try {
			const response = await axios.post(`${baseurl}/api/user/register-admin`, values);
			if (response.data?.IsSuccess) {
				toast.success("Registered successfully.")
				setTimeout(() => {
					navigate(`/verificationcode`);
					localStorage.setItem("email", response.data.Data.email)
				}, 1000);
				setLoading(false);
			} else {
				toast.error(response.data.Message);
				setLoading(false);
			}
		} catch (error) {
			toast.error("something Went to Wrong!!");
			setLoading(false);
		}
		// } else {
		// 	toast.warn("Confirm password and password not match.");
		// 	setTimeout(() => {
		// 		return;
		// 	}, 1500);
		// }
	}
	return (
		<div className="flex m-auto">
			<div className="flex w-full flex-wrap bg-white overflow-hidden md:h-screen">
				<div className="w-full lg:w-1/2 flex flex-col h-screen relative overflow-y-auto">
					<div className="top-0 sm:right-20 md:right-32 ml-auto pr-12 xl:pr-24 md:block hidden">
						<img src={topCircle} alt="Top Circle Shape" />
					</div>
					<div className='w-full p-5 md:p-[60px]'>
						<Link to='' className='hidden xl:absolute md:inline-block'><img src={logo} alt="Alt Text" /></Link>
						<div className="max-w-md w-full m-auto py-5">
							<Link to='' className='inline-block md:hidden'><img src={logo} alt="Alt Text" /></Link>
							<h1 className="whitespace-nowrap mt-5 sm:mt-7 md:mt-0">Create new account</h1>
							<p className="text-base sm:text-lg text-[#64748B] font-normal pt-3.5 xl:pr-8">Please enter your details to create account</p>
							<div className="w-full pt-7 sm:pt-9">

								<Formik
									initialValues={initialState}
									validationSchema={ValidationSchema}
									onSubmit={handelRegister}>
									{({ errors, touched, formik }) => (
										<Form className="space-y-4">
											<div>
												<label htmlFor="first_name" className="input-titel">First Name</label>
												<Field type="text" name="first_name" value={formik?.values.first_name} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter first name' />
												<ErrorMessage name='first_name' component="span" className="text-red-500 text-xs" />
											</div>
											<div>
												<label htmlFor="last_name" className="input-titel">Last Name</label>
												<Field type="text" name="last_name" value={formik?.values.last_name} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter last name' />
												<ErrorMessage name='last_name' component="span" className="text-red-500 text-xs" />
											</div>
											<div className='relative'>
												<label htmlFor="email" className="input-titel relative">Email</label>
												<Field type="email" name="email" value={formik?.values.email} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter email' />
												<ErrorMessage name='email' component="span" className="text-red-500 text-xs" />
											</div>
											<div>
												<label htmlFor="phone_no" className="input-titel"> Phone number</label>
												<Field type="text" name="phone_no" value={formik?.values.phone_no} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Enter phone number' />
												<ErrorMessage name='phone_no' component="span" className="text-red-500 text-xs" />
											</div>
											<div>
												<label htmlFor="password" className="input-titel">Password</label>
												<Field type="password" name="password" value={formik?.values.password} placeholder='Enter your password' className="input_box placeholder:text-[#94A3B8] placeholder:text-base" />
												<ErrorMessage name='password' component="span" className="text-red-500 text-xs" />
											</div>
											<div>
												<label htmlFor="password2" className="input-titel">Confirm Password</label>

												<Field type={isVisible ? "text" : "password"} placeholder='Enter your password again' name="password2" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" value={formik?.values.password2} />
												<span className={isVisible ?
													"icon-eye text-xl opacity-50 absolute right-3 top-10 cursor-pointer" :
													"icon-pass-hide text-xl opacity-50 absolute right-3 top-10 cursor-pointer"}
													onClick={() => setIsVisible(!isVisible)}></span>
												<ErrorMessage name='password2' component="span" className="text-red-500 text-xs" />
											</div>
											{loading ?
												<button type="button" className="flex items-center justify-center btn-primary w-full py-[15px] capitalize text-base leading-7 font-extrabold group cursor-not-allowed" disabled="">
													<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
														<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
														<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
													</svg>
													Processing...
												</button>
												:
												<button type='submit' className="btn-primary w-full py-[15px] uppercase text-base leading-7 font-extrabold">Register Now</button>
											}
											<span className="block text-sm text-[#94A3B8] font-bold text-center">Already have an account?<Link to="../" className='text-yankeesBlue font-bold ml-1'>Sign in</Link></span>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
					<div className="bottom-0 sm:left-20 md:left-32 mr-auto pl-12 xl:pl-24 md:block hidden">
						<img src={bottomCircle} alt="Bottom Circle Shape" />
					</div>
				</div>
				<div className="w-full h-full lg:w-1/2 hidden lg:block">
					<img src={bgImage} alt="login-bg" className="w-full h-full object-cover object-bottom" />
				</div>
			</div>
			
		</div>
	)
}

export default Register