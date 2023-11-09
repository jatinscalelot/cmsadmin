import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseurl } from '../../api/baseurl';
import { ProgressSpinner } from 'primereact/progressspinner';
import { toast } from 'react-toastify';
import Modal from '../../common/Modals/Modal';
import SinglePhotoView from '../Admin/Popup/SinglePhotoView';
import PaymentDetails from '../Admin/Popup/DepositPaymentDetails';
import CardHolderDueAmount from '../Admin/Popup/CardHolderDueAmount'
export default function CardDetails() {
	// const { state } = useLocation();
	// const { data } = state;
	const [data, setData] = useState({});
	const [id2, setId2] = useState({});

	const navigate = useNavigate();
	const [isPhotoViewPopUpOpen, setIsPhotoViewPopUpOpen] = useState(false);
	const [isPayPopUpOpen, setIsPayPopUpOpen] = useState(false);
	const [dueAmountPop, setDueAmountPop] = useState(false);
	const [viewNumber, setViewNumber] = useState(false)

	const user_id = localStorage.getItem("user_id");
	const card_id = localStorage.getItem("card_id");
	const [loading, setLoading] = useState(false);
	const [card, setCard] = useState([]);
	const [dueData, setDueData] = useState({});

	const user = localStorage.getItem("user");
	const header = {
		Authorization: `Bearer ${JSON.parse(user)?.token}`,
	};
	const getCardDetails = async () => {
		try {
			const response = await axios.get(`${baseurl}/api/cards/cards-list?card_id=${card_id}&user_id=${user_id}`, { headers: header });
			if (response.data.IsSuccess) {
				setCard(response.data.Data);
				setData(response.data.Data);
				setDueData(response.data.Data)
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
								<svg onClick={() => navigate("../")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
								</svg>
								<h3 className="text-yankeesBlue leading-8 pl-7">{data.card_holder_name}</h3>
							</div>
							{/* <div className="flex items-center justify-between pb-9"> */}
							{/* <h3 className="text-yankeesBlue leading-8">Card-Holder List</h3> */}
							<div className="flex justify-end sm:justify-center mt-3 sm:mt-0 space-x-3">
								<button to='createaccount' className="btn-secondary flex" onClick={() => navigate("../editcarddetails")}>
									<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
									</svg>
									Edit Details
								</button>
								<button to='createaccount' className="btn-secondary flex" onClick={() => { setId2(data); setIsPhotoViewPopUpOpen(true); }}>
									Card Photo
								</button>
								{/* onClick={(e) => { e.stopPropagation(); setDueData(row); setDueAmountPop(true); }} */}
								<div onClick={() => { setDueAmountPop(true) }} className="btn-secondary flex cursor-pointer">Add Request</div>
								{/* <div className="flex space-x-3"> */}
								{/* <button onClick={() => setIsPayPopUpOpen(true)} className="btn-secondary flex px-5">Pay</button> */}
								{/* </div> */}
							</div>
							{/* </div> */}
						</div>
						<div className="bg-lightWhite rounded-xl py-7 md:py-12 px-7 md:px-12 xl:px-24 mb-7">
							<div className="flex flex-wrap md:flex-nowrap justify-center items-center md:space-x-5">
								<div className="w-full md:w-1/3 mb-3 md:mb-0">
									<span className="text-base md:text-lg xl:text-xl font-semibold text-lightGray mb-3">Card holder name</span>
									<h2 className="text-yankeesBlue font-bold">{data.card_holder_name}</h2>
								</div>
								<div className="relative w-full md:w-1/3 mb-3 md:mb-0 select-none">
									<div className='flex items-center mb-3 space-x-3'>
										<span className="text-base md:text-lg xl:text-xl font-semibold text-lightGray">Card number</span>
										<div onClick={() => setViewNumber(!viewNumber)}>
											{viewNumber ?
												<>
													<svg className='cursor-pointer' width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd" clipRule="evenodd" d="M11 5.25C8.92894 5.25 7.25001 6.92893 7.25001 9C7.25001 11.0711 8.92894 12.75 11 12.75C13.0711 12.75 14.75 11.0711 14.75 9C14.75 6.92893 13.0711 5.25 11 5.25ZM8.75001 9C8.75001 7.75736 9.75737 6.75 11 6.75C12.2426 6.75 13.25 7.75736 13.25 9C13.25 10.2426 12.2426 11.25 11 11.25C9.75737 11.25 8.75001 10.2426 8.75001 9Z" fill="#2D264B" />
														<path fillRule="evenodd" clipRule="evenodd" d="M11 0.25C8.85905 0.25 6.92325 1.30899 5.35173 2.59572C3.77164 3.88946 2.47962 5.47865 1.61142 6.68801L1.53981 6.78759C1.01715 7.51384 0.586914 8.11166 0.586914 9C0.586914 9.88834 1.01715 10.4862 1.53981 11.2124L1.61142 11.312C2.47962 12.5214 3.77164 14.1105 5.35173 15.4043C6.92325 16.691 8.85905 17.75 11 17.75C13.141 17.75 15.0768 16.691 16.6483 15.4043C18.2284 14.1105 19.5204 12.5214 20.3886 11.312L20.4602 11.2124C20.9829 10.4862 21.4131 9.88835 21.4131 9C21.4131 8.11166 20.9829 7.51384 20.4602 6.78759L20.3886 6.68801C19.5204 5.47865 18.2284 3.88946 16.6483 2.59572C15.0768 1.30899 13.141 0.25 11 0.25ZM2.82993 7.56278C3.6592 6.40765 4.86348 4.93414 6.302 3.75631C7.7491 2.57146 9.35423 1.75 11 1.75C12.6458 1.75 14.2509 2.57146 15.698 3.75631C17.1365 4.93414 18.3408 6.40765 19.1701 7.56278C19.794 8.43194 19.9131 8.64148 19.9131 9C19.9131 9.35852 19.794 9.56806 19.1701 10.4372C18.3408 11.5923 17.1365 13.0659 15.698 14.2437C14.2509 15.4285 12.6458 16.25 11 16.25C9.35423 16.25 7.7491 15.4285 6.302 14.2437C4.86349 13.0659 3.6592 11.5923 2.82993 10.4372C2.20597 9.56806 2.08691 9.35852 2.08691 9C2.08691 8.64148 2.20597 8.43194 2.82993 7.56278Z" fill="#2D264B" />
													</svg>
												</>
												:
												<>
													<svg className='cursor-pointer' width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path fillRule="evenodd" clipRule="evenodd" d="M21.4685 1.58568C21.792 1.32692 21.8444 0.854953 21.5857 0.531506C21.3269 0.20806 20.855 0.155619 20.5315 0.414376L17.2062 3.07464C15.529 1.56835 13.3897 0.250028 11 0.250028C8.85907 0.250028 6.92327 1.30902 5.35175 2.59574C3.77166 3.88949 2.47964 5.47868 1.61144 6.68804L1.53984 6.78762C1.01718 7.51385 0.58695 8.11166 0.586944 9C0.586937 9.88833 1.01709 10.4861 1.53964 11.2122L1.61121 11.3117C2.15751 12.0727 2.86909 12.9805 3.71226 13.8698L0.531506 16.4144C0.20806 16.6731 0.155619 17.1451 0.414376 17.4685C0.673133 17.792 1.1451 17.8444 1.46855 17.5857L21.4685 1.58568ZM11 1.75003C12.7777 1.75003 14.5024 2.70932 16.0173 4.02574L13.4006 6.11909C12.7506 5.57707 11.9134 5.25003 11 5.25003C8.92896 5.25003 7.25003 6.92896 7.25003 9.00003C7.25003 9.61541 7.39871 10.1971 7.66192 10.71L4.88803 12.9292C4.06702 12.0746 3.36802 11.1868 2.82974 10.4369C2.20595 9.56801 2.08694 9.35854 2.08694 9.00001C2.08695 8.64149 2.206 8.43195 2.82995 7.56281C3.65922 6.40768 4.86351 4.93417 6.30203 3.75634C7.74913 2.57149 9.35426 1.75003 11 1.75003ZM11 6.75003C11.4362 6.75003 11.8433 6.87383 12.1884 7.0889L8.87436 9.7401C8.79377 9.50853 8.75003 9.25964 8.75003 9.00003C8.75003 7.75739 9.75739 6.75003 11 6.75003Z" fill="#2D264B" />
														<path d="M19.3954 5.39079C19.1332 5.07006 18.6608 5.02255 18.34 5.28467C18.0193 5.54679 17.9718 6.01928 18.2339 6.34001C18.5844 6.76888 18.8981 7.18396 19.17 7.56273C19.7941 8.43194 19.9131 8.6415 19.9131 9.00002C19.9131 9.35855 19.7941 9.56809 19.1701 10.4372C18.3408 11.5924 17.1365 13.0659 15.698 14.2437C14.2509 15.4286 12.6458 16.25 11 16.25C9.59522 16.25 8.21821 15.6521 6.93756 14.7322C6.60113 14.4906 6.13252 14.5674 5.89088 14.9038C5.64923 15.2403 5.72607 15.7089 6.0625 15.9505C7.48703 16.9737 9.16761 17.75 11 17.75C13.141 17.75 15.0768 16.691 16.6483 15.4043C18.2284 14.1106 19.5204 12.5214 20.3886 11.312L20.4602 11.2124C20.9829 10.4862 21.4131 9.88837 21.4131 9.00002C21.4131 8.11167 20.9829 7.51382 20.4602 6.78754L20.3886 6.68796C20.1009 6.28725 19.7682 5.84696 19.3954 5.39079Z" fill="#2D264B" />
														<path d="M14.75 9.00003C14.75 8.58581 14.4142 8.25003 14 8.25003C13.5858 8.25003 13.25 8.58581 13.25 9.00003C13.25 10.2427 12.2427 11.25 11 11.25C10.5858 11.25 10.25 11.5858 10.25 12C10.25 12.4142 10.5858 12.75 11 12.75C13.0711 12.75 14.75 11.0711 14.75 9.00003Z" fill="#2D264B" />
													</svg>
												</>
											}
										</div>
									</div>
									<h2 className="text-yankeesBlue font-bold">{data?.card_number && data?.card_number !== "" ? <>{viewNumber ? data.card_number : `********${(data.card_number).toString().substr(-4)}`}</> : ""}</h2>
									{/* <h2 className="text-yankeesBlue font-bold">{data?.card_number && data?.card_number !== "" ? <>********{(data.card_number).toString().substr(-4)}</> : ""}</h2> */}
								</div>
								<div className="w-full md:w-1/3 mb-3 md:mb-0">
									<span className="text-base md:text-lg xl:text-xl font-semibold text-lightGray mb-3">Bank name</span>
									<h2 className="text-yankeesBlue font-bold">{data.card_bank_name}</h2>
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap items-center- justify-start -mx-3 md:mb-[50px]">
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-yankeesBlue mb-3">{data.card_network}</h2>
									<span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
										Card Network
									</span>
								</div>
							</div>
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-yankeesBlue mb-3">{moment(data.card_exp_date).format('ll')}</h2>
									<span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
										Card Expiry Date
									</span>
								</div>
							</div>
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-yankeesBlue mb-3">{data.card_cvv}</h2>
									<span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
										Card CVV
									</span>
								</div>
							</div>
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-yankeesBlue mb-3">{data.card_category}</h2>
									<span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
										Card Category
									</span>
								</div>
							</div>
						</div>
						{/* <div className="relative flex flex-wrap items-center- justify-start -mx-3 md:mb-[50px]">
							
						</div> */}
					</div>
					<Modal isOpen={isPhotoViewPopUpOpen}>
						<SinglePhotoView handleClose={setIsPhotoViewPopUpOpen} id2={id2} />
					</Modal>
					<Modal isOpen={isPayPopUpOpen}>
						<PaymentDetails handleClose={setIsPayPopUpOpen} payerData={card} />
					</Modal>
					<Modal isOpen={dueAmountPop}>
						<CardHolderDueAmount handleClose={setDueAmountPop} dueData={dueData} />
					</Modal>
				</div>
			}
		</>
	)
}
