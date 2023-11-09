import React, { useState, useEffect, useCallback } from 'react'
// import CalendarIcon from '../../assets/images/calendar-icon.png'
import { useNavigate, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { baseurl } from '../../api/baseurl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

function AdminAddCard() {

	const navigate = useNavigate();
	// const dispatch = useDispatch();
	const [cardPhotoUrl, setCardPhotoUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const user = localStorage.getItem("user");
	const header = {
		'Authorization': `Bearer ${JSON.parse(user)?.token}`,
		'Content-Type': 'multipart/form-data'
	}

	const initialState = {
		// card_type: "Credit Card",
		card_category: "business",
		card_bank_name: "",
		card_number: "",
		card_holder_name: "",
		card_network: "",
		// card_photo: "",
		frontside_card_photo: "",
		backside_card_photo: "",
		card_exp_date: "",
		card_cvv: "",
		available_balance: "",
		credit_amount: ""
	}
	const ValidationSchema = Yup.object().shape({
		// card_type: Yup.string().required('Card type is required*'),
		card_category: Yup.string(),
		card_bank_name: Yup.string().required('Bank name is required*'),
		card_number: Yup.string().test('len', 'Must be exactly 12 characters', val => val.length === 16).required('Card number is required*'),
		card_holder_name: Yup.string().required('Card holder name is required*'),
		card_network: Yup.string().required('Card Network is required*'),
		frontside_card_photo: Yup.string().required('Frontside Card photo is required*'),
		backside_card_photo: Yup.string().required('Backside Card photo is required*'),
		card_exp_date: Yup.date().required('Expiry date is required*'),
		card_cvv: Yup.string().test('len', 'Must be exactly 3 characters', val => val.length === 3).required('Cvv is required*'),
		available_balance: Yup.number().positive('Available balance should be greater than 0*'),
		credit_amount: Yup.number().positive('Credit amount should be greater than 0*'),
	});

	const clickNextHandler = async (values) => {
		setLoading(true);
		const requestObj = { ...values };
		try {
			const response = await axios.post(`${baseurl}/api/cards/add-admin-card`, requestObj, { headers: header });

			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				// toast.success(response.data.Message);
				// dispatch(increment());
				setTimeout(() => {
					navigate(`../adminwallet`);
				}, 1000);
			} else {
				toast.error(response.data.Message);
			}
			setLoading(false);
		} catch (error) {
			toast.error("Something Went Wrong.");
			// navigate(`/auth/login`);
			console.log(error);
			setLoading(false);
		}
	}

	// const cardExpDate = (e) => {
	// 	const expDate = e.target.value.split("-");
	// 	console.log(new Date(expDate[0], expDate[1], expDate[2]));
	// 	formik.values?.card_exp_date = expDate;
	// }

	// const dueDate = (e) => {
	// 	const date = e.target.value.split("-");
	// 	console.log(new Date(date[0], date[1], date[2]));
	// 	formik.values?.due_date = date;

	// }

	let minDateValue = new Date(new Date().setDate(new Date().getDate() + 1));

	const formik = useFormik({
		initialValues: initialState,
		validationSchema: ValidationSchema,
		onSubmit: clickNextHandler,
	});

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);

	const checkCardType = (cardType) => {
		if (cardType === "Debit Card") {
			formik.values.card_category = "";
			formik.values.credit_amount = "";
		}
	}

	return (
		<div className="wrapper min-h-full">
			<div className="flex items-center cursor-pointer">
				<svg onClick={() => navigate(`../adminwallet`)} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
				</svg>
				<h3 className="text-yankeesBlue leading-8 pl-7">Add Card</h3>
			</div>
			<div className="pt-10">
				<form onSubmit={formik.handleSubmit}>
					<div className="w-full">
						<div className="w-full flex flex-wrap sm:flex-nowrap items-center sm:mb-7 sm:space-x-6">
							{/* <div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_type" className="input-title2">Card Type*</label> */}
							{/* <select 
									onChange={(e) =>
										setInputValue("card_type", e.target.value)

									}
								>
									<option value="Credit Card">Credit Card</option>
									<option value="Debit Card">Debit Card</option>
								</select> */}
							{/* <select type="text" name="card_type" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Select Card Type' onChange={(e) => setInputValue("card_type", e.target.value)}>
									<option value="Credit Card">Credit Card</option>
									<option value="Debit Card">Debit Card</option>
								</select> */}

							{/* <input type="text" name="card_type" className="input_box2 placeholder:text-[#94A3B8]text-sm sm: placeholder:text-xl" placeholder='Select card' onChange={(e) => setInputValue("card_type", e.target.value)} /> */}
							{/* <small className="text-red-500 text-xs">{formik.errors.card_type}</small>
							</div> */}
							{/* <div className={'w-full sm:w-1/2 mb-4 sm:mb-0' + (formik.values.card_type === "Debit Card" ? "opacity-30" : "")}> */}
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_number" className="input-title2">Card Number*</label>
								<input maxLength={16} type="text" name="card_number" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter card number' onChange={(e) => setInputValue("card_number", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.card_number}</small>
							</div>
							<div className={'w-full sm:w-1/2 mb-4 sm:mb-0'}>
								{/* {formik.values.card_type === "Debit Card" ? formik.values.card_category = "" : ""} */}
								<label htmlFor="card_category" className="input-title2" >Card category</label>
								<div className="cardType flex items-center space-x-10 sm:px-4 py-3">
									<label className='flex items-center relative' htmlFor='business'>
										<input type="radio" name="card_category" id='business' value='business' className="absolute inset-0 z-10 cursor-pointer opacity-0 transactiongroup" defaultChecked onChange={(e) => setInputValue("card_category", e.target.value)}
										// disabled={formik.values.card_type === "Debit Card" ? true : false} 
										/>
										<div>
											<span className="inline-block w-3 sm:w-5 h-3 sm:h-5 rounded-full border-[1px] sm:border-2 border-black/20 mr-3 sm:mr-4 radio"></span>
										</div>
										<span className="text-[#475569] text-xs sm:text-xl font-semibold sm:pl-3">Business</span>
									</label>
									<label className='flex items-center relative' htmlFor='personal'>
										<input type="radio" name="card_category" id='personal' value='personal' className="absolute inset-0 z-10 cursor-pointer opacity-0 transactiongroup" onChange={(e) => setInputValue("card_category", e.target.value)}
										//  disabled={formik.values.card_type === "Debit Card" ? true : false}
										/>
										<div>
											<span className="inline-block w-3 sm:w-5 h-3 sm:h-5 rounded-full border-[1px] sm:border-2 border-black/20 mr-3 sm:mr-4 radio"></span>
										</div>
										<span className="text-[#475569] text-xs sm:text-xl font-semibold sm:pl-3">Personal</span>
									</label>
								</div>
								<small className="text-red-500 text-xs">{formik.errors.card_category}</small>
							</div>
						</div>
						<div className="w-full flex flex-wrap sm:flex-nowrap sm:mb-7 sm:space-x-6">
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_holder_name" className="input-title2">Card holder name*</label>
								<input type="text" name="card_holder_name" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter card holder name' onChange={(e) => setInputValue("card_holder_name", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.card_holder_name}</small>
							</div>
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_network" className="input-title2">Card network*</label>
								<input type="text" name="card_network" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Visa' onChange={(e) => setInputValue("card_network", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.card_network}</small>
							</div>
						</div>
						<div className="w-full flex flex-wrap sm:flex-nowrap sm:mb-7 sm:space-x-6">
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_bank_name" className="input-title2">Card bank name*</label>
								<input type="text" name="card_bank_name" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter bank name' onChange={(e) => setInputValue("card_bank_name", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.card_bank_name}</small>
							</div>
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_exp_date" className="input-title2 relative">Card Expiry Date *</label>
								<Calendar name="card_exp_date" className='due w-full overflow-hidden box-shadow' minDate={minDateValue} placeholder={new Date().toISOString().slice(0, 10)} onChange={(e) => setInputValue("card_exp_date", moment(e.target.value).toISOString().slice(0, 10))} readOnlyInput />
								<small className="text-red-500 text-xs">{formik.errors.card_exp_date}</small>
							</div>
						</div>
						<div className="w-full flex flex-wrap sm:flex-nowrap sm:mb-7 sm:space-x-6">
							{/* <div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_photo" className="input-title2">Card photo upload*</label>
								<label className='input_box2 flex justify-start items-center border-dashed sm:justify-center' htmlFor='card-photo'>
									<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
									</svg>
									<span className="text-[#94A3B8] font-normal text-xl pl-4">
										{formik.values.card_photo && formik.values.card_photo !== "" ?
											formik.values.card_photo.name
											:
											"Card photo upload"
										}
									</span>
								</label>
								<input type="file" name="card_photo" id='card-photo' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='Card photo upload' required accept='image/*' onChange={(e) => { setInputValue("card_photo", e.currentTarget.files[0]); }} />
								<small className="text-red-500 text-xs">{formik.errors.card_photo}</small>
							</div> */}
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="frontside_card_photo" className="input-title2">Card Front photo*</label>
								<label className='input_box2 flex items-center border-dashed justify-start py-2 cursor-pointer' htmlFor='card-photo'>
									<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
									</svg>
									<span className="text-[#94A3B8] font-normal text-sm md:text-xl pl-4">
										{formik.values.frontside_card_photo && formik.values.frontside_card_photo !== "" ?
											formik.values.frontside_card_photo.name
											:
											"Upload"
										}
									</span>
								</label>
								<input type="file" name="frontside_card_photo" id='card-photo' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='upload' accept='image/*' onChange={(e) => setInputValue("frontside_card_photo", e.currentTarget.files[0])} />
								<small className="text-red-500 text-xs">{formik.errors.frontside_card_photo}</small>
							</div>
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="backside_card_photo" className="input-title2">Card back photo*</label>
								<label className='input_box2 flex items-center border-dashed justify-start py-2 cursor-pointer' htmlFor='card-photo-1'>
									<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
										<path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
									</svg>
									<span className="text-[#94A3B8] font-normal text-sm md:text-xl pl-4">
										{formik.values.backside_card_photo && formik.values.backside_card_photo !== "" ?
											formik.values.backside_card_photo.name
											:
											"Upload"
										}
									</span>
								</label>
								<input type="file" name="backside_card_photo" id='card-photo-1' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='Card photo upload' accept='image/*' onChange={(e) => setInputValue("backside_card_photo", e.currentTarget.files[0])} />
								<small className="text-red-500 text-xs">{formik.errors.backside_card_photo}</small>
							</div>

							{/* <div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<small className="text-red-500 text-xs">{formik.errors.card_exp_date}</small>
								<label htmlFor="card_exp_date" className="input-title2 relative">Card Expiry Date *</label>
								<input type="date" name="card_exp_date" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter card expiry date' onChange={(e) => setInputValue("card_exp_date", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.card_exp_date}</small>
								{/* <img src={CalendarIcon} alt="Calendar icon" className='absolute top-1/2 translate-y-1/2 right-10' /> 
							</div> */}
						</div>
						<div className="w-full flex flex-wrap sm:flex-nowrap sm:mb-7 sm:space-x-6">
							<div className='w-full sm:w-1/2 mb-4 sm:mb-0'>
								<label htmlFor="card_cvv" className="input-title2">Card CVV *</label>
								<input maxLength={3} type="text" name="card_cvv" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter cvv' onChange={(e) => setInputValue("card_cvv", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.card_cvv}</small>
							</div>
							{/* {formik.values.card_type === "Debit Card" ?
								<>
									{formik.values.credit_amount = ""}
									<div className='w-full sm:w-1/2'>
										<label htmlFor="available_balance" className="input-title2">Available balance *</label>
										<input type="number" name="available_balance" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter available balance' onChange={(e) => setInputValue("available_balance", e.target.value)} />
										<small className="text-red-500 text-xs">{formik.errors.available_balance}</small>
									</div>
								</>
								: */}
							<div className='w-full sm:w-1/2'>
								<label htmlFor="credit_amount" className="input-title2">Credit Amount *</label>
								<input type="number" name="credit_amount" className="input_box2 placeholder:text-[#94A3B8] text-sm sm:placeholder:text-xl" placeholder='Enter credit amount' onChange={(e) => setInputValue("credit_amount", e.target.value)} />
								<small className="text-red-500 text-xs">{formik.errors.credit_amount}</small>
							</div>
							{/* } */}
						</div>
						<div className="w-full flex flex-wrap sm:flex-nowrap mt-5 sm:mt-0 sm:mb-7">
							{loading ?
								<button type="button" className="flex items-center justify-center btn-secondary w-full mt-5 sm:mt-0 cursor-not-allowed" disabled="">
									<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Processing...
								</button>
								:
								<button type="submit" className="btn-secondary w-full">Add Card</button>
							}
						</div>
					</div>
				</form>
			</div>
			
		</div>
	)
}

export default AdminAddCard