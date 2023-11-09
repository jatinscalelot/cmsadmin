import React, { useCallback, useState } from 'react'
import moment from 'moment/moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../api/baseurl';
function UserVerify({ handleClose }) {

	// const dispatch = useDispatch();

	const user_id = localStorage.getItem("user_id");
	const user = localStorage.getItem("user");
  const header = {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  };

	const initialState = {
		user_id: user_id,
		is_verified: "",
	}


	const verify = async (values) => {
		const requestObj = { ...values };
		try {
			const response = await axios.post(`${baseurl}/api/user/verify-account`, { user_id: values.user_id, is_verified: values.is_verified }, { headers: header });

			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				// dispatch(increment());
				setTimeout(() => {
					handleClose(false);
					window.location.reload();
				}, 1000);
			} else {
				toast.error(response.data.Message);
				// toast.error(response.data.Message);
			}
		} catch (error) {
			toast.error("Something Went Wrong!!");
			// navigate(`/auth/login`);
			console.log(error);
		}
	}

	const formik = useFormik({
		initialValues: initialState,
		onSubmit: verify,
	});

	const setInputValue = useCallback(
		(key, value) =>
			formik.setValues({
				...formik.values,
				[key]: value,
			}),
		[formik]
	);
	return (
		<>

			<div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50'>
				<div className="relative max-w-[508px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-5 sm:p-8">
					<div className="">
						<div>
							<h3 className="text-center text-[#111827]">Verify Details</h3>
							<button
								onClick={() => handleClose(false)}
								className="absolute top-1 right-1 md:top-5 md:right-5 text-xl max-[640px]:pl-6"
							>
								<svg class="w-7 h-7" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Close"><rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="24" height="24"></rect><line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round"></line><line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" stroke-width="2" stroke-linecap="round"></line></g></g></svg>
							</button>
						</div>
						<div className="pt-6">
							<form className='space-y-4' onSubmit={formik.handleSubmit}>
								<span className="block text-yankeesBlue text-2xl font-bold py-6">Are you trusting on user?</span>

								<div className="flex justify-center border-t-[1px] border-[#CBD5E1] space-x-5 pt-6">
									<button onClick={() => setInputValue("is_verified", true)} type="submit" className="max-w-[216px] w-full text-center text-base font-extrabold cursor-pointer text-white bg-darkGreen border-2 border-darkGreen rounded-xl px-6 py-2">Verify</button>
									<button onClick={() => setInputValue("is_verified", false)} type="submit" className="max-w-[216px] w-full text-center text-base font-extrabold cursor-pointer text-white bg-[#f34646] border-[#f34646] rounded-xl px-6 py-2">Unverify</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserVerify;