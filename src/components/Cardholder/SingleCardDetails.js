import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { baseImageUrl, baseurl } from '../../api/baseurl';
import { ProgressSpinner } from 'primereact/progressspinner';
import Modal from '../../common/Modals/Modal';
import SinglePhotoView from '../Admin/Popup/SinglePhotoView';
import DemoImage from "../../assets/images/profile.png";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import PaymentDetails from '../Admin/Popup/DepositPaymentDetails';
import { getSingleCard } from '../Cards/CardSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function SingleCardDetails() {


	const dispatch = useDispatch()
	const user_id = localStorage.getItem("useridForcard");
	const card_id = localStorage.getItem("card_id");
	const [requestDetails, setRequestDetails] = useState([]);
	const [singleCardDetail, setSingleCardDetail] = useState({})
	const [open, setOpen] = useState(false)


	// const { state } = useLocation();
	// const { data } = state;
	const [data, setData] = useState({});
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [cardDetails, setCardDetails] = useState({});
	const [isPhotoViewPopUpOpen, setIsPhotoViewPopUpOpen] = useState(false);
	const [isPayPopUpOpen, setIsPayPopUpOpen] = useState(false);
	const [payerData, setPayerData] = useState({});
	const [id2, setId2] = useState({});
	let totalDueAmount = 0;
	// const user = localStorage.getItem("user");
	// const header = {
	// 	Authorization: `Bearer ${JSON.parse(user)?.token}`,
	// };
	// const getRequestDeails = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			`${baseurl}/api/paymentRequest/payment-request-list?card_id=${card_id}`,
	// 			{ headers: header }
	// 		);
	// 		if (response.data.IsSuccess) {
	// 			setRequestDetails(response.data.Data);
	// 			setLoading(false);
	// 		} else {
	// 			toast.error(response.data.Message);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };
	// requestDetails.map((r, i) => <div key={i}>{totalDueAmount += r.due_amount}</div>)


	const getCardDetails = async () => {
		const payload = {
			userid: user_id,
			cardid: card_id
		}
		try {
			const response = await dispatch(getSingleCard(payload))
			if (response?.payload?.data?.IsSuccess) {
				setSingleCardDetail({ ...response?.payload?.data?.Data })
				toast.success(response?.payload?.data?.Message)
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		// getRequestDeails();
		getCardDetails();
	}, []);


	const columns = [
		// {
		// 	header: 'Holder Name', field: (row) => {
		// 		return <div className="flex items-center">
		// 			{/* <div className="w-12 h-12 rounded-full overflow-hidden">
		// 				<img src={DemoImage} alt="" className='w-full h-full overflow-hidden' />
		// 			</div> */}
		// 			{/* <div className="pl-4"> */}
		// 				<span className="text-lg font-bold text-[#2D3643] block">{row.card.card_holder_name}</span>
		// 			{/* </div> */}
		// 		</div>
		// 	},
		// },
		// {
		// 	header: 'Card', field: (row) => {
		// 		return <div className="text-lg font-semibold text-yankeesBlue">
		// 			********{(row.card.card_number).toString().substr(-4)}
		// 		</div>
		// 	}
		// },
		{
			header: 'Category', field: (row) => {

				return <div className="flex items-center space-x-3">
					<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4.00002 11.5413C3.65484 11.5413 3.37502 11.8212 3.37502 12.1663C3.37502 12.5115 3.65484 12.7913 4.00002 12.7913H5.66669C6.01187 12.7913 6.29169 12.5115 6.29169 12.1663C6.29169 11.8212 6.01187 11.5413 5.66669 11.5413H4.00002Z" fill="#1E293B" />
						<path d="M8.16669 11.5413C7.82151 11.5413 7.54169 11.8212 7.54169 12.1663C7.54169 12.5115 7.82151 12.7913 8.16669 12.7913H11.5C11.8452 12.7913 12.125 12.5115 12.125 12.1663C12.125 11.8212 11.8452 11.5413 11.5 11.5413H8.16669Z" fill="#1E293B" />
						<path fillRule="evenodd" clipRule="evenodd" d="M13.4542 0.766851C12.7339 0.708001 11.8378 0.708004 10.6947 0.708008H7.30539C6.16229 0.708004 5.26609 0.708001 4.5458 0.766851C3.81235 0.826776 3.20642 0.950823 2.65798 1.23027C1.75637 1.68966 1.02334 2.42269 0.563948 3.3243C0.161637 4.11388 0.0755182 5.04082 0.0510079 6.32104C0.0416871 6.80789 0.0416871 7.36238 0.0416871 7.99485V8.02764C0.0416832 9.17074 0.0416802 10.0669 0.10053 10.7872C0.160456 11.5207 0.284503 12.1266 0.563948 12.675C1.02334 13.5767 1.75637 14.3097 2.65798 14.7691C3.20642 15.0485 3.81235 15.1726 4.5458 15.2325C5.26608 15.2913 6.16226 15.2913 7.30533 15.2913H10.6947C11.8377 15.2913 12.734 15.2913 13.4542 15.2325C14.1877 15.1726 14.7936 15.0485 15.3421 14.7691C16.2437 14.3097 16.9767 13.5767 17.4361 12.675C17.7155 12.1266 17.8396 11.5207 17.8995 10.7872C17.9584 10.0669 17.9584 9.17077 17.9584 8.0277V7.99484C17.9584 7.36238 17.9584 6.80788 17.949 6.32104C17.9245 5.04082 17.8384 4.11388 17.4361 3.3243C16.9767 2.42269 16.2437 1.68966 15.3421 1.23027C14.7936 0.950823 14.1877 0.826776 13.4542 0.766851ZM3.22547 2.34403C3.56833 2.16933 3.99144 2.06631 4.64759 2.0127C5.31104 1.95849 6.15626 1.95801 7.33335 1.95801H10.6667C11.8438 1.95801 12.689 1.95849 13.3525 2.0127C14.0086 2.06631 14.4317 2.16933 14.7746 2.34403C15.441 2.68358 15.9828 3.22538 16.3223 3.89179C16.5341 4.30736 16.6354 4.82648 16.6786 5.70801H1.32141C1.36462 4.82648 1.46596 4.30736 1.67771 3.89179C2.01726 3.22538 2.55906 2.68358 3.22547 2.34403ZM1.29169 7.99967C1.29169 7.62071 1.2917 7.27528 1.2936 6.95801H16.7064C16.7083 7.27528 16.7084 7.62071 16.7084 7.99967C16.7084 9.17676 16.7079 10.022 16.6537 10.6854C16.6001 11.3416 16.497 11.7647 16.3223 12.1076C15.9828 12.774 15.441 13.3158 14.7746 13.6553C14.4317 13.83 14.0086 13.933 13.3525 13.9866C12.689 14.0409 11.8438 14.0413 10.6667 14.0413H7.33335C6.15626 14.0413 5.31104 14.0409 4.64759 13.9866C3.99144 13.933 3.56833 13.83 3.22547 13.6553C2.55906 13.3158 2.01726 12.774 1.67771 12.1076C1.50301 11.7647 1.39999 11.3416 1.34638 10.6854C1.29217 10.022 1.29169 9.17676 1.29169 7.99967Z" fill="#1E293B" />
					</svg>
					<div className="text-lg font-semibold text-yankeesBlue capitalize">
						{row.card.card_category}
					</div>
				</div>
			}
		},
		// {
		// 	header: 'Bank Name', field: (row) => {
		// 		return <div className="text-lg font-semibold text-yankeesBlue">{row.card.card_bank_name}</div>
		// 	}
		// },
		{
			header: 'Status', field: (row) => {
				return <>{row.payment_status === false ? <div className="text-xs inline-block font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Unpaid</div> : <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">Paid</div>
				}
					{/* <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">Paid</div> */}
					{/* div className="text-xs font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Pending</div> //pending box */}
				</>
			}
		},
		{
			header: 'Total Due', field: (row) => {
				return <>{row.payment_status === false ? <div className="text-lg font-semibold text-[#E52B2B]">₹ {row.due_amount}</div> : <div className="text-lg font-semibold text-[#097C69]">₹ {row.due_amount}</div>}</>
			}
		},
		{
			header: 'Due Date', field: (row) => {
				return <div className="text-lg font-semibold text-yankeesBlue">
					{moment(row.due_date).format('ll')}
				</div>
			}
		},
		{
			header: 'Payment Method', field: (row) => {
				return <div className="text-lg font-semibold text-yankeesBlue">{row.payment_method}</div>
			}
		},
		{
			header: '', field: (row) => {
				return <> {row.payment_status === false ? <button type='button' onClick={(e) => { e.stopPropagation(); setPayerData(row); setIsPayPopUpOpen(true); }} className="relative text-base font-semibold text-white inline-block bg-[#8FB50B] rounded-lg px-3 py-2">Pay</button> : <button type='button' className="relative text-base font-semibold text-white inline-block bg-[#8FB50B] bg-opacity-50 rounded-lg px-3 py-2 cursor-not-allowed">Paid</button>} </>
			}
		},
	];

	return (
		<>
			{loading ? (
				<div className="flex items-center justify-center">
					<ProgressSpinner
						style={{ width: "50px", height: "50px" }}
						strokeWidth="8"
						fill="var(--surface-ground)"
						animationDuration=".5s"
					/>
				</div>
			) : (
				<div className="wrapper min-h-full flex flex-col">
					<div className="">
						<div className="sm:flex items-center justify-between mb-8 md:mb-12">
							<div className="flex items-center">
								<svg
									onClick={() => navigate("../singlecardholdercardlist")}
									width="24"
									height="16"
									viewBox="0 0 24 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z"
										fill="#0F172A"
										stroke="#0F172A"
										strokeLinecap="round"
									/>
								</svg>
								<h3 className="text-yankeesBlue leading-8 pl-7">
									{cardDetails.card_holder_name} Details
								</h3>
							</div>
							<div className="flex justify-end space-x-3 mt-2">
								<button
									to="createaccount"
									className="btn-secondary flex"
									onClick={() => navigate("../editcardholdercard")}
								>
									<svg
										className="mr-3"
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z"
											fill="white"
											stroke="white"
											strokeLinecap="round"
										/>
									</svg>
									Edit Details
								</button>
								<button to='createaccount' className="btn-secondary flex" onClick={() => { setOpen(true) }}>View Card Photo</button>
							</div>
							{/* </div> */}
						</div>
						<div className="bg-lightWhite rounded-xl p-5 md:py-6 md:px-12 mb-7">
							<div className="w-full flex flex-wrap sm:flex-nowrap justify-start md:justify-center items-center md:space-x-5">
								<div className="w-full sm:w-1/2 md:w-1/3 mb-3 sm:mb-0">
									<span className="text-sm sm:text-base 2xl:text-xl font-bold text-lightGray block whitespace-nowrap">
										Card holder name
									</span>
									<span className="text-base md:text-2xl 2xl:text-4xl font-bold text-yankeesBlue block">
										{singleCardDetail?.card_holder}
									</span>
								</div>
								<div className="w-full sm:w-1/2 md:w-1/3 pl-0 sm:pl-3 md:pl-0 mb-3 md:mb-0">
									<span className="text-sm sm:text-base 2xl:text-xl font-semibold text-lightGray mb-3 inline-block">
										Card number
									</span>
									<h2 className="text-base md:text-2xl 2xl:text-4xl text-yankeesBlue font-bold">
										{singleCardDetail?.card_number && singleCardDetail?.card_number !== "" ? (
											<>********{singleCardDetail.card_number.toString().substr(-4)}</>
										) : (
											""
										)}
									</h2>
								</div>
								<div className="w-full sm:w-1/2 md:w-1/3 pl-0 sm:pl-3 md:pl-0 mb-3 md:mb-0">
									<span className="text-sm sm:text-base 2xl:text-xl font-semibold text-lightGray mb-3 inline-block">
										Bank name
									</span>
									<h2 className="text-base md:text-2xl 2xl:text-4xl text-yankeesBlue font-bold">
										{singleCardDetail.bank_name}
									</h2>
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap items-center- justify-start mb-[50px]">
							<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-[#ed4d3714] border border-transparent py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-[#ED4D37] mb-3">
										₹ {singleCardDetail.due_amount}
									</h2>
									<span className="text-[#64748B] text-base 2xl:text-xl font-semibold">
										Total Due Amount
									</span>
								</div>
							</div>
							{/* <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
								<div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
									<h2 className="text-yankeesBlue mb-3">
										{moment(cardDetails.due_date).format("ll")}
									</h2>
									<span className="text-[#64748B] text-base 2xl:text-xl font-semibold">
										Due Date
									</span>
								</div>
							</div> */}
						</div>



						{requestDetails.length > 0 ?
							<div className="card">
								<DataTable value={requestDetails} selectionMode="single" columnResizeMode={"expand"} resizableColumns={true} scrollable={true}
									paginator rows={5}>
									{columns.map((col, i) => (
										<Column className="relative" key={col.field} field={col.field} header={col.header} />
									))}
								</DataTable>
							</div>
							: <div className="bg-[#F3F4F6] border border-[#CBD5E1] rounded-md text-center p-8 space-y-2 ng-star-inserted">
								<h3 className="w-full text-[#64748B] text-2xl:text-base xl font-semibold">No payment request yet.</h3>
							</div>}
					</div>
					<Modal isOpen={isPhotoViewPopUpOpen}>
						<SinglePhotoView handleClose={setIsPhotoViewPopUpOpen} id2={id2} />
					</Modal>
					<Modal isOpen={isPayPopUpOpen}>
						<PaymentDetails handleClose={setIsPayPopUpOpen} payerData={payerData} />
					</Modal>
					<Lightbox
						open={open}
						close={() => setOpen(false)}
						slides={[
							{ src: `${baseImageUrl}/${singleCardDetail.card_photo_back}` },
							{ src: `${baseImageUrl}/${singleCardDetail.card_photo_front}` },
						]}
					/>
				</div>
			)}
		</>
	);
}
