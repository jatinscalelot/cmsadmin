import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ProgressSpinner } from 'primereact/progressspinner';
import Modal from '../../common/Modals/Modal';
import PaymentDetails from '../Admin/Popup/DepositPaymentDetails';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
function DepositRequests({ paymentRequestData, setReloade }) {

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [paymentRequests, setPaymentRequests] = useState([]);
	const [isPayPopUpOpen, setIsPayPopUpOpen] = useState(false);
	const [payerData, setPayerData] = useState({});
	let totalDueAmount = 0;

	localStorage.removeItem("card_id");
	const user = localStorage.getItem("user");
  const header = {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  };
	const getPaymentRequests = () => {

		setPaymentRequests((paymentRequestData).filter((request) => (request.payment_status === false) && request.payment_method==="Deposit"));
		setLoading(false);

	}
	// paymentRequests.map((amount) => totalDueAmount += amount.due_amount);

	useEffect(() => {
		getPaymentRequests();
	}, []);

	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});
	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		let _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};

	const initFilters = () => {
		setFilters({
			global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		});
		setGlobalFilterValue('');
	};

	const clearFilter = () => {
		initFilters();
	};

	const renderHeader = () => {
		return (
			<div className={"flex items-center justify-between dataTables search_field w-fit"}>
                <span className="p-input-icon-left bg-white">
                    <i className="pi pi-search" />
                    <InputText className='bg-white search_input ' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />

                </span>
                <svg onClick={clearFilter} className="w-7 h-7" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Close"><rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"></rect><line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#6c757d" strokeWidth="1.5" strokeLinecap="round"></line><line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#6c757d" strokeWidth="1.5" strokeLinecap="round"></line></g></g></svg>
                {/* <div className='flex space-x-3 items-center'>
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                </div> */}
            </div>
		);
	};
	const headerf = renderHeader();
	const columns = [
		{
			header: 'Holder Name', field: (row) => {
				return <div className="flex items-center">
					{/* <div className="w-12 h-12 rounded-full overflow-hidden">
						<img src={DemoImage} alt="" className='w-full h-full overflow-hidden' />
					</div> */}
					{/* <div className="pl-4"> */}
					<span className="text-lg font-bold text-[#2D3643] block">{row.card.card_holder_name}</span>
					{/* </div> */}
				</div>
			},
		},
		{
			header: 'Card', field: (row) => {
				return <div className="text-lg font-semibold text-yankeesBlue">
					********{(row.card.card_number).toString().substr(-4)}
				</div>
			}
		},
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
		{
			header: 'Bank Name', field: (row) => {
				return <div className="text-lg font-semibold text-yankeesBlue">{row.card.card_bank_name}</div>
			}
		},
		{
			header: 'Status', field: (row) => {
				return (row.payment_status === false ? <div className="text-xs inline-block font-semibold text-[#ED4D37] bg-[#f3e7e7] rounded-lg px-3 py-2">Request</div> : <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">Paid</div>)
			}
		},
		{
			header: 'Total Due', field: (row) => {
				return <div className="text-lg font-semibold text-[#E52B2B]">
					₹ {row.due_amount}
				</div>
			}
		},
		{
			header: 'Due Date', field: (row) => {
				return <div className="text-lg font-semibold text-yankeesBlue">
					{moment(row.due_date).format('ll')}
				</div>
			}
		},
		// {
		// 	header: 'Payment Method', field: (row) => {
		// 		return <div className="text-lg font-semibold text-yankeesBlue">{row.payment_method}</div>
		// 	}
		// },
		{
			header: '', field: (row) => {
				return <div onClick={(e) => { e.stopPropagation(); setPayerData(row); setIsPayPopUpOpen(true); }} className="relative text-base font-semibold text-white inline-block bg-[#8FB50B] rounded-lg px-3 py-2">Pay</div>
			}
		},
	];
	return (
		<>
			{loading ?
				<div className="flex items-center justify-center">
					<ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
				</div> :
				paymentRequests.length > 0 ?
					<DataTable className='relative' value={paymentRequests}
						filters={filters}
						globalFilterFields={['card.card_holder_name', 'card.card_number', 'card.card_bank_name', 'due_date']}
						header={headerf}
						// selectionMode="single"
						// onSelectionChange={(col) => { localStorage.setItem("request_id", col.value.request_id); navigate("singlepaymentrequestdetails") }} 
						columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5}>
						{columns.map((col, i) => (

							<Column key={col.field} field={col.field} header={col.header} />

						))}
					</DataTable>
					: <div className="bg-[#F3F4F6] border border-[#CBD5E1] rounded-md text-center p-8 space-y-2 ng-star-inserted">
					<h3 className="w-full text-[#64748B] text-2xl:text-base xl font-semibold">You have no deposit request yet.</h3>
				</div>
			}
			<Modal isOpen={isPayPopUpOpen}>
				<PaymentDetails handleClose={setIsPayPopUpOpen} payerData={payerData} setReloade={setReloade} />
			</Modal>
		</>
	)
}

export default DepositRequests
