import React, { useEffect, useState } from 'react'
import DemoImage from "../../assets/images/profile.png"
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../api/baseurl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from 'moment/moment';

function SingleUserCommissionDetails() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const transaction_id = localStorage.getItem("transaction_id");
    const user = localStorage.getItem("user");
  const header = {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  };

    const [userCommission, setUserCommission] = useState([]);

    const getUserCommission = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/transaction/all-payment-record-list?transaction_id=${transaction_id}`, { headers: header });
            if (response.data.IsSuccess) {
                setUserCommission(response.data.Data);
                setLoading(false);
            } else {
                toast.error(response.data.Message);
                setLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong!!");
        }
    }

    useEffect(() => {
        getUserCommission();
    }, []);

    return (
        <>
            {loading ?
                <div className="flex items-center justify-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div> :
                <div className="wrapper min-h-full">
                    <div className="flex items-center justify-between pb-11">
                        <div className="flex items-center cursor-pointer">
                            <svg onClick={() => navigate("../")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                            </svg>
                            <h3 className="max-w-[280px] xsm:max-w-md md:max-w-full text-yankeesBlue leading-8 pl-3 sm:pl-7 truncate">{userCommission.card_holder_name} Commission Details</h3>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-lightWhite rounded-xl p-5 md:py-6 md:px-12 mb-7">
                            <div className="text-yankeesBlue text-lg md:text-2xl font-bold mb-6">Payment From</div>
                            <div className="w-full flex flex-wrap sm:flex-nowrap justify-start md:justify-center items-center md:space-x-5">
                                <div className="w-full sm:w-1/2 md:w-1/3 mb-3 sm:mb-0">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="w-10 md:w-20 h-10 md:h-20 rounded-[24px] overflow-hidden">
                                                <img src={DemoImage} alt="" className='w-full h-full overflow-hidden' />
                                            </div>
                                        </div>
                                        <div className="pl-4">
                                            <span className="text-sm sm:text-base 2xl:text-xl font-bold text-lightGray block whitespace-nowrap">Card holder name</span>
                                            <span className="text-base md:text-2xl 2xl:text-4xl font-bold text-yankeesBlue block">{userCommission.card.card_holder_name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2 md:w-1/3 pl-0 sm:pl-3 md:pl-0 mb-3 md:mb-0">
                                    <span className="text-sm sm:text-base 2xl:text-xl font-semibold text-lightGray mb-3">Card number</span>
                                    <h2 className="text-base md:text-2xl 2xl:text-4xl text-yankeesBlue font-bold">{userCommission?.card.card_number && userCommission?.card.card_number !== "" ? <>********{(userCommission.card.card_number).toString().substr(-4)}</> : ""}</h2>
                                </div>
                                <div className="hidden  w-full sm:w-1/2 md:w-1/3 md:flex justify-end">
                                    {userCommission.payment_received === false ? <div className="inline-block text-xl font-semibold text-[#ED4D37] bg-[#f3e7e7] rounded-lg px-5 2xl:px-6 py-4 2xl:py-5">Unpaid</div>
                                        : <div className="inline-block text-xl fon  t-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-5 2xl:px-6 py-4 2xl:py-5">Paid</div>}
                                </div>
                            </div>
                            <div className="md:hidden flex justify-start sm:mt-3 md:mt-0">
                                {userCommission.card_status === false ? <div className="inline-block text-sm md:text-xl font-semibold text-[#ED4D37] bg-[#f3e7e7] rounded-lg px-2 sm:px-5 2xl:px-6 py-2 sm:py-4 2xl:py-5">Unpaid</div>
                                    : <div className="inline-block text-sm md:text-xl font-semibold text-[#097C69] bg-[#E2F8F5] rounded-lg px-2 sm:px-5 2xl:px-6 py-2 sm:py-4 2xl:py-5">Paid</div>}
                            </div>                            
                        </div>
                        <div className="relative flex flex-wrap items-center- justify-start mb-[50px]">
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-[#ed4d3714] border border-transparent py-7 px-7 2xl::px-11 rounded-xl h-full">
                                    <h2 className="text-[#ED4D37] mb-3">₹ {userCommission.paid_amount}</h2>
                                    <span className="text-[#64748B] text-base 2xl:text-xl font-semibold">
                                        Total Paid Commission Amount
                                    </span>
                                </div>
                            </div>
                            {/* paid  */}
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-[#f4f8e7] border border-transparent py-7 px-7 2xl::px-11 rounded-xl h-full">
                                    <h2 className="text-darkGreen mb-3">₹ {userCommission.payment_request.due_amount}</h2>
                                    <span className="text-[#64748B] text-base 2xl:text-xl font-semibold">
                                        Payment Amount
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
                                    <h2 className="text-yankeesBlue mb-3">{userCommission.profit} %</h2>
                                    <span className="text-[#64748B] text-base 2xl:text-xl font-semibold">
                                        Commission
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                                <div className="bg-white border border-[#CBD5E1] py-7 px-7 2xl::px-11 rounded-xl h-full">
                                    <h2 className="text-yankeesBlue mb-3">{moment(userCommission.due_paid_at).format('ll')}</h2>
                                    <span className="text-[#64748B] text-base 2xl:text-xl font-semibold">
                                        Payment Date
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }</>
    )
}

export default SingleUserCommissionDetails