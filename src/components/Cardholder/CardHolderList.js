import React, { useState, useEffect, useRef } from 'react'
// import { DataTable } from 'primereact/datatable';
// import DataTable from 'react-data-table-component';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Column } from 'primereact/column';
// import { ProductService } from '../service/ProductService';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
// import 'primeflex/primeflex.css';
import DemoImage from "../../assets/images/profile.png"
import { baseImageUrl, baseurl } from '../../api/baseurl';
import axios from 'axios';
import SingleCardHolderDetail from './SingleCardHolderDetail';
// import { ToastContainer, toast } from 'react-toastify';
import Modal from '../../common/Modals/Modal';
import SinglePhotoView from '../Admin/Popup/SinglePhotoView';
import CreateAccount from './CreateAccount';
import { useDispatch } from 'react-redux';
import { disApproveUser, getAllUser } from './UserSlice';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FsLightbox from 'fslightbox-react';
import { toast } from 'sonner';
import { InputSwitch } from 'primereact/inputswitch';
import ApproveCommisionPopup from '../Admin/Popup/ApproveCommisionPopup';

function CardHolderList() {
	// const [products, setProducts] = useState([]);
	// const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
	// const productService = new ProductService();
	// const [users, setUsers] = useState([]);
	const [checked, setChecked] = useState()
	const [open, setOpen] = React.useState(false);
	const [totalCardHolders, setTotalCardHolders] = useState(0);
	const [imagePreview, setImagePreview] = useState("")
	const [searchUser, setSearchUser] = useState("")
	const [loading, setLoading] = useState(false);
	const [switchLoader, setSwitchLoader] = useState(false)
	const [oneUser, setOneUser] = useState({});
	const [isSingleUserPopUpOpen, setIsSingleUserPopUpOpen] = useState(false);
	const [appprovePopupOpen, setAppprovePopupOpen] = useState(false)
	const [user, setUser] = useState({})

	const [id, setId] = useState();
	const dispatch = useDispatch()
	const [toggler, setToggler] = useState(false);
	// const user = localStorage.getItem("user");
	const navigate = useNavigate();
	const [userList, setUserList] = useState([])
	const zoomRef = useRef(null);

	const getUserList = async () => {

		const payload = {
			page: 1,
			limit: 100000,
			search: searchUser
		}
		setLoading(false)

		const response = await dispatch(getAllUser(payload))
		if (response?.payload?.data?.IsSuccess) {
			setUserList(response?.payload?.data?.Data?.docs)
		}
		setLoading(false)
	}
	useEffect(() => {
		getUserList()
		localStorage.removeItem("useridForcard")
	}, [searchUser, appprovePopupOpen])



	const approveChange = async (e, row) => {

		if (e.value == true && e.value) {
			setAppprovePopupOpen(e.value)
		} else {
			if (row.is_approved == true) {

				const response = await dispatch(disApproveUser({ userid: row._id }))

				if (response?.payload?.data?.IsSuccess) {
					toast.success(response?.payload?.data?.Message)
					getUserList()
				}
			}
		}
	}

	// localStorage.removeItem("user_id");
	// localStorage.removeItem("card_id");
	// localStorage.removeItem("request_id");

	// useEffect(() => {
	//     productService.getProductsSmall().then(data => setProducts(data));
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps



	// const user = localStorage.getItem("user");
	// const header = {
	// 	Authorization: `Bearer ${JSON.parse(user)?.token}`,
	// };
	// const getCardHolderList = async () => {
	// 	try {
	// 		const response = await axios.get(`${baseurl}/api/user/user-list`, { headers: header });
	// 		if (response.data.IsSuccess) {
	// 			setTotalCardHolders(response.data.Data.length);
	// 			setCardHolders(response.data.Data);
	// 			setLoading(false);
	// 		} else {
	// 			toast.error(response.data.Message);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
	// useEffect(() => {
	// 	getCardHolderList();
	// }, [update]);

	// const deleteCardHolder = async (id) => {
	// 	try {
	// 		const response = await axios.delete(`${baseurl}/api/user/admin-delete-user?user_id=${id}`, { headers: header });
	// 		if (response.data.IsSuccess) {
	// 			setUpdate(!update);
	// 			toast.success(response.data.Message);
	// 		} else {
	// 			toast.error(response.data.Message);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }


	const columns = [
		{
			header: 'Holder Name', field: (row) => {
				return (
					<div className="flex items-center gap-2">
						{/* <div className='w-8 h-8 overflow-hidden rounded-full'> */}
						<div className='w-8 h-8 object-cover rounded-full overflow-hidden'>
							<img alt="Demom Images" src={`${baseImageUrl}/${row?.profile_photo}`} className='w-full h-full object-cover rounded-full overflow-hidden' />
						</div>
						{/* </div> */}
						<span>{`${row.fname} ${row.lname}`.toUpperCase()}</span>
					</div>
				);
			},
		},
		// { name: 'first_name', header: 'Holder Name', field: row => row.first_name, },
		{
			header: "Email", field: row => <div className="flex">
				<span className="text-lg text-yankeesBlue font-semibold block">{row.email}</span>
			</div>
		},
		{
			header: 'Phone Number', field: row =>
				<div className="flex">
					<span className="text-lg text-yankeesBlue font-semibold block">{row.mobile}</span>
				</div>
		},
		{
			header: 'Aadhar Front Card', field: row =>
				<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full px-2" onClick={(e) => { setId(row.aadhar_card_front); setOpen(true); setImagePreview(row.aadhar_card_front); e.stopPropagation(); }}>
					<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
					</svg>
					<span className='text-xs font-semibold text-[#1E293B]'>View</span>
				</div>
		},
		{
			header: 'Aadhar Back Card', field: row =>
				<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full px-2" onClick={(e) => { setId(row.aadhar_card_back); setOpen(true); setImagePreview(row.aadhar_card_back); e.stopPropagation(); }}>
					<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
					</svg>
					<span className='text-xs font-semibold text-[#1E293B]'>View</span>
				</div>
		},
		{
			header: 'Pan Card', field: row =>
				<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full px-2" onClick={(e) => { setId(row.pan_card); setOpen(true); setImagePreview(row.pan_card); e.stopPropagation(); }}>
					<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
					</svg>
					<span className='text-xs font-semibold text-[#1E293B]'>View</span>
				</div>
		},
		{
			header: 'Cheque', field: row =>
				<div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full px-2" onClick={(e) => {
					setImagePreview(row.cheque)

					setOpen(true);
					setToggler(true); e.stopPropagation();
				}}>
					<svg width="12" height="10" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.8529 8.25006L14.4622 8.68744L13.8529 8.25006ZM13.8529 5.75059L13.2437 6.18798L13.8529 5.75059ZM14.4421 7.00033H13.6921H14.4421ZM2.14716 8.25006L2.75641 7.81267L2.14716 8.25006ZM2.14716 5.75059L1.5379 5.31321L2.14716 5.75059ZM1.55798 7.00033H0.807983H1.55798ZM1.5379 8.68745C2.12319 9.50273 2.99916 10.5815 4.07615 11.4633C5.14456 12.3381 6.49021 13.0837 8.00004 13.0837V11.5837C6.98539 11.5837 5.97042 11.0756 5.02642 10.3027C4.09101 9.53679 3.30277 8.57372 2.75641 7.81267L1.5379 8.68745ZM8.00004 13.0837C9.50988 13.0837 10.8555 12.3381 11.9239 11.4633C13.0009 10.5815 13.8769 9.50273 14.4622 8.68744L13.2437 7.81267C12.6973 8.57372 11.9091 9.53679 10.9737 10.3027C10.0297 11.0756 9.01469 11.5837 8.00004 11.5837V13.0837ZM14.4622 5.31321C13.8769 4.49792 13.0009 3.41919 11.9239 2.53737C10.8555 1.66258 9.50988 0.916992 8.00004 0.916992V2.41699C9.01469 2.41699 10.0297 2.92504 10.9737 3.69797C11.9091 4.46386 12.6973 5.42693 13.2437 6.18798L14.4622 5.31321ZM8.00004 0.916992C6.49021 0.916992 5.14456 1.66258 4.07615 2.53737C2.99916 3.41919 2.12319 4.49792 1.5379 5.31321L2.75641 6.18798C3.30277 5.42693 4.09101 4.46386 5.02642 3.69797C5.97042 2.92504 6.98539 2.41699 8.00004 2.41699V0.916992ZM14.4622 8.68744C14.8202 8.18878 15.1921 7.71441 15.1921 7.00033H13.6921C13.6921 7.14433 13.6712 7.21709 13.2437 7.81267L14.4622 8.68744ZM13.2437 6.18798C13.6712 6.78357 13.6921 6.85632 13.6921 7.00033H15.1921C15.1921 6.28624 14.8202 5.81187 14.4622 5.31321L13.2437 6.18798ZM2.75641 7.81267C2.32884 7.21709 2.30798 7.14433 2.30798 7.00033H0.807983C0.807983 7.71441 1.17991 8.18878 1.5379 8.68745L2.75641 7.81267ZM1.5379 5.31321C1.17991 5.81187 0.807983 6.28624 0.807983 7.00033H2.30798C2.30798 6.85632 2.32884 6.78357 2.75641 6.18798L1.5379 5.31321ZM5.25004 7.00033C5.25004 8.51911 6.48126 9.75033 8.00004 9.75033V8.25033C7.30969 8.25033 6.75004 7.69068 6.75004 7.00033H5.25004ZM8.00004 9.75033C9.51883 9.75033 10.75 8.51911 10.75 7.00033H9.25004C9.25004 7.69068 8.6904 8.25033 8.00004 8.25033V9.75033ZM10.75 7.00033C10.75 5.48154 9.51883 4.25033 8.00004 4.25033V5.75033C8.6904 5.75033 9.25004 6.30997 9.25004 7.00033H10.75ZM8.00004 4.25033C6.48126 4.25033 5.25004 5.48154 5.25004 7.00033H6.75004C6.75004 6.30997 7.30969 5.75033 8.00004 5.75033V4.25033Z" fill="#1E293B" />
					</svg>
					<span className='text-xs font-semibold text-[#1E293B]'>View</span>
				</div>
		},
		{
			header: 'Commission', field: row =>
				<div className="flex">
					<span className="text-lg text-yankeesBlue font-semibold block">{row?.commission || 0}%</span>
				</div>
		},
		{
			header: 'Approve', field: row =>
				<div className="flex"   >
					{/* <input type='checkbox' className='' /> */}
					{switchLoader ? <ProgressSpinner style={{ width: '25px', height: '25px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" /> : <InputSwitch checked={row.is_approved} onChange={(e) => { approveChange(e, row); setUser(row) }} />}
				</div>
		},
		{
			header: 'Cards', field: row =>
				// <div className="flex justify-center items-center gap-3 border border-[#1E293B] rounded-lg py-1.5 max-w-[78px] w-full" onClick={(e) => { localStorage.setItem("user_id", row.id); navigate("../cardholder/singlecardholdercardlist"); e.stopPropagation(); }}>
				<div className='relative'>
					<button disabled={!row.is_approved} to='createaccount' className={`flex justify-center items-center gap-3  rounded-lg py-1.5 max-w-[78px] w-full btn-secondary`} onClick={(e) => { localStorage.setItem("useridForcard", row.id); navigate("../cardholder/singlecardholdercardlist"); e.stopPropagation(); }}>
						View
					</button>
					{
						!row?.is_approved &&
						<span className='block absolute inset-0 bg-black/20 border-none rounded-lg cursor-not-allowed'></span>
					}
				</div>

			// <button disabled={!row.is_approved} to='createaccount' className={`flex justify-center items-center gap-3  rounded-lg py-1.5 max-w-[78px] w-full ${row.is_approved == true ? "btn-primary" : "btn-disable"}`} onClick={(e) => { localStorage.setItem("useridForcard", row.id); navigate("../cardholder/singlecardholdercardlist"); e.stopPropagation(); }}>
			// 	View
			// </button>
			// </div>
		},
		{
			header: 'Actions', field: (row) => (
				// return (
				<div className="flex justify-start items-center">
					<button type="button" className="p-3" onClick={(e) => {
						localStorage.setItem("user_id", row.id);
						//  navigate('singlecardholderdetail');
						e.stopPropagation();
					}}>
						<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.06107 19.2164L3.50191 18.6096H3.50191L3.06107 19.2164ZM1.95491 18.1102L1.34815 18.5511L1.34815 18.5511L1.95491 18.1102ZM16.9389 19.2164L16.4981 18.6096H16.4981L16.9389 19.2164ZM18.0451 18.1102L17.4383 17.6694L18.0451 18.1102ZM1.95491 4.23238L1.34815 3.79155L1.34815 3.79155L1.95491 4.23238ZM3.06107 3.12623L3.50191 3.73299V3.73299L3.06107 3.12623ZM8.00899 2.92846C8.42317 2.9235 8.75491 2.58371 8.74995 2.16953C8.74498 1.75534 8.40519 1.42361 7.99101 1.42857L8.00899 2.92846ZM19.7427 13.1803C19.7477 12.7661 19.416 12.4263 19.0018 12.4214C18.5876 12.4164 18.2478 12.7481 18.2428 13.1623L19.7427 13.1803ZM10.7976 15.1758L10.7147 14.4303L10.7976 15.1758ZM6.67777 14.8783L6.14744 15.4086L6.14744 15.4086L6.67777 14.8783ZM6.3803 10.7585L7.12571 10.8413L6.3803 10.7585ZM7.5274 8.3718L6.99707 7.84147L7.5274 8.3718ZM6.64293 9.41572L5.96696 9.09083L5.96695 9.09083L6.64293 9.41572ZM13.1843 14.0287L13.7146 14.559L13.1843 14.0287ZM12.1403 14.9131L12.4652 15.5891H12.4652L12.1403 14.9131ZM10 19.4213C8.10843 19.4213 6.74999 19.4203 5.69804 19.3063C4.66013 19.1939 4.00992 18.9787 3.50191 18.6096L2.62024 19.8232C3.42656 20.409 4.37094 20.6713 5.53648 20.7976C6.68798 20.9223 8.14184 20.9213 10 20.9213V19.4213ZM0.25 11.1713C0.25 13.0295 0.248971 14.4833 0.373728 15.6348C0.500006 16.8004 0.762324 17.7448 1.34815 18.5511L2.56168 17.6694C2.19259 17.1614 1.97745 16.5112 1.865 15.4733C1.75103 14.4213 1.75 13.0629 1.75 11.1713H0.25ZM3.50191 18.6096C3.14111 18.3475 2.82382 18.0302 2.56168 17.6694L1.34815 18.5511C1.70281 19.0392 2.13209 19.4685 2.62024 19.8232L3.50191 18.6096ZM10 20.9213C11.8582 20.9213 13.312 20.9223 14.4635 20.7976C15.6291 20.6713 16.5734 20.409 17.3798 19.8232L16.4981 18.6096C15.9901 18.9787 15.3399 19.1939 14.302 19.3063C13.25 19.4203 11.8916 19.4213 10 19.4213V20.9213ZM17.4383 17.6694C17.1762 18.0302 16.8589 18.3475 16.4981 18.6096L17.3798 19.8232C17.8679 19.4685 18.2972 19.0392 18.6518 18.5511L17.4383 17.6694ZM1.75 11.1713C1.75 9.27974 1.75103 7.9213 1.865 6.86936C1.97745 5.83144 2.19259 5.18123 2.56168 4.67322L1.34815 3.79155C0.762324 4.59787 0.500006 5.54225 0.373728 6.70779C0.248971 7.85929 0.25 9.31315 0.25 11.1713H1.75ZM2.62023 2.51946C2.13209 2.87412 1.70281 3.3034 1.34815 3.79155L2.56168 4.67322C2.82382 4.31242 3.14111 3.99513 3.50191 3.73299L2.62023 2.51946ZM7.99101 1.42857C5.56449 1.45766 3.89894 1.59043 2.62023 2.51946L3.50191 3.73299C4.33627 3.1268 5.50819 2.95844 8.00899 2.92846L7.99101 1.42857ZM18.2428 13.1623C18.2129 15.6631 18.0445 16.835 17.4383 17.6694L18.6518 18.5511C19.5809 17.2724 19.7137 15.6068 19.7427 13.1803L18.2428 13.1623ZM18.0257 8.12652L12.6539 13.4983L13.7146 14.559L19.0864 9.18718L18.0257 8.12652ZM8.05773 8.90213L13.4295 3.53033L12.3689 2.46967L6.99707 7.84147L8.05773 8.90213ZM10.7147 14.4303C9.54475 14.5603 8.74843 14.647 8.15674 14.6279C7.58517 14.6094 7.35441 14.4943 7.2081 14.348L6.14744 15.4086C6.68084 15.942 7.36328 16.103 8.10833 16.1271C8.83326 16.1505 9.75698 16.046 10.8804 15.9212L10.7147 14.4303ZM5.63488 10.6757C5.51006 11.7991 5.40557 12.7228 5.42898 13.4477C5.45304 14.1928 5.61405 14.8752 6.14744 15.4086L7.2081 14.348C7.06179 14.2016 6.94665 13.9709 6.9282 13.3993C6.90909 12.8076 6.99571 12.0113 7.12571 10.8413L5.63488 10.6757ZM6.99707 7.84147C6.54195 8.2966 6.18261 8.64213 5.96696 9.09083L7.31891 9.74061C7.39835 9.57533 7.53029 9.42957 8.05773 8.90213L6.99707 7.84147ZM7.12571 10.8413C7.20808 10.1 7.23947 9.90589 7.31891 9.74061L5.96695 9.09083C5.7513 9.53953 5.70596 10.036 5.63488 10.6757L7.12571 10.8413ZM12.6539 13.4983C12.1265 14.0258 11.9807 14.1577 11.8155 14.2372L12.4652 15.5891C12.9139 15.3734 13.2595 15.0141 13.7146 14.559L12.6539 13.4983ZM10.8804 15.9212C11.5201 15.8501 12.0165 15.8048 12.4652 15.5891L11.8155 14.2372C11.6502 14.3166 11.4561 14.348 10.7147 14.4303L10.8804 15.9212ZM18.0257 3.53033C18.7074 4.21199 19.1642 4.67101 19.4598 5.05849C19.7422 5.42866 19.8061 5.64413 19.8061 5.82843H21.3061C21.3061 5.1843 21.0366 4.65222 20.6523 4.14862C20.2813 3.66232 19.7381 3.12134 19.0864 2.46967L18.0257 3.53033ZM19.0864 9.18718C19.7381 8.53551 20.2813 7.99453 20.6523 7.50824C21.0366 7.00463 21.3061 6.47256 21.3061 5.82843H19.8061C19.8061 6.01272 19.7422 6.22819 19.4598 6.59836C19.1642 6.98584 18.7074 7.44486 18.0257 8.12652L19.0864 9.18718ZM19.0864 2.46967C18.4347 1.818 17.8937 1.27476 17.4074 0.903733C16.9038 0.519499 16.3718 0.25 15.7276 0.25V1.75C15.9119 1.75 16.1274 1.81383 16.4976 2.09627C16.8851 2.3919 17.3441 2.84867 18.0257 3.53033L19.0864 2.46967ZM13.4295 3.53033C14.1112 2.84867 14.5702 2.3919 14.9577 2.09627C15.3279 1.81383 15.5433 1.75 15.7276 1.75V0.25C15.0835 0.25 14.5514 0.519499 14.0478 0.903733C13.5615 1.27476 13.0206 1.818 12.3689 2.46967L13.4295 3.53033ZM19.0864 8.12652L13.4295 2.46967L12.3689 3.53033L18.0257 9.18718L19.0864 8.12652Z" fill="#0F172A" />
						</svg>

					</button>
					<button type="button" className="p-3"
					//  onClick={(e) => { deleteCardHolder(row.id); e.stopPropagation(); }}
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.5172 12.7795L19.26 12.8829L18.5172 12.7795ZM18.2549 14.6645L18.9977 14.7679L18.2549 14.6645ZM5.74514 14.6645L6.48798 14.5611L5.74514 14.6645ZM5.4828 12.7795L4.73996 12.8829L5.4828 12.7795ZM9.18365 21.7368L8.89206 22.4278L9.18365 21.7368ZM6.47508 18.5603L7.17907 18.3017L6.47508 18.5603ZM17.5249 18.5603L18.2289 18.819V18.819L17.5249 18.5603ZM14.8164 21.7368L14.5248 21.0458H14.5248L14.8164 21.7368ZM5.74664 8.92906C5.70746 8.5167 5.34142 8.21418 4.92906 8.25336C4.5167 8.29254 4.21418 8.65858 4.25336 9.07094L5.74664 8.92906ZM19.7466 9.07094C19.7858 8.65858 19.4833 8.29254 19.0709 8.25336C18.6586 8.21418 18.2925 8.5167 18.2534 8.92906L19.7466 9.07094ZM20 7.75C20.4142 7.75 20.75 7.41421 20.75 7C20.75 6.58579 20.4142 6.25 20 6.25V7.75ZM4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75V6.25ZM9.25 18C9.25 18.4142 9.58579 18.75 10 18.75C10.4142 18.75 10.75 18.4142 10.75 18H9.25ZM10.75 10C10.75 9.58579 10.4142 9.25 10 9.25C9.58579 9.25 9.25 9.58579 9.25 10H10.75ZM13.25 18C13.25 18.4142 13.5858 18.75 14 18.75C14.4142 18.75 14.75 18.4142 14.75 18H13.25ZM14.75 10C14.75 9.58579 14.4142 9.25 14 9.25C13.5858 9.25 13.25 9.58579 13.25 10H14.75ZM16 7V7.75H16.75V7H16ZM8 7H7.25V7.75H8V7ZM17.7744 12.6761L17.512 14.5611L18.9977 14.7679L19.26 12.8829L17.7744 12.6761ZM6.48798 14.5611L6.22564 12.6761L4.73996 12.8829L5.0023 14.7679L6.48798 14.5611ZM12 21.25C10.4708 21.25 9.92544 21.2358 9.47524 21.0458L8.89206 22.4278C9.68914 22.7642 10.6056 22.75 12 22.75V21.25ZM5.0023 14.7679C5.282 16.7777 5.43406 17.9017 5.77109 18.819L7.17907 18.3017C6.91156 17.5736 6.77851 16.6488 6.48798 14.5611L5.0023 14.7679ZM9.47524 21.0458C8.55279 20.6566 7.69496 19.7058 7.17907 18.3017L5.77109 18.819C6.3857 20.4918 7.48205 21.8328 8.89206 22.4278L9.47524 21.0458ZM17.512 14.5611C17.2215 16.6488 17.0884 17.5736 16.8209 18.3017L18.2289 18.819C18.5659 17.9017 18.718 16.7777 18.9977 14.7679L17.512 14.5611ZM12 22.75C13.3944 22.75 14.3109 22.7642 15.1079 22.4278L14.5248 21.0458C14.0746 21.2358 13.5292 21.25 12 21.25V22.75ZM16.8209 18.3017C16.305 19.7058 15.4472 20.6566 14.5248 21.0458L15.1079 22.4278C16.5179 21.8328 17.6143 20.4918 18.2289 18.819L16.8209 18.3017ZM6.22564 12.6761C6.00352 11.08 5.83766 9.88703 5.74664 8.92906L4.25336 9.07094C4.34819 10.069 4.51961 11.2995 4.73996 12.8829L6.22564 12.6761ZM19.26 12.8829C19.4804 11.2995 19.6518 10.069 19.7466 9.07094L18.2534 8.92906C18.1623 9.88702 17.9965 11.08 17.7744 12.6761L19.26 12.8829ZM20 6.25H4V7.75H20V6.25ZM10.75 18V10H9.25V18H10.75ZM14.75 18V10H13.25V18H14.75ZM15.25 6V7H16.75V6H15.25ZM16 6.25H8V7.75H16V6.25ZM8.75 7V6H7.25V7H8.75ZM12 2.75C13.7949 2.75 15.25 4.20507 15.25 6H16.75C16.75 3.37665 14.6234 1.25 12 1.25V2.75ZM12 1.25C9.37665 1.25 7.25 3.37665 7.25 6H8.75C8.75 4.20507 10.2051 2.75 12 2.75V1.25Z" fill="#E52B2B" />
						</svg>
					</button>
				</div>
			)
		},
	]

	return (
		<div>
			<div className="wrapper min-h-full">
				<div className="relative flex flex-wrap items-center- justify-start md:mb-[50px]">
					<div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
						<div className="bg-[#FFFFFF] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
							<h2 className="text-[#1E293B] mb-3">{userList.length}</h2>
							<span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
								Total Card Holders
							</span>
						</div>
					</div>
				</div>
				<div className="relative flex items-center justify-between pt-5 md:pt-0 pb-9">
					<h3 className="text-yankeesBlue leading-8">Card-Holder List</h3>

					<div className="flex items-center space-x-3 ml-auto">
						<div className="flex items-center bg-lightWhite border-black border px-4 py-2.5 rounded-md">
							<label htmlFor='searchUser' className='block'>
								<svg className='w-5 fill-black' xmlns="http://www.w3.org/2000/svg" version="1.1" xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 56.966 56.966" space="preserve"><g><path d="M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z" opacity="1" data-original="#000000" class=""></path></g></svg>
							</label>
							<input id='searchUser' placeholder='Search user here..' className=' outline-none ml-4 bg-lightWhite' onChange={(e) => { setSearchUser(e.target.value) }} />
						</div>
						<Link to='createaccount' className="btn-secondary flex">
							<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
							</svg>
							Create Account
						</Link>
						{/* <Link to='../dashboard/adminaddcard' className="btn-secondary flex">
						<svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
						</svg>
						Add Card
					</Link> */}
					</div>
				</div>
				{loading ?
					<div className="flex it">
						<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
					</div>
					:
					userList.length > 0 ?
						<div className="card">
							{/* <DataTable sortMode="multiple" responsiveLayout="scroll"> */}
							{/* <Column field="Holder Name" header="Holder Name" sortable></Column> */}
							{/* <Column header="Holder Name" body={representativeBodyTemplate} sortable />
					<Column field="Email" header="Email" sortable></Column>
					<Column field="Phone Number" header="Phone Number" sortable></Column>
					<Column field="Aadhar card" header="Aadhar card" body={aadharCardBodyTemplate} sortable></Column>
					<Column field="Pan Card" header="Pan Card" body={panCardBodyTemplate} sortable></Column>
					<Column field="Cheque" header="Cheque" body={ChequeBodyTemplate} sortable></Column> */}
							{/* </DataTable> */}


							<DataTable value={userList} selectionMode="single" columnResizeMode={"expand"} resizableColumns={true} scrollable={true}
								onSelectionChange={(col) => {
									localStorage.setItem("user_id", col.value.id);
									// navigate('singlecardholderdetail')
								}}
								paginator rows={5}>
								{columns.map((col, i) => (
									<Column className="relative" key={col.field} field={col.field} header={col.header} />
								))}
							</DataTable>
							{/* <DataTable value={userList} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
								<Column field="name" header="Name" style={{ width: '25%' }}></Column>
								<Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
								<Column field="company" header="Company" style={{ width: '25%' }}></Column>
								<Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
							</DataTable> */}
							{/* <DataTable columns={columns} data={cardHolders} 
					Clicked 

					// onRowClicked={(row) => navigate('singlecardholderdetail',{ state: { data: row } })}
					onRowClicked={(row) => {localStorage.setItem("user_id", row.id); navigate('singlecardholderdetail')}}
					/> */}
						</div>
						: <div className="bg-[#F3F4F6] border border-[#CBD5E1] rounded-md text-center p-8 space-y-2 ng-star-inserted">
							<h3 className="w-full text-[#64748B] text-2xl:text-base xl font-semibold">You have no users yet.</h3>
						</div>

				}
			</div>
			<Modal isOpen={isSingleUserPopUpOpen}>
				<SingleCardHolderDetail handleClose={setIsSingleUserPopUpOpen} details={oneUser} />
			</Modal>
			<Modal isOpen={appprovePopupOpen}>
				<ApproveCommisionPopup handleClose={setAppprovePopupOpen} user={user} />
			</Modal>
			{/* <Modal isOpen={isPhotoViewPopUpOpen}>
				<SinglePhotoView handleClose={setIsPhotoViewPopUpOpen} imagePreview={imagePreview} id={id} />
			</Modal> */}
			<Lightbox
				open={open}
				close={() => setOpen(false)}
				zoom={{ ref: zoomRef }}
				slides={[
					{ src: `${baseImageUrl}/${imagePreview}` },
				]}
			/>

		</div >
	)
}

export default CardHolderList
