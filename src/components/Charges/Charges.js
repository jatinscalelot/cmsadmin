import React, { useEffect, useMemo, useState } from 'react'
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DemoImage from "../../assets/images/profile.png"
import axios from 'axios';
import { baseurl } from '../../api/baseurl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import moment from 'moment/moment';
import { calcPaidProfitAmt, calcUnpaidAmt } from '../Dashboard/services/utils';

function Charges() {
    const [commission, setCommission] = useState([]);
    const navigate = useNavigate();
    const [first, setFirst] = useState(false);
    
    const [unpaidProfitAmt, setUnpaidProfitAmt] = useState(0);
    const [paidProfitAmt, setPaidProfitAmt] = useState(0);
    const [loading, setLoading] = useState(false);
    
    let totalEarningAmount = 0;
    
    const user = localStorage.getItem("user");
    const header = {
      Authorization: `Bearer ${JSON.parse(user)?.token}`,
    };
    // localStorage.removeItem("card_id");
    // localStorage.removeItem("user_id");
    // localStorage.removeItem("request_id");
    const getCommision = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/transaction/all-payment-record-list?payment_status=True`, { headers: header });
            console.log(response.data.Data);
            if (response.data.IsSuccess) {
                setCommission(response.data.Data);
                setPaidProfitAmt(calcPaidProfitAmt(response.data.Data))
                // setUnpaidProfitAmt(calcUnpaidAmt(response.data.Data))
                setLoading(false);
            } else {
                toast.error("Something went wrong!!");
            }
        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
        }
    }

    async function setPaymentReceived(transactionId,isPaymentReceived) {
        const requestObj ={
            "transaction_id":transactionId,
            "payment_received": !isPaymentReceived
        }
        try {
            const response = await axios.patch(`${baseurl}/api/transaction/edit-payment-record`, requestObj, { headers: header });
            const data = response.data.Data
            if(data){
                getCommision();
                if (data.payment_received) {
                    toast.info("Status changed to received.")
                } else {
                    toast.info("Status changed to remaining.")
                }
            }else{
                toast.error("Something went wrong!!");
            }

        } catch (error) {
            toast.error("Something went wrong!!");
            console.log(error);
        }
    }

    commission.map((profit) => totalEarningAmount += profit.profit_amount);
    useEffect(() => {
        getCommision();
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
            header: 'Card Holder', field: (row) => {
                return <div className="flex items-center gap-2">
                    <div className='w-12 h-12 object-cover rounded-full overflow-hidden'>
                        <img alt="Demom Images" src={row?.user.profile_pic && row?.user.profile_pic !== "" ? row?.user.profile_pic : DemoImage} className='w-full h-full object-cover rounded-full overflow-hidden' />
                    </div>
                    {/* <div className="pl-4"> */}
                    <span className="text-lg font-bold text-[#2D3643] block">{row.card.card_holder_name}</span>
                    {/* </div> */}
                </div>
            },
        },
        {
            header: 'Card Number', field: (row) => {
                return <div className="flex">
                    <span className="text-lg text-yankeesBlue font-semibold block">********{(row.card.card_number).toString().substr(-4)}</span>
                </div>
            },
        },
        {
            header: 'Payment Method', field: (row) => {
                return <div className="flex">
                    <span className="text-lg text-yankeesBlue font-semibold block">{row.payment_request.payment_method}</span>
                </div>
            },
        },
        {
            header: 'Payment Date', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {moment(row.due_paid_at).format('ll')}
                </div>
            }
        },
        {
            header: 'Due Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.payment_request.due_amount}
                </div>
            }
        },
        {
            header: 'Paid Payment', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    ₹ {row.paid_amount}
                </div>
            }
        },

        {
            header: 'Profit Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {row.profit_amount}
                </div>
            }
        },
        // {
        //     header: 'Charges', field: (row) => {
        //         return <div className="text-yankeesBlue text-lg font-semibold">
        //             ₹ {row.deposit_charges || row.withdraw_charges}
        //         </div>
        //     }
        // },
        // {
        //     header: 'Profit Due Date', field: (row) => {
        //         return <div className="text-yankeesBlue text-lg font-semibold">
        //             12,  Mar 2023
        //         </div>
        //     }
        // },

        {
            header: 'Total Amount', field: (row) => {
                return <div className="text-yankeesBlue text-lg font-semibold">
                    {/* ₹ {(row.due_amount + row.profit_amount).toFixed(2)} */}
                    ₹ {row.total_amount}
                </div>
            }
        },
        {
            header: 'Status', field: (row) => {
                // return <>{row.profit_received === false ? <div className="text-xs inline-block font-semibold text-[#F6A351] bg-[#FFF0E0] rounded-lg px-3 py-2">Remain</div> : <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">"Received"</div>
                return <>{<div onClick={(e) => {setPaymentReceived(row.transaction_id,row.payment_received); e.stopPropagation()}} className={`text-xs inline-block font-semibold rounded-lg px-3 py-2 select-none   ` + (row.payment_received ? "text-[#097C69] bg-[#E2F8F5]" :"text-[#F6A351] bg-[#FFF0E0]" )}>{row.payment_received ? "Received" : "Remain"}</div>}</>
            }
        },
        // <div className="text-xs inline-block font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-3 py-2">"Received"</div>
    ];

    return (
        <div className="wrapper min-h-full">
            <div className="relative flex flex-wrap items-center- justify-start md:mb-[50px]">
                <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                    <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-transparent">
                        <h2 className="text-darkGreen mb-3">₹ {totalEarningAmount}</h2>
                        <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                            Total Earnings Amount
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                    <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                        <h2 className="text-yankeesBlue mb-3">₹ {paidProfitAmt}</h2>
                        <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                            Total Earnings Received
                        </span>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                    <div className="bg-[#F3F4F6] py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                        <h2 className="text-yankeesBlue mb-3">₹ {(totalEarningAmount - paidProfitAmt).toFixed(2)}</h2>
                        <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                            Total Earnings Pending
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mb-5 sm:mb-10 mt-4 md:mt-0">
                {/* <h3 className="text-yankeesBlue leading-8">Profit History</h3> */}
            </div>
            {loading ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div> :
                commission.length > 0 ?
                    <DataTable value={commission} selectionMode="single"
                        filters={filters}
                        globalFilterFields={['card.card_holder_name', 'card.card_number', 'card.card_bank_name', 'due_date']}
                        header={headerf}
                        onSelectionChange={(col) => { localStorage.setItem("transaction_id", col.value.transaction_id); console.log(col.value.transaction_id);;navigate("singleusercommissiondetails") }} columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5}>
                        {columns.map((col, i) => (

                            <Column key={col.field} field={col.field} header={col.header} />

                        ))}
                    </DataTable>
                    : <div className="bg-[#F3F4F6] border border-[#CBD5E1] rounded-md text-center p-8 space-y-2 ng-star-inserted">
                    <h3 className="w-full text-[#64748B] text-2xl:text-base xl font-semibold">You have not made profit yet.</h3>
                </div>
            }

        </div>
    )
}

export default Charges