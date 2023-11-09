import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modals/Modal';
import ChangePassword from './Popup/ChangePassword';
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ProfileIcon from "../../assets/svg/ImagesProfileIcon.svg"
import PreviewImage from "../../assets/svg/Previewimage.svg"
import { ToastContainer, toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';


function AdminAccountDetails() {
    const [changePassword, setChangePassword] = useState(false);
    const user = localStorage.getItem("user");
    const [details, setDetails] = useState({});
    const [profileImage, setProfileImage] = useState(null);
    const [isDisable, setIsDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const header = {
        'Authorization': `Bearer ${JSON.parse(user)?.token}`,
    }

    const initalState = {
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        // profile_pic: ""
    }
    const getAccountDetails = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/user/admin-profile`, { headers: header });
            if (response.data.IsSuccess) {
                setDetails(response.data.Data)
                setLoading(false);
            } else {
                toast.error(response.data.Message);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const addProfile = async (selected) => {
        let formData = new FormData();
        formData.append("profile_pic", selected);

        try {
            const response = await axios.patch(`${baseurl}/api/user/admin-edit-profile`, formData, { headers: header })
            // const response = await dispatch(addProfileImage(formData)).unwrap();
            if (response?.data?.IsSuccess) {
                window.location.reload();
                // alert("Profile image Updated Successful")
                setProfileImage(response.data.Data.profile_pic)
            } else {
                alert("Profile image Not Updated!")
            }
        } catch (error) {
            alert("Somthing Went To Wrong!")
        }
    }

    const photoChange = (event) => {
        const types = ["image/png", "image/jpeg", "image/jpg"];
        let selected = event;
        try {
            if (selected && types.includes(selected.type)) {
                if (selected.size < 1 * 1024 * 1024) {
                    setProfileImage(selected);
                    addProfile(selected);
                } else {
                    alert("File size is greater than 1mb");
                }
            } else {
                alert("Please select image file with jpeg/png.");
            }
        } catch (error) {
            console.log(error);
            alert("Error while selecting image")
        }
    }

    const [values, setValues] = useState(initalState);
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const addPersonalDetails = async () => {
        try {
            const response = await axios.patch(`${baseurl}/api/user/admin-edit-profile`, values, { headers: header });
            if (response.data.IsSuccess) {
                window.location.reload();
                toast.success(response.data.Message);
            } else {
                toast.error(response.data.Message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong.");
        }
    }

    useEffect(() => {
        setValues({
            first_name: details?.first_name,
            last_name: details?.last_name,
            email: details?.email,
            phone_no: details?.phone_no,
            // profile_pic: details?.profile_pic,
        })
        getAccountDetails();
    }, [profileImage, isDisable]);

    // let initialRender = true;
    // useEffect(() => {
    //     if (initialRender) {
    //         initialRender = false;
    //     } else {
    //         if (!isDisable) {
    //             toast.info("Edit Profile Enable.")
    //         } else {
    //             toast.info("Edit Profile Disable.")
    //         }
    //     }
    // }, [isDisable]);
    return (
        <div className="wrapper min-h-full relative">
            {loading ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
                : <>

                    <div className="xsm:flex flex-wrap justify-between items-center">
                        <div className='flex justify-start items-center'>
                            <Link to="../" className='flex items-center'>
                                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                                </svg>
                                <button type='button' className="text-base md:text-3xl font-bold text-yankeesBlue leading-8 pl-4 md:pl-7">{details?.first_name} {details?.last_name}'s Account Details</button>
                            </Link>
                        </div>
                        {isDisable && <button className="btn-secondary flex ml-auto mt-2  xsm:ml-0 xsm:mt-0" onClick={() => setIsDisable(false)}>
                            <svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
                            </svg>Edit Details</button>}
                        {!isDisable && <div className='flex justify-end mt-2 xsm:mt-0'>
                            <button className="btn-secondary flex mr-3" onClick={() => { addPersonalDetails(); setIsDisable(true) }}>Save</button>
                            <button className="btn-secondary flex" onClick={() => setIsDisable(true)}>Cancel</button>
                        </div>}
                        {/* <div className="flex space-x-3">
					<Link to='createaccount' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Edit Details
					</Link> */}
                        {/* <Link to='../dashboard/adminaddcard' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Add Card
					</Link> */}
                        {/* </div> */}
                    </div>
                    <div className="pt-8 sm:pt-[50px]">
                        <div className="flex items-center justify-center pb-8 sm:pb-[50px]">
                            <div className="w-44 h-44 rounded-full border-8 border-spiroDiscoBall bg-[#E2E8F0] relative mr-9 max-[600px]:mr-0">
                                <img
                                    // src={
                                    // 	profileImage
                                    // 		? URL.createObjectURL(profileImage)
                                    // 		: details?.profile_pic
                                    // 			? details?.s3Url + details?.profile_pic
                                    // 			: previewImage
                                    // }
                                    src={details?.profile_pic && details?.profile_pic !== "" ? details?.profile_pic : PreviewImage}
                                    alt="pictures"
                                    className="w-full h-full object-cover object-top rounded-full overflow-hidden"
                                />
                                <div className="absolute bottom-0 right-0 flex justify-center items-center border-[2px] border-white w-10 h-10 rounded-full bg-[#E2E8F0] z-10">
                                    {/* <i className="icon-camera"></i> */}
                                    <img src={ProfileIcon} alt="Alt Text" className='w-full h-full object-cover rounded-full overflow-hidden p-1' />
                                    <input
                                        type="file"
                                        onChange={(e) => photoChange(e.currentTarget.files[0])}
                                        className="opacity-0 absolute inset-0"
                                    // disabled={isDisable}
                                    />
                                    {/* <input type="file" onChange={(e) => !isDisable && photoChangeHandler(e)} disabled={isDisable} className="opacity-0 absolute inset-0"/> */}
                                </div>
                            </div>
                        </div>
                        <form className="w-full flex items-center justify-between">
                            <div className="w-full">
                                <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-6 sm:mb-7">
                                    <div className='w-full sm:w-1/2 mb-3 sm:mb-0'>
                                        <label htmlFor="first_name" className="input-title2">First name</label>
                                        <input type="text" name="first_name" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xs sm:placeholder:text-base" defaultValue={details?.first_name || ""} placeholder={"First name"} disabled={isDisable} onChange={changeHandler} />
                                    </div>
                                    <div className='w-full sm:w-1/2 mb-3 sm:mb-0'>
                                        <label htmlFor="last_name" className="input-title2">Last name</label>
                                        <input type="text" name="last_name" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xs sm:placeholder:text-base" defaultValue={details?.last_name} placeholder={"Last name"} disabled={isDisable} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-6 sm:mb-7">
                                    <div className='w-full sm:w-1/2 mb-3 sm:mb-0'>
                                        <label htmlFor="" className="input-title2">Email</label>
                                        <input type="email" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xs sm:placeholder:text-base" defaultValue={details?.email} placeholder='' disabled />
                                    </div>
                                    <div className='w-full sm:w-1/2 mb-3 sm:mb-0'>
                                        <label htmlFor="" className="input-title2">Phone number</label>
                                        <input type="tel" name="" className="input_box2 placeholder:text-[#94A3B8] placeholder:text-xs sm:placeholder:text-base" defaultValue={details?.phone_no} placeholder='' disabled />
                                    </div>
                                </div>
                                <div className="w-full flex flex-wrap sm:flex-nowrap sm:space-x-6 sm:mb-7">
                                    <div className='w-full sm:w-1/2 mb-3 sm:mb-0'>
                                        <label htmlFor="" className="input-title2">Password</label>
                                        <div className="relative">
                                            <input type="password" name="" className="relative input_box2 placeholder:text-[#94A3B8] placeholder:text-xs sm:placeholder:text-base" placeholder='**** **** ****' disabled />
                                            <span onClick={() => setChangePassword(true)} className='absolute right-6 top-1/2 -translate-y-1/2 text-[#29A073] text-sm sm:text-base font-extrabold cursor-pointer'>Change password</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Modal isOpen={changePassword}>
                        <ChangePassword handleClose={setChangePassword} />
                    </Modal>
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
                    /></>}
        </div>

    )
}

export default AdminAccountDetails