import React, { useEffect, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DemoImage from "../../assets/images/profile.png";
import axios from 'axios';
import { baseurl } from '../../api/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from 'moment/moment';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function SingleCardHolderPayment() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const [transaction, setTransaction] = useState([]);
    const user_id = localStorage.getItem("user_id");
    const [loading2, setLoading2] = useState(true);
    const [loading1, setLoading1] = useState(true);
    
    const user = localStorage.getItem("user");
    const header = {
      Authorization: `Bearer ${JSON.parse(user)?.token}`,
    };
    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/user/user-list?id=${user_id}`, { headers: header });
            if (response.data.IsSuccess) {
                setUserData(response.data.Data[0]);
                setLoading1(false);
            } else {
                toast.error(response.data.Message);
                setLoading1(false);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }
    const getTransactions = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/transaction/all-payment-record-list?user_id=${user_id}`, { headers: header });
            if (response.data.IsSuccess) {
                // toast.success(response.data.Message);
                setLoading2(false);
                setTransaction(response.data.Data);
            } else {
                toast.error("Something went wrong!!");
            }
        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
        }
    }
    useEffect(() => {
        getUserProfile();

        getTransactions();
    }, []);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        });
        setGlobalFilterValue('');
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const getInvoice = async (requestId) => {
        const response = await axios.get(`${baseurl}/api/transaction/pdf?request_id=${requestId}`, { headers: header });
        const invoiceURL = window.URL.createObjectURL(new Blob([response.data]));
        let alink = document.createElement('a');
        alink.href = invoiceURL;
        alink.download = `${requestId}.pdf`;
        alink.click();
    }

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
            header: 'Payment To', field: (row) => {
                return <div className="flex">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img src={row?.user.profile_pic && row?.user.profile_pic !== "" ? row?.user.profile_pic : DemoImage} alt="" className='w-full h-full overflow-hidden' />
                    </div>
                    <div className="pl-4">
                        <span className="text-lg font-bold text-[#2D3643] block">{row.card.card_holder_name}</span>
                        <span className="text-sm text-yankeesBlue font-normal block">********{JSON.stringify((row.card.card_number)).slice(8)}</span>
                    </div>
                </div>
            },
        },
        {
            header: 'Payment Through', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {row.due_paid_through}
                </div>
            },
        },
        {
            header: 'Payment Date', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {moment(row.due_paid_at).format('ll')}
                    {/* {moment(row.due_paid_at).format('ll')} */}
                    {/* {(row.due_paid_at).toLocaleDateString("en-IN")} */}
                </div>
            }
        },
        {
            header: 'Payment Time', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {moment(row.due_paid_at).format('LT')}
                </div>
            }
        },
        {
            header: 'Payment Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.paid_amount}
                </div>
            }
        },
        {
            header: 'Charges', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">{row.deposit_charges || row.withdraw_charges}</div>
                // <div className="text-xs font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Pending</div> //pending box
            }
        },
        {
            header: 'Profit Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">{row.profit_amount}</div>
                // <div className="text-xs font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Pending</div> //pending box
            }
        },
        {
            header: 'Total Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">{row.total_amount}</div>
                // <div className="text-xs font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Pending</div> //pending box
            }
        },
        {
            header: 'Payment Method', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">{row.payment_request.payment_method}</div>
                // <div className="text-xs font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Pending</div> //pending box
            }
        },
        {
            header: 'Status', field: (row) => {
                return <>{row.payment_request.payment_status === false ? <div className="text-xs inline-block font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Unpaid</div> : <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">Paid</div>
                }
                </>
            }
        },
        // {
        //     header: 'Invoice', field: (row) => {
        //         return <><div onClick={(e) => { e.stopPropagation(); getInvoice(row?.payment_request?.request_id); }} className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">Download</div>
        //         </>
        //     }
        // },
    ];

    return (
        <div className="wrapper min-h-full relative">
            <div className="sm:flex flex-wrap items-center justify-between">
                {!loading1 ?
                    <div className="flex items-center cursor-pointer">
                        <svg onClick={() => navigate("../singlecardholdercardlist")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                        </svg>
                        <h3 className="text-yankeesBlue leading-8 pl-4 smx:pl-7">{userData.first_name && userData.last_name ? <>{userData.first_name} {userData.last_name}'s Transactions </> : ""}</h3>
                    </div>
                    : ""}
            </div>
            <div className="flex items-center justify-between mb-5 sm:mb-10">
                {/* <h3 className="text-yankeesBlue leading-8">Transaction History</h3> */}
                {/* <div className="flex items-center rounded-lg border-2 border-lightGray cursor-pointer px-2 sm:px-5 py-2 sm:py-3.5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 4.25C5.58579 4.25 5.25 4.58578 5.25 5C5.25 5.41421 5.58579 5.75 6 5.75L14 5.75C14.4142 5.75 14.75 5.41421 14.75 5C14.75 4.58579 14.4142 4.25 14 4.25L6 4.25Z" fill="#94A3B8" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.47246 0.25C2.16114 0.25 0.25 2.07558 0.25 4.37307C0.25 5.53648 0.752889 6.64108 1.62728 7.41966L4.87987 10.3159C5.75613 11.0961 6.25 12.1925 6.25 13.336V17.5134C6.25 19.3745 8.38547 20.367 9.85896 19.3261L11.8002 17.9547C12.7061 17.3147 13.25 16.2855 13.25 15.1817V13.4521C13.25 12.2522 13.7936 11.107 14.7465 10.3238L18.2668 7.43032C19.2037 6.66027 19.75 5.52281 19.75 4.318C19.75 2.05092 17.8642 0.25 15.5842 0.25H4.47246ZM1.75 4.37307C1.75 2.94477 2.94821 1.75 4.47246 1.75H15.5842C17.0772 1.75 18.25 2.92011 18.25 4.318C18.25 5.06517 17.9116 5.78069 17.3144 6.27151L13.7941 9.165C12.5015 10.2274 11.75 11.7946 11.75 13.4521V15.1817C11.75 15.7872 11.4519 16.3642 10.9347 16.7295L8.99346 18.101C8.44746 18.4867 7.75 18.0779 7.75 17.5134V13.336C7.75 11.7567 7.0674 10.2552 5.87738 9.19561L2.62479 6.29941C2.06416 5.80021 1.75 5.10064 1.75 4.37307Z" fill="#94A3B8" />
                    </svg>

                    <span className="text-base font-extrabold text-lightGray pl-3">Filter</span>
                </div> */}
            </div>
            {loading2 ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
                :
                transaction.length > 0 ?
                    <DataTable value={transaction}
                        filters={filters}
                        globalFilterFields={['card.card_holder_name', 'card.card_number', 'card.card_bank_name', 'due_paid_through']}
                        header={headerf}
                        columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5} selectionMode="single">
                        {columns.map((col, i) => (

                            <Column key={col.field} field={col.field} header={col.header} />

                        ))}
                    </DataTable>
                    : <div className="bg-[#F3F4F6] border border-[#CBD5E1] rounded-md text-center p-8 space-y-2 ng-star-inserted">
                        <h3 className="w-full text-[#64748B] text-2xl:text-base xl font-semibold">You have not done any payment yet.</h3>
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
