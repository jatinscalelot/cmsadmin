import React, { useState, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { baseurl } from '../../api/baseurl';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Dropzone from 'react-dropzone';
import authHeader from '../../redux/Services/authHeader';
import { useDispatch } from 'react-redux';
import { createUserProfile } from './UserSlice';

function EditUser() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const dispatch = useDispatch();

    const user = localStorage.getItem("user");

    const [loading, setLoading] = useState(false);
    const [isCheck, setIsCheck] = useState(false)


    // const initialState = {
    // 	first_name: "",
    // 	last_name: "",
    // 	password: "",
    // 	password2: "",
    // 	email: "",
    // 	phone_no: "",
    // 	aadhar: "",
    // 	pan: "",
    // 	cheque: "",
    // 	refer_code: "",
    // 	tc: ""
    // }

    const initialState = {
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        password: "",
        commission: "",
        profile_photo: null,
        aadhar_card_front: null,
        aadhar_card_back: null,
        pan_card: null,
        cheque: null,
    }
    const validationSchema = Yup.object().shape({
        fname: Yup.string().required("Firstname  is require !"),
        lname: Yup.string().required("Lastname  is require !"),
        email: Yup.string().required("Email  is require !"),
        mobile: Yup.string().required("Mobile  is require !"),
        password: Yup.string().required("Password is require !"),
        commission: Yup.string().required("Commission is require !"),
        profile_photo: Yup.mixed().required(""),
        aadhar_card_front: Yup.mixed().required(),
        aadhar_card_back: Yup.mixed().required(),
        pan_card: Yup.mixed().required(),
        cheque: Yup.mixed().required(),
    })

    const onSubmit = async (values) => {
        console.log('values', values)
        const payload = new FormData();
        for (const key in values) {
            payload.append(key, values[key]);
        }
        const response = await dispatch(createUserProfile(payload)).unwrap()
        if (response?.data?.IsSuccess) {
            toast.success(response?.data?.Message)
            navigate("../")
        }
        console.log('response', response)
    }

    // const ValidationSchema = Yup.object().shape({
    // 	first_name: Yup.string().required('First name is required*'),
    // 	last_name: Yup.string().required('Last name is required*'),
    // 	// password: Yup.string().test('len', 'Must be exactly 12 characters', val => val.length === 12).required('Card number is required*'),
    // 	password: Yup.string().required('Password is required*'),
    // 	password2: Yup.string().required('Confirm Password is required*'),
    // 	email: Yup.string().required('Email is required'),
    // 	phone_no: Yup.number().required('Phone no is required')
    // 		.typeError("Phone no must be a digit")
    // 		.integer()
    // 		.positive("Phone no must be a positive"),
    // 	phone_no: Yup.string().required('Phone no is required')
    // 		.matches(/^[0-9]*$/, "Phone number must be a digit")
    // 		.min(10, "Phone number must be 10 digits long")
    // 		.max(10, "Phone number must be 10 digits long"),
    // 	aadhar: Yup.string().required('Aadhar is required'),
    // 	pan: Yup.string().required('Pan is required'),
    // 	cheque: Yup.string().required('Cheque is required'),
    // 	tc: Yup.string().required('Accept terms and condition'),
    // });


    // const clickNextHandler = async (values) => {
    // 	setLoading(true);
    // 	const requestObj = { ...values };
    // 	try {
    // 		const response = await axios.post(`${baseurl}/api/user/create-account`, requestObj, { headers: header });
    // 		if (response.data.IsSuccess) {
    // 			toast.success(response.data.Message);
    // 			// dispatch(increment());
    // 			setTimeout(() => {
    // 				navigate(`../`);
    // 			}, 1000);
    // 		} else {
    // 			toast.error(response.data.Message);
    // 			// toast.error(response.data.Message);
    // 		}
    // 		setLoading(false);
    // 	} catch (error) {
    // 		toast.error("Something Went Wrong!!");
    // 		// navigate(`/auth/login`);
    // 		setLoading(false);
    // 		console.log(error);
    // 	}
    // }

    // const formik = useFormik({
    // 	initialValues: initialState,
    // 	validationSchema: ValidationSchema,
    // 	onSubmit: clickNextHandler,
    // });

    // const setInputValue = useCallback(
    // 	(key, value) =>
    // 		formik.setValues({
    // 			...formik.values,
    // 			[key]: value,
    // 		}),
    // 	[formik]
    // );
    return (
        <div className="wrapper min-h-full">
            <div className="flex items-center cursor-pointer">
                <svg onClick={() => navigate("../")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                </svg>
                <h3 className="text-yankeesBlue leading-8 pl-7">Create account</h3>
            </div>
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ formik, setFieldValue, values }) => {
                    console.log('values', values)

                    return (
                        <>
                            <Form className='pt-7' >
                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">First name</label>
                                        <Field type="text" name="fname" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter first name' required />
                                        <small className="text-red-500 text-base"><ErrorMessage name='fname' />
                                        </small>
                                    </div>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Last name</label>
                                        <Field type="text" name="lname" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter last name' required />
                                        <small className="text-red-500 text-base"><ErrorMessage name='lname' /></small>
                                    </div>
                                </div>
                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Email</label>
                                        <Field type="email" name="email" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter email ' required />
                                        <small className="text-red-500 text-base"><ErrorMessage name='email' /></small>
                                    </div>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Phone number</label>
                                        <Field type="tel" name="mobile" maxLength={10} className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter phone number' required />
                                        <small className="text-red-500 text-base"><ErrorMessage name='mobile' /></small>
                                    </div>
                                </div>
                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Upload  Adhar Front Photo</label>
                                        <label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='aadhrfrontphoto'>
                                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                            </svg>
                                            <span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">

                                                {values.aadhar_card_front ? <p className='text-green-600'>Adhar Upload Successfully</p> : "Upload Adhar Font"}
                                            </span>
                                        </label>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue('aadhar_card_front', acceptedFiles[0]);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} id='aadhrfrontphoto' />
                                                </div>
                                            )}
                                        </Dropzone>
                                        <small className="text-red-500 text-base"><ErrorMessage name='aadhar_card_front' /></small>
                                    </div>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Upload  Adhar Back Photo</label>
                                        <label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='aadhrBackphoto'>
                                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                            </svg>
                                            <span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">
                                                {/* {values.aadhar_card_back ? "Adhar Upload Successfully" : "Upload Adhar Back"} */}
                                                {values.aadhar_card_back ? <p className='text-green-600'>Adhar Upload Successfully</p> : "Upload Adhar Back"}
                                            </span>
                                        </label>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue('aadhar_card_back', acceptedFiles[0]);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} id='aadhrBackphoto' />
                                                </div>
                                            )}
                                        </Dropzone>
                                        <small className="text-red-500 text-base"><ErrorMessage name='aadhar_card_back' /></small>
                                    </div>
                                </div>
                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Upload  Pan Photo</label>
                                        <label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='panCardphoto'>
                                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                            </svg>
                                            <span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">
                                                {values.pan_card ? <p className='text-green-600'>Pancard Upload Successfully</p> : "Upload Pancard"}
                                            </span>
                                        </label>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue('pan_card', acceptedFiles[0]);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} id='panCardphoto' />
                                                </div>
                                            )}
                                        </Dropzone>
                                        <small className="text-red-500 text-base"><ErrorMessage name='pan_card' /></small>
                                    </div>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Upload  Cheque Photo</label>
                                        <label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='chequephoto'>
                                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                            </svg>
                                            <span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">

                                                {values.cheque ? <p className='text-green-600'>Cheque Upload Successfully</p> : "Upload Cheque"}
                                            </span>
                                        </label>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue('cheque', acceptedFiles[0]);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} id='chequephoto' />
                                                </div>
                                            )}
                                        </Dropzone>
                                        <small className="text-red-500 text-base"><ErrorMessage name='cheque' /></small>
                                    </div>
                                </div>
                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Upload profile photo</label>
                                        <label className='input_box2 flex items-center border-dashed justify-start sm:justify-center' htmlFor='profilephoto'>
                                            <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                            </svg>
                                            <span className="text-[#94A3B8] font-normal text-sm sm:text-xl pl-4">

                                                {values.profile_photo ? <p className='text-green-600'>Profile Photo Upload Successfully</p> : "Upload Profile photo"}
                                            </span>
                                        </label>
                                        <Dropzone
                                            onDrop={(acceptedFiles) => {
                                                setFieldValue('profile_photo', acceptedFiles[0]);
                                            }}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <div {...getRootProps()} className="dropzone">
                                                    <input {...getInputProps()} id='profilephoto' />
                                                </div>
                                            )}
                                        </Dropzone>
                                        <small className="text-red-500 text-base"><ErrorMessage name='profile_photo' /></small>
                                    </div>

                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Commission</label>
                                        <Field type="text" name="commission" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter commision' required />
                                        <small className="text-red-500 text-base"><ErrorMessage name='commission' /></small>
                                    </div>
                                </div>
                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    <div className='w-full sm:w-1/2 mb-4'>
                                        <label htmlFor="" className="input-title2">Password</label>
                                        <Field type="password" name="password" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" required placeholder='Enter password' />
                                        <small className="text-red-500 text-base"><ErrorMessage name='password' /></small>
                                    </div>
                                    {/* <div className='w-full sm:w-1/2 mb-4'>
										<label htmlFor="refer_code" className="input-title2">Refer Code (Optional)</label>
										<Field type="text" name="refer_code" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-sm sm:placeholder:text-xl" placeholder='Enter refer code' />
										<small className="text-red-500 text-base"><ErrorMessage name='fname' /></small>
									</div> */}
                                </div>

                                <div className='w-full flex flex-wrap sm:flex-nowrap sm:space-x-6'>
                                    {/* <div className="flex items-start sm:items-center">
										<label className="checkbox w-5 mr-2"><Field type="checkbox" name="tc" className="bg-white"
											defaultChecked={isCheck}
										/><i className="icon-right"></i></label>
										<span className="text-sm leading-5 text-[#64748B] font-bold">I have read and accept <Link className='font-bold text-yankeesBlue'>Terms and condition</Link></span>
										<small className="text-red-500 text-base m<ErrorMessage name='fname' />l-5"></small>
									</div> */}
                                </div>
                                <div className="w-full flex space-x-6 mt-7">
                                    {loading ?
                                        <button type="button" class="flex items-center justify-center btn-secondary w-full mt-5 sm:mt-0" disabled="">
                                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </button>
                                        :
                                        <button type="submit" className="btn-secondary w-full mt-5 sm:mt-0">Create account</button>
                                    }
                                </div>
                            </Form>
                        </>
                    )
                }}
            </Formik>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default EditUser