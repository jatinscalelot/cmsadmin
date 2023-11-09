import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { baseurl } from '../../api/baseurl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

export default function EditCardDetails() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const { state } = useLocation();
    // const { data } = state;
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const user_id = localStorage.getItem("user_id");
    const card_id = localStorage.getItem("card_id");
    const [data, setData] = useState({});
    const user = localStorage.getItem("user");
    const header = {
        Authorization: `Bearer ${JSON.parse(user)?.token}`,
    };
    const initialState = {
        card_id: data.card_id,
        user_id: data.id,
        card_network: "",
        card_bank_name: "",
        card_category: "business",
        card_number: "",
        card_holder_name: "",
        // card_photo: "",
        frontside_card_photo: "",
        backside_card_photo: "",
        card_exp_date: "",
        card_cvv: "",
        commission: ""
    }

    const ValidationSchema = Yup.object().shape({
        card_network: Yup.string().required('Card network is required*'),
        card_bank_name: Yup.string().required('Bank name is required*'),
        card_category: Yup.string().required('Card category is required*'),
        card_number: Yup.string().test('len', 'Must be exactly 12 characters', val => val.length === 16).required('Card number is required*'),
        card_holder_name: Yup.string().required('Card holder name is required*'),
        // card_photo: Yup.string().required('Card photo is required*'),
        frontside_card_photo: Yup.string().required('Card photo is required*'),
        backside_card_photo: Yup.string().required('Card photo is required*'),
        card_exp_date: Yup.date().required('Expiry date is required*'),
        card_cvv: Yup.string().test('len', 'Must be exactly 3 characters', val => val.length === 3).required('Cvv is required*'),
        commission: Yup.number().positive('Commission should be greater than 0*').required('Commission is required*').moreThan(0, 'Commision should not be zero or less than zero')
            .lessThan(101, "Commission should not be more than 100%"),
    });


    const getCardDetails = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/cards/cards-list?card_id=${card_id}&user_id=${user_id}`, { headers: header });
            if (response.data.IsSuccess) {
                setData(response.data.Data);
                formik.setValues({
                    user_id: response.data.Data?.user_id.id,
                    card_id: response.data.Data?.card_id,
                    card_network: response.data.Data.card_network,
                    card_bank_name: response.data.Data.card_bank_name,
                    card_category: response.data.Data.card_category,
                    card_number: response.data.Data.card_number,
                    card_holder_name: response.data.Data.card_holder_name,
                    // card_photo: response.data.Data.card_photo,
                    frontside_card_photo: response.data.Data.frontside_card_photo,
                    backside_card_photo: response.data.Data.backside_card_photo,
                    card_exp_date: response.data.Data.card_exp_date,
                    card_cvv: response.data.Data.card_cvv,
                    commission: response.data.Data.commission
                })
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clickNextHandler = async (values) => {
        setLoading2(true);
        values.user_id = data.user_id.id;
        values.card_id = data.card_id;
        const requestObj = { ...values };
        const formData = new FormData();
        requestObj.card_exp_date = moment(formik.values.card_exp_date).toISOString().slice(0, 10);
        // requestObj.frontside_card_photo = formData.append("frontside_card_photo", formik.values.frontside_card_photo);
        // requestObj.backside_card_photo = formData.append("backside_card_photo", formik.values.backside_card_photo);

        for (const key in requestObj) {
            if (key === "frontside_card_photo" && typeof requestObj[key] === 'string') {
                continue;
            }
            if (key === "backside_card_photo" && typeof requestObj[key] === 'string') {
                continue;
            }
            const element = requestObj[key];
            formData.append(key, element)
        }
        try {
            const response = await axios.patch(`${baseurl}/api/cards/edit-user-card`, formData, { headers: header });

            if (response.data.IsSuccess) {
                toast.success(response.data.Message);
                // toast.success(response.data.Message);
                // dispatch(increment());
                setTimeout(() => {
                    navigate("../carddetails");
                }, 1000);
            } else {
                toast.error(response.data.Message);
            }
            setLoading2(false);
        } catch (error) {
            toast.error("Something Went Wrong.");
            // navigate(`/auth/login`);
            console.log(error);
            setLoading2(false);
        }
    }


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

    useEffect(() => {
        getCardDetails();
    }, []);

    return (
        <div className="wrapper min-h-full">
            <div className="flex items-center cursor-pointer">
                <svg onClick={() => navigate("../carddetails")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                </svg>
                <h3 className="text-yankeesBlue leading-8 pl-7">Edit Card</h3>
            </div>
            {loading ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div> :
                <div className="pt-5 md:pt-10">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full">
                            <div className="w-full flex flex-wrap md:flex-nowrap items-center md:space-x-6 md:mb-7">
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_number" className="input-title2">Card Number*</label>
                                    <input type="text" name="card_number" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xl" placeholder='Enter card number' required onChange={(e) => setInputValue("card_number", e.target.value)} defaultValue={formik.values?.card_number || ""} />
                                    <small className="text-red-500 text-xs">{formik.errors.card_number}</small>
                                </div>
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_category" className="input-title2" >Card category</label>
                                    <div className="cardType flex items-center space-x-10 md:px-4 py-3">
                                        <label className='flex items-center relative' htmlFor='business'>
                                            <input type="radio" name="card_category" id='business' value='business' className="absolute inset-0 z-10 cursor-pointer opacity-0 transactiongroup" defaultChecked onChange={(e) => setInputValue("card_category", e.target.value)} defaultValue={formik.values?.card_category || ""} />
                                            <div className='flex items-center'>
                                                <span className="inline-block w-5 h-5 rounded-full border-2 border-black/20 mr-4 radio"></span>
                                            </div>
                                            <span className="text-[#475569] text-sm md:text-xl font-semibold md:pl-3">Business</span>
                                        </label>
                                        <label className='flex items-center relative' htmlFor='personal'>
                                            <input type="radio" name="card_category" id='personal' value='personal' className="absolute inset-0 z-10 cursor-pointer opacity-0 transactiongroup" onChange={(e) => setInputValue("card_category", e.target.value)} defaultValue={formik.values?.card_category || ""} />
                                            <div className='flex items-center'>
                                                <span className="inline-block w-5 h-5 rounded-full border-2 border-black/20 mr-4 radio"></span>
                                            </div>
                                            <span className="text-[#475569] text-sm md:text-xl font-semibold md:pl-3">Personal</span>
                                        </label>
                                    </div>
                                    <small className="text-red-500 text-xs">{formik.errors.card_category}</small>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_bank_name" className="input-title2">Card bank name*</label>
                                    <input type="text" name="card_bank_name" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xl" placeholder='Enter bank name' required onChange={(e) => setInputValue("card_bank_name", e.target.value)} defaultValue={formik.values?.card_bank_name || ""} />
                                    <small className="text-red-500 text-xs">{formik.errors.card_bank_name}</small>
                                </div>
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_network" className="input-title2">Card network*</label>
                                    <input type="text" name="card_network" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xl" placeholder='Visa' required onChange={(e) => setInputValue("card_network", e.target.value)} defaultValue={formik.values?.card_network || ""} />
                                    <small className="text-red-500 text-xs">{formik.errors.card_network}</small>
                                </div>

                            </div>
                            <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_holder_name" className="input-title2">Card holder name*</label>
                                    <input type="text" name="card_holder_name" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xl" placeholder='Enter card holder name' required onChange={(e) => setInputValue("card_holder_name", e.target.value)} defaultValue={formik.values?.card_holder_name || ""} />
                                    <small className="text-red-500 text-xs">{formik.errors.card_holder_name}</small>
                                </div>
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_exp_date" className="input-title2 relative">Card Expiry Date *</label>
                                    <label className='relative'>
                                        <Calendar id="calender" name="card_exp_date" className='w-full block py-[2px] box-shadow relative' placeholder={"Enter Card Expiry Date"} value={formik.values?.card_exp_date || ""} onChange={(e) => setInputValue("card_exp_date", e.target.value)} />
                                        <svg className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-8' width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3.13266C3.45858 3.25614 2.69469 3.49457 2.06107 3.95492C1.6366 4.26331 1.26331 4.6366 0.954915 5.06107C0 6.3754 0 8.25027 0 12C0 15.7497 0 17.6246 0.954915 18.9389C1.26331 19.3634 1.6366 19.7367 2.06107 20.0451C3.3754 21 5.25027 21 9 21C9.83894 21 10.584 21 11.25 20.9893L11.25 20.9192C11.2499 20.0672 11.2499 19.5482 11.3208 19.1005C11.7105 16.6401 13.6401 14.7105 16.1005 14.3208C16.5482 14.2499 17.0672 14.2499 17.9192 14.25L17.9893 14.25C18 13.5842 18 12.8392 18 12.0005C18 8.25073 18 6.3754 17.0451 5.06107C16.7367 4.6366 16.3634 4.26331 15.9389 3.95492C15.3053 3.49457 14.5414 3.25614 13.5 3.13266V4C13.5 4.82843 12.8284 5.5 12 5.5C11.1716 5.5 10.5 4.82843 10.5 4V3.00281C10.0359 3 9.53719 3 9 3C8.46281 3 7.9641 3 7.5 3.00281V4C7.5 4.82843 6.82843 5.5 6 5.5C5.17157 5.5 4.5 4.82843 4.5 4V3.13266ZM4 9C4.55228 9 5 8.55228 5 8C5 7.44772 4.55228 7 4 7C3.44772 7 3 7.44772 3 8C3 8.55228 3.44772 9 4 9ZM5 12C5 12.5523 4.55228 13 4 13C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11C4.55228 11 5 11.4477 5 12ZM9 9C9.55229 9 10 8.55228 10 8C10 7.44772 9.55229 7 9 7C8.44771 7 8 7.44772 8 8C8 8.55228 8.44771 9 9 9ZM10 12C10 12.5523 9.55229 13 9 13C8.44771 13 8 12.5523 8 12C8 11.4477 8.44771 11 9 11C9.55229 11 10 11.4477 10 12ZM9 17C9.55229 17 10 16.5523 10 16C10 15.4477 9.55229 15 9 15C8.44771 15 8 15.4477 8 16C8 16.5523 8.44771 17 9 17ZM15 8C15 8.55228 14.5523 9 14 9C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8ZM14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z" fill="#94A3B8" />
                                            <path d="M17.9347 15.75C17.0243 15.7501 16.6435 15.7535 16.3352 15.8023C14.5166 16.0904 13.0904 17.5166 12.8023 19.3352C12.7535 19.6435 12.7501 20.0243 12.75 20.9347C14.1896 20.8403 15.1622 20.6094 15.9389 20.0451C16.3634 19.7367 16.7367 19.3634 17.0451 18.9389C17.6094 18.1622 17.8403 17.1896 17.9347 15.75Z" fill="#94A3B8" />
                                            <path d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V4C5.25 4.41421 5.58579 4.75 6 4.75C6.41421 4.75 6.75 4.41421 6.75 4V1Z" fill="#94A3B8" />
                                            <path d="M12.75 1C12.75 0.585786 12.4142 0.25 12 0.25C11.5858 0.25 11.25 0.585786 11.25 1V4C11.25 4.41421 11.5858 4.75 12 4.75C12.4142 4.75 12.75 4.41421 12.75 4V1Z" fill="#94A3B8" />
                                        </svg>
                                    </label>
                                    <small className="text-red-500 text-xs">{formik.errors.card_exp_date}</small>
                                    {/* <img src={CalendarIcon} alt="Calendar icon" className='absolute top-1/2 translate-y-1/2 right-10' /> */}
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                                <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                                    <label htmlFor="frontside_card_photo" className="input-title2">Card Front photo*</label>
                                    <label className='input_box2 flex items-center border-dashed justify-start' htmlFor='card-photo'>
                                        <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                        </svg>
                                        <span className="text-[#94A3B8] font-normal text-sm md:text-xl pl-4">
                                            {formik.values.frontside_card_photo && formik.values.frontside_card_photo !== "" ?
                                                formik.values.frontside_card_photo.name || "Update Photo"
                                                :
                                                "Upload"
                                            }
                                        </span>
                                    </label>
                                    <input type="file" name="frontside_card_photo" id='card-photo' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='upload' accept='image/*' onChange={(e) => setInputValue("frontside_card_photo", e.currentTarget.files[0])} />
                                    <small className="text-red-500 text-xs">{formik.errors.frontside_card_photo}</small>
                                </div>
                                <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                                    <label htmlFor="backside_card_photo" className="input-title2">Card back photo*</label>
                                    <label className='input_box2 flex items-center border-dashed justify-start' htmlFor='card-photo-1'>
                                        <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4444 1.75C7.65101 1.75 5.35585 3.88704 5.10594 6.6149C5.07 7.0073 4.74063 7.306 4.34837 7.3056C2.9362 7.3044 1.75 8.4797 1.75 9.8889C1.75 11.3156 2.9066 12.4722 4.33333 12.4722H5C5.41421 12.4722 5.75 12.808 5.75 13.2222C5.75 13.6364 5.41421 13.9722 5 13.9722H4.33333C2.07817 13.9722 0.25 12.1441 0.25 9.8889C0.25 7.8644 1.76567 6.1724 3.69762 5.858C4.28682 2.66679 7.08302 0.25 10.4444 0.25C12.947 0.25 15.1354 1.5899 16.3334 3.58865C19.2024 3.47555 21.75 5.8223 21.75 8.7778C21.75 11.4717 19.6998 13.6859 17.0741 13.9466C16.6619 13.9875 16.2946 13.6866 16.2537 13.2744C16.2127 12.8622 16.5137 12.4949 16.9259 12.4539C18.792 12.2687 20.25 10.693 20.25 8.7778C20.25 6.565 18.2032 4.80912 16.0261 5.1209C15.7057 5.1668 15.3871 5.0044 15.239 4.70953C14.3572 2.95291 12.5406 1.75 10.4444 1.75Z" fill="#94A3B8" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 10.0606L12.9696 12.0302C13.2625 12.3231 13.7374 12.3231 14.0303 12.0302C14.3232 11.7373 14.3232 11.2625 14.0303 10.9696L11.8839 8.82311C11.3957 8.33501 10.6043 8.33501 10.1161 8.82311L7.96967 10.9696C7.67678 11.2625 7.67678 11.7373 7.96967 12.0302C8.26256 12.3231 8.73744 12.3231 9.0303 12.0302L11 10.0606Z" fill="#94A3B8" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11 16.75C11.4142 16.75 11.75 16.4142 11.75 16V10C11.75 9.5858 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.5858 10.25 10V16C10.25 16.4142 10.5858 16.75 11 16.75Z" fill="#94A3B8" />
                                        </svg>
                                        <span className="text-[#94A3B8] font-normal text-sm md:text-xl pl-4">
                                            {formik.values.backside_card_photo && formik.values.backside_card_photo !== "" ?
                                                formik.values.backside_card_photo.name || "Update Photo"
                                                :
                                                "Upload"
                                            }
                                        </span>
                                    </label>
                                    <input type="file" name="backside_card_photo" id='card-photo-1' className="input_box2 placeholder:text-[#94A3B8] placeholder:text-base hidden" placeholder='Card photo upload' accept='image/*' onChange={(e) => setInputValue("backside_card_photo", e.currentTarget.files[0])} />
                                    <small className="text-red-500 text-xs">{formik.errors.backside_card_photo}</small>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                                <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                    <label htmlFor="card_cvv" className="input-title2">Card CVV *</label>
                                    <input type="text" name="card_cvv" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xl" placeholder='Enter cvv' required onChange={(e) => setInputValue("card_cvv", e.target.value)} defaultValue={formik.values?.card_cvv || ""} />
                                    <small className="text-red-500 text-xs">{formik.errors.card_cvv}</small>
                                </div>
                                <div className='w-full md:w-1/2 mb-4 md:mb-0'>
                                    <label htmlFor="" className="input-title2">Commission *</label>
                                    <input step="any" type="number" name="commission" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xl" defaultValue={formik.values?.commission || ""} placeholder='Enter commission in %' onChange={(e) => setInputValue("commission", e.target.value)} />
                                    <small className="text-red-500 text-xs">{formik.errors.commission}</small>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                                {loading2 ?
                                    <button type="button" className="flex items-center justify-center btn-secondary w-full mt-5 sm:mt-0" disabled="">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </button>
                                    :
                                    <button type="submit" className="btn-secondary w-full">Save</button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            }
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
