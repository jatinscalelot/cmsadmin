import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseurl } from '../../api/baseurl';
import { ProgressSpinner } from 'primereact/progressspinner';
import { toast } from 'react-toastify';
import Modal from '../../common/Modals/Modal';
import SinglePhotoView from '../Admin/Popup/SinglePhotoView';

export default function AdminCardDetails() {
	// const { state } = useLocation();
	// const { data } = state;
	const [data, setData] = useState({});
	const [id2, setId2] = useState();

	const user = localStorage.getItem("user");
	const navigate = useNavigate();
	const [isPhotoViewPopUpOpen, setIsPhotoViewPopUpOpen] = useState(false);

	const card_id = localStorage.getItem("card_id");
	const [loading, setLoading] = useState(true);

	const header = {
		'Authorization': `Bearer ${JSON.parse(user)?.token}`,
	}

	const getCardDetails = async () => {
		try {
			const response = await axios.get(`${baseurl}/api/cards/view-admin-card?card_id=${card_id}`, { headers: header });
			if (response.data.IsSuccess) {
				setData(response.data.Data);
				setLoading(false);
			} else {
				toast.error(response.data.Message);
			}
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getCardDetails();
	}, []);

	return (
		<>
			{loading ?
				<div className="flex items-center justify-center">
					<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
				</div>
				:

				<div className="wrapper min-h-full flex flex-col">
					<div className="">
						<div className="xsm:flex items-center justify-between mb-5 md:mb-12">
							<div className="flex items-center">
								<svg onClick={() => navigate("../adminwallet")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
								</svg>
								<h3 className="text-yankeesBlue leading-8 pl-7">{data.card_holder_name}</h3>
							</div>
							{/* <div className="flex items-center justify-between pb-9"> */}
							{/* <h3 className="text-yankeesBlue leading-8">Card-Holder List</h3> */}
							<div className="flex justify-end sm:justify-center mt-3 sm:mt-0 space-x-3">
								<button to='createaccount' className="btn-secondary flex" onClick={() => navigate("../admineditcard")}>
									<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
									</svg>
									Edit Details
								</button>
								<button to='createaccount' className="btn-secondary flex" onClick={() => { setId2(data); setIsPhotoViewPopUpOpen(true); }}>
									Card Photo
								</button>
							</div>
							{/* </div> */}
						</div>
						<div className="bg-lightWhite rounded-xl py-7 md:py-12 px-7 md:px-12 xl:px-24 mb-7">
							<div className="flex flex-wrap md:flex-nowrap justify-center items-center md:space-x-5">
								<div className="w-full md:w-1/3 mb-3 md:mb-0">
									<span className="text-base md:text-lg xl:text-xl font-semibold text-lightGray mb-3">Card holder name</span>
									<h2 className="text-yankeesBlue font-bold">{data.card_holder_name}</h2>
								</div>
								<div className="w-full md:w-1/3 mb-3 md:mb-0">
									<span className="text-base md:text-lg xl:text-xl font-semibold text-lightGray mb-3">Card number</span>
									<h2 className="text-yankeesBlue font-bold">{data?.card_number && data?.card_number !== "" ? <>********{(data.card_number).toString().substr(-4)}</> : ""}</h2>
								</div>
								<div className="w-full md:w-1/3 mb-3 md:mb-0">
									<span className="text-base md:text-lg xl:text-xl font-semibold text-lightGray mb-3">Bank name</span>
									<h2 className="text-yankeesBlue font-bold">{data.card_bank_name}</h2>
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap items-center- justify-start -mx-3 md:mb-[50px]">
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-[#ed4d3714] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-[#ED4D37] mb-3">₹ {data.credit_amount}</h2>
									<span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
										Total Credit Amount
									</span>
								</div>
							</div>
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-yankeesBlue mb-3">{moment(data.card_exp_date).format('ll')}</h2>
									<span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
										Due Date
									</span>
								</div>
							</div>
						</div>
					</div>
					<Modal isOpen={isPhotoViewPopUpOpen}>
						<SinglePhotoView handleClose={setIsPhotoViewPopUpOpen} id2={id2} />
					</Modal>
				</div>
			}
		</>
	)
}
