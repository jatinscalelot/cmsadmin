import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { baseurl } from '../../../api/baseurl';

export default function UserReject({ handleClose }) {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();

	const user_id = localStorage.getItem("user_id");

	const user = localStorage.getItem("user");
	const header = {
		'Authorization': `Bearer ${JSON.parse(user)?.token}`,
		'Content-Type': 'multipart/form-data'
	}

	const reject = async () => {
		try {
			const response = await axios.post(`${baseurl}/api/cards/add-payment-record`, { user_id: user_id, "is_verified": true }, { headers: header });

			if (response.data.IsSuccess) {
				toast.success(response.data.Message);
				// dispatch(increment());
				setTimeout(() => {
					handleClose(false);
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

	return (
		<div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] overflow-auto flex backdrop-blur-[1px] z-50'>
			<div className="max-w-[1005px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-5 md:p-11">
				<h2 className='flex justify-center'>Verify Details</h2>
				<form>
					<span className="block text-yankeesBlue text-2xl font-bold py-6">Are you not trusting on user?</span>
					<div className="flex justify-center border-t-[1px] border-[#CBD5E1] space-x-5 pt-6">
						<button type="button" onClick={() => handleClose(false)} className="max-w-[216px] w-full text-center cursor-pointer text-base font-extrabold text-yankeesBlue bg-white border-2 border-[#94A3B8] rounded-xl px-6 py-2">Cancel</button>
						<button onClick={() => reject()} type="submit" className="max-w-[216px] w-full text-center text-base font-extrabold cursor-pointer text-white bg-darkGreen border-2 border-darkGreen rounded-xl px-6 py-2">Reject</button>
					</div>
				</form>
			</div>
		</div>
	)
}
