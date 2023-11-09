import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment/moment';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { baseurl } from '../../../api/baseurl';
import { Dropdown } from 'primereact/dropdown';
import Summary from './Summary';
import Modal from '../../../common/Modals/Modal';

function WithdrawPaymentDetails({ handleClose, payerData, setReload }) {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    
    const user = localStorage.getItem("user");
    const header = {
      Authorization: `Bearer ${JSON.parse(user)?.token}`,
    };
    const [paymentRecord, setPaymentRecord] = useState([]);
    // const [sumOfAmount, setSumOfAmount] = useState(0);
    // let sumOfAmount = 0;
    const [sumOfAmount, setSumOfAmount] = useState(0)
    const [acceptTerm, setAcceptTerm] = useState(false);
    const [isCheck, setIsCheck] = useState(false)
    const [get, setGet] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSummary, setIsSummary] = useState(false);

    const initialState = {
        request_id: payerData.request_id,
        payment_status: false,
        paid_amount: 0,
        payment_type: "",
        due_paid_through: "",
        deposit_charges: 0,
        withdraw_charges: 0,
        profit: "",
        cycle_deposit_status: false,
        cycle_withdraw_status: false,
        // payment_method_flag: ""
    }

    const ValidationSchema = Yup.object().shape({
        paid_amount: Yup.number().positive('Due Amount should be greater than 0*').required('Due amount is required*'),
        profit: Yup.number().positive('profit should be greater than 0*').required('profit are required*'),
        payment_type: Yup.string().required('Payment Type is required*'),
        due_paid_through: Yup.string().required('Paid through is required*'),
        deposit_charges: Yup.number(),
        withdraw_charges: Yup.number().positive('Withdraw Charges should be greater than 0*').required('Withdraw Charges are required*'),
        cycle_deposit_status: Yup.boolean(),
        cycle_withdraw_status: Yup.boolean(),
        payment_method_flag: Yup.string()
    });

    const payment = [
        { name: 'Full payment', value: 'Full payment' },
        { name: 'Partial payment', value: 'Partial payment' },
    ];

    // payerData.due_amount - sumOfAmount >= 0 ? false : true
    // console.log("paid_amount", (formik.values.paid_amount + paymentRecord) >= payerData.due_amount ? payment_status = true :  payment_status = false);   



    const clickNextHandler = async (values) => {
        setLoading(true);
        const requestObj = { ...values }

        // console.log("values", ...values);
        // console.log("requestObj", requestObj);
        // console.log("formik", formik);

        try {
            if (parseFloat(formik.values.paid_amount) + parseFloat(sumOfAmount) > parseFloat(payerData.due_amount)) {
                setLoading(false);
                // return toast.error("You are in advanced payment.");
                
            } else if (parseFloat(formik.values.paid_amount) + parseFloat(sumOfAmount) === parseFloat(payerData.due_amount)) {
                // console.log("111", typeof (formik.values.paid_amount));
                // console.log("1112222", typeof Number(formik.values.paid_amount));
                // console.log("222", typeof (sumOfAmount));
                // console.log("333", typeof (payerData.due_amount));
                // if (Number(formik.values.paid_amount) + sumOfAmount >= payerData.due_amount) {
                requestObj.payment_status = true;
            } else {
                requestObj.payment_status = false;
            }

            // if (payerData.payment_method === "Cycle") {
            //     if (payerData.cycle_deposit_status === false) {
            //         requestObj["payment_method_flag"] = "Cycle Deposit"
            //     } else {
            //         requestObj["payment_method_flag"] = "Cycle Withdraw"
            //     }
            // }

            // if (payerData.payment_method === "Cycle" && payerData.cycle_deposit_status === false && parseFloat(parseFloat(formik.values.paid_amount) + parseFloat(sumOfAmount)) >= parseFloat(payerData.due_amount)) {
            //     requestObj.cycle_deposit_status = true;
            //     requestObj.cycle_withdraw_status = false;
            // } else if (payerData.payment_method === "Cycle" && payerData.cycle_withdraw_status === false && parseFloat(parseFloat(formik.values.paid_amount) + parseFloat(sumOfAmount)) >= parseFloat(payerData.due_amount)) {
            //     requestObj.cycle_withdraw_status = true;
            //     requestObj.cycle_deposit_status = true;
            // }
            const response = await axios.post(`${baseurl}/api/transaction/add-payment-record`, requestObj, { headers: header });
            // console.log("Payment Data >> ", response.data.Data);
            if (response.data.IsSuccess) {
                // formik.values.due_paid_through = "";
                // formik.values.paid_amount = "";
                // formik.values.withdraw_charges = "";
                // formik.values.profit = "";
                setGet(!get);
                if (requestObj.payment_status) {
                    setIsSummary(true)
                }
                // handleClose(false);
                // setReloade(true);
            } else {
                toast.error(response.data.Message);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Something Went Wrong!!");
        }
    }


    const formik = useFormik({
        initialValues: initialState,
        validationSchema: ValidationSchema,
        onSubmit: clickNextHandler,
    });

    const setInputValue = useCallback(
        (key, value) =>
            formik.setValues({
                ...formik.values,
                [key]: value,
            }),
        [formik]
    );

    const getPaymentRecords = async () => {
        try {
            const response = await axios.get(`${baseurl}/api/transaction/all-payment-record-list?request_id=${payerData.request_id}`, { headers: header })
            if (response.data.IsSuccess) {

                if (payerData.payment_method !== "Cycle") {
                    // for method `Deposit` and `Withdraw`
                    const filteredPayments = response.data.Data.filter((r) => r.payment_request.payment_method === payerData.payment_method);
                    setPaymentRecord(filteredPayments)
                } else {
                    // for method `Cycle`
                    if (payerData.cycle_deposit_status === false) {
                        const filteredPayments = response.data.Data.filter((r) => r.payment_method_flag === "Cycle Deposit");
                        setPaymentRecord(filteredPayments)
                    } else {
                        const filteredPayments = response.data.Data.filter((r, i) => r.payment_method_flag === "Cycle Withdraw");
                        setPaymentRecord(filteredPayments)
                    }
                }
                if (response.data.Data.length > 0) {
                    formik.values.payment_type = "Partial payment";
                }
            } else {
                toast.error(response.data.Message);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getPaymentRecords();
    }, [get])

    useEffect(() => {
        paymentRecord.map((r) => setSumOfAmount(prev => prev + r.paid_amount));

    }, [paymentRecord])

    // paymentRecord.map((r, i) => <div key={i}>{sumOfAmount += r.paid_amount}</div>);

    // console.log(">>>>>>>>", paymentRecord);
    return (
        <div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] overflow-auto flex backdrop-blur-[1px] z-50 select-none'>
            <div className="max-w-[1005px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-5 md:p-11">
                <h2 className='flex justify-center'>Payment Details</h2>
                <form onSubmit={formik.handleSubmit}>
                    <span className="block text-yankeesBlue text-2xl font-bold py-6">Withdraw To</span>
                    <div className="w-full">
                        <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Holder Name</label>
                                <input type="text" name="" defaultValue={payerData.card.card_holder_name} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Olivia Smith' readOnly />
                            </div>
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Card Number</label>
                                <div className='relative'>
                                    <input type="text" name="" value={isCheck ? payerData.card.card_number : `********${(payerData.card.card_number).toString().substr(-4)}`} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='******8453' readOnly />
                                    <div onClick={() => setIsCheck(!isCheck)}>
                                        {isCheck ?
                                            <>
                                                <svg className='absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer' width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 5.25C8.92894 5.25 7.25001 6.92893 7.25001 9C7.25001 11.0711 8.92894 12.75 11 12.75C13.0711 12.75 14.75 11.0711 14.75 9C14.75 6.92893 13.0711 5.25 11 5.25ZM8.75001 9C8.75001 7.75736 9.75737 6.75 11 6.75C12.2426 6.75 13.25 7.75736 13.25 9C13.25 10.2426 12.2426 11.25 11 11.25C9.75737 11.25 8.75001 10.2426 8.75001 9Z" fill="#2D264B" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11 0.25C8.85905 0.25 6.92325 1.30899 5.35173 2.59572C3.77164 3.88946 2.47962 5.47865 1.61142 6.68801L1.53981 6.78759C1.01715 7.51384 0.586914 8.11166 0.586914 9C0.586914 9.88834 1.01715 10.4862 1.53981 11.2124L1.61142 11.312C2.47962 12.5214 3.77164 14.1105 5.35173 15.4043C6.92325 16.691 8.85905 17.75 11 17.75C13.141 17.75 15.0768 16.691 16.6483 15.4043C18.2284 14.1105 19.5204 12.5214 20.3886 11.312L20.4602 11.2124C20.9829 10.4862 21.4131 9.88835 21.4131 9C21.4131 8.11166 20.9829 7.51384 20.4602 6.78759L20.3886 6.68801C19.5204 5.47865 18.2284 3.88946 16.6483 2.59572C15.0768 1.30899 13.141 0.25 11 0.25ZM2.82993 7.56278C3.6592 6.40765 4.86348 4.93414 6.302 3.75631C7.7491 2.57146 9.35423 1.75 11 1.75C12.6458 1.75 14.2509 2.57146 15.698 3.75631C17.1365 4.93414 18.3408 6.40765 19.1701 7.56278C19.794 8.43194 19.9131 8.64148 19.9131 9C19.9131 9.35852 19.794 9.56806 19.1701 10.4372C18.3408 11.5923 17.1365 13.0659 15.698 14.2437C14.2509 15.4285 12.6458 16.25 11 16.25C9.35423 16.25 7.7491 15.4285 6.302 14.2437C4.86349 13.0659 3.6592 11.5923 2.82993 10.4372C2.20597 9.56806 2.08691 9.35852 2.08691 9C2.08691 8.64148 2.20597 8.43194 2.82993 7.56278Z" fill="#2D264B" />
                                                </svg>
                                            </>
                                            :
                                            <>
                                                <svg className='absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer' width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.4685 1.58568C21.792 1.32692 21.8444 0.854953 21.5857 0.531506C21.3269 0.20806 20.855 0.155619 20.5315 0.414376L17.2062 3.07464C15.529 1.56835 13.3897 0.250028 11 0.250028C8.85907 0.250028 6.92327 1.30902 5.35175 2.59574C3.77166 3.88949 2.47964 5.47868 1.61144 6.68804L1.53984 6.78762C1.01718 7.51385 0.58695 8.11166 0.586944 9C0.586937 9.88833 1.01709 10.4861 1.53964 11.2122L1.61121 11.3117C2.15751 12.0727 2.86909 12.9805 3.71226 13.8698L0.531506 16.4144C0.20806 16.6731 0.155619 17.1451 0.414376 17.4685C0.673133 17.792 1.1451 17.8444 1.46855 17.5857L21.4685 1.58568ZM11 1.75003C12.7777 1.75003 14.5024 2.70932 16.0173 4.02574L13.4006 6.11909C12.7506 5.57707 11.9134 5.25003 11 5.25003C8.92896 5.25003 7.25003 6.92896 7.25003 9.00003C7.25003 9.61541 7.39871 10.1971 7.66192 10.71L4.88803 12.9292C4.06702 12.0746 3.36802 11.1868 2.82974 10.4369C2.20595 9.56801 2.08694 9.35854 2.08694 9.00001C2.08695 8.64149 2.206 8.43195 2.82995 7.56281C3.65922 6.40768 4.86351 4.93417 6.30203 3.75634C7.74913 2.57149 9.35426 1.75003 11 1.75003ZM11 6.75003C11.4362 6.75003 11.8433 6.87383 12.1884 7.0889L8.87436 9.7401C8.79377 9.50853 8.75003 9.25964 8.75003 9.00003C8.75003 7.75739 9.75739 6.75003 11 6.75003Z" fill="#2D264B" />
                                                    <path d="M19.3954 5.39079C19.1332 5.07006 18.6608 5.02255 18.34 5.28467C18.0193 5.54679 17.9718 6.01928 18.2339 6.34001C18.5844 6.76888 18.8981 7.18396 19.17 7.56273C19.7941 8.43194 19.9131 8.6415 19.9131 9.00002C19.9131 9.35855 19.7941 9.56809 19.1701 10.4372C18.3408 11.5924 17.1365 13.0659 15.698 14.2437C14.2509 15.4286 12.6458 16.25 11 16.25C9.59522 16.25 8.21821 15.6521 6.93756 14.7322C6.60113 14.4906 6.13252 14.5674 5.89088 14.9038C5.64923 15.2403 5.72607 15.7089 6.0625 15.9505C7.48703 16.9737 9.16761 17.75 11 17.75C13.141 17.75 15.0768 16.691 16.6483 15.4043C18.2284 14.1106 19.5204 12.5214 20.3886 11.312L20.4602 11.2124C20.9829 10.4862 21.4131 9.88837 21.4131 9.00002C21.4131 8.11167 20.9829 7.51382 20.4602 6.78754L20.3886 6.68796C20.1009 6.28725 19.7682 5.84696 19.3954 5.39079Z" fill="#2D264B" />
                                                    <path d="M14.75 9.00003C14.75 8.58581 14.4142 8.25003 14 8.25003C13.5858 8.25003 13.25 8.58581 13.25 9.00003C13.25 10.2427 12.2427 11.25 11 11.25C10.5858 11.25 10.25 11.5858 10.25 12C10.25 12.4142 10.5858 12.75 11 12.75C13.0711 12.75 14.75 11.0711 14.75 9.00003Z" fill="#2D264B" />
                                                </svg>
                                            </>
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Bank Name</label>
                                <input type="text" name="" defaultValue={payerData.card.card_bank_name} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Kotak Mahindra Bank' readOnly />
                            </div>
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <div className="w-full flex space-x-6">
                                    <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                        <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">CVV</label>
                                        <input type="text" name="" defaultValue={payerData.card.card_cvv} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='20, Jan 2022' readOnly />
                                    </div>
                                    <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                        <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Card Expiry Date</label>
                                        <input type="text" name="" defaultValue={moment(payerData.card.card_exp_date).format('ll')} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='$2,000' readOnly />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Payment Method</label>
                                <input type="text" name="" defaultValue={payerData.payment_method} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Payment' readOnly />
                            </div>
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <div className="w-full flex space-x-6">
                                    <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                        <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Withdraw Date</label>
                                        <input type="text" name="" defaultValue={moment(payerData.due_date).format('ll')} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='20, Jan 2022' readOnly />
                                    </div>
                                    <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                        <label htmlFor="" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Withdraw Amount</label>
                                        <input type="text" name="" defaultValue={`₹ ${payerData.due_amount}`} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='$2,000' readOnly />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <span className="blocktext-yankeesBlue text-2xl font-bold pb-5">Withdraw From</span>
                    {paymentRecord.length > 0 ?
                        paymentRecord.map((rec, i) => <>
                            <div key={i} className="flex flex-wrap items-center justify-between rounded-xl bg-white py-4 px-6 drop-shadow-vshadow mb-1 cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <span className="text-xl text-darkGreen font-bold">{rec.due_paid_through}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-xl text-darkGreen font-bold inline-block">
                                    </span>
                                    <div className="text-xl text-darkGreen font-bold inline-block space-x-2">
                                        <span>₹ {rec.paid_amount}</span> +
                                        <span>₹ {(rec.withdraw_charges * rec.paid_amount) / 100}</span> +
                                        <span>₹ {((rec.profit * rec.paid_amount) / 100)}</span> =
                                        <span>₹ {
                                        ((rec.withdraw_charges * rec.paid_amount) / 100) + rec.paid_amount + ((rec.profit * rec.paid_amount) / 100)}</span>
                                    </div>
                                </div>
                            </div>
                        </>)
                        : ""}
                    <div className="w-full mt-5">

                        <div className="paymentpop w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                <label htmlFor="payment_type" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Payment Type</label>
                                {/* <input type="text" name="due_paid_through" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Ex. Google pay' required onChange={(e) => setInputValue("due_paid_through", e.target.value)} /> */}
                                <Dropdown value={formik.values.payment_type} onChange={(e) => setInputValue("payment_type", e.target.value)} options={payment} optionLabel="name"
                                    placeholder="Select payment type" className="py-[2px] border bg-lightWhite box-shadow rounded-md w-full" disabled={(paymentRecord.length > 0)} />{/*disabled={(paymentRecord.length > 0 ? true : false)}*/}
                                <small className="text-red-500 text-xs">{formik.errors.payment_type}</small>
                            </div>
                            <div className='w-full md:w-1/2 mb-3 md:mb-0'>
                                {/* <div className={"w-full flex " + (payerData.payment_method === 'Deposit' ? "" : "space-x-3")}> */}
                                <div className="w-full flex space-x-3">
                                    <div className='w-full  mb-3 md:mb-0'>
                                        <label htmlFor="paid_amount" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Withdraw Amount</label>
                                        <input type="number" name="paid_amount" className={"input_box placeholder:text-[#94A3B8] placeholder:text-base " + (formik.values.payment_type === 'Full payment' ? "select-none cursor-not-allowed" : "")} placeholder='$2,000' value={formik.values.payment_type === 'Full payment' ? formik.values.paid_amount = payerData.due_amount : formik.values.paid_amount} onChange={(e) => formik.values.payment_type === 'Full payment' ? setInputValue("paid_amount", (payerData.due_amount).toFixed(2)) : setInputValue("paid_amount", e.target.value)} readOnly={formik.values.payment_type === 'Full payment' ? true : false} />
                                        {/* <input type="number" name="paid_amount" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='$2,000' value={formik.values.payment_type === 'Full payment' ? payerData.due_amount : formik.values.paid_amount} onChange={(e) => setInputValue("paid_amount", formik.values.payment_type === 'Full payment' ? payerData.due_amount = e.target.value: e.target.value)} /> */}
                                        {!formik.values.paid_amount && <small className="text-red-500 text-xs">{formik.errors.paid_amount}</small>}
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="paymentpop w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                            <div className='w-full  mb-3 md:mb-0'>
                                <label htmlFor="due_paid_through" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Paid Through</label>
                                <input type="text" name="due_paid_through" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Ex. Google pay' onChange={(e) => setInputValue("due_paid_through", e.target.value)} />
                                <small className="text-red-500 text-xs">{formik.errors.due_paid_through}</small>
                            </div>
                            <div className={"w-full mb-3 md:mb-0 md:w-1/2"}>
                                <label htmlFor="withdraw_charges" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Bank Charges(%)</label>
                                <input type="number" name="deposit_charges" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Add charges' onChange={(e) => setInputValue("withdraw_charges", formik.values.withdraw_charges = e.target.value)} />
                                <small className="text-red-500 text-xs">{formik.errors.withdraw_charges}</small>
                            </div>
                            <div className={"w-full mb-3 md:mb-0 md:w-1/2"}>
                                <label htmlFor="profit" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Profit (%)</label>
                                <input step="any" type="number" name="profit" defaultValue={payerData?.card.profit} className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='Add Profit' onChange={(e) => setInputValue("profit", e.target.value)} />
                                <small className="text-red-500 text-xs">{formik.errors.profit}</small>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-end ml-auto mb-6 mt-2 space-x-5'>
                        {/* <div className='text-xs font-bold text-red-600'>
                            {payerData.due_amount - sumOfAmount - formik.values.paid_amount >= 0 ? <>Remain : ₹ {payerData.due_amount - sumOfAmount - formik.values.paid_amount} </> : <>advanced : ₹ {Math.abs(payerData.due_amount - sumOfAmount - formik.values.paid_amount)}</>}
                        </div> */}
                    </div>
                    <div className="flex justify-center border-t-[1px] border-[#CBD5E1] space-x-5 pt-6">.
                        <button type="button" onClick={() => handleClose(false)} className="max-w-[216px] w-full text-center cursor-pointer text-base font-extrabold text-yankeesBlue bg-white border-2 border-[#94A3B8] rounded-xl px-6 py-2">Cancel</button>
                        {loading ?
                            <button type="button" className="flex items-center justify-center max-w-[216px] w-full text-center text-base font-extrabold bg-darkGreen text-white border-2 border-transparent rounded-xl px-6 py-2 cursor-not-allowed" disabled="">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Wait...
                            </button>
                            :
                            <>
                                <button type="submit" className={`max-w-[216px] w-full text-center text-base font-extrabold cursor-pointer bg-darkGreen text-white border-2 border-transparent rounded-xl px-6 py-2`}>{formik.values.payment_type === 'Full payment' ? payerData.payment_method === "Withdraw" ? "Withdraw" : "Paid" : payerData.payment_method === "Withdraw" ? "Withdraw Recorded" : "Paid Recorded"}</button>

                            </>
                        }
                    </div>
                </form>
            </div >
            {/* <ToastContainer
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
            /> */}
            <Modal isOpen={isSummary}>
                <Summary handleClose={setIsSummary} paymentRecord={paymentRecord} />
            </Modal>
        </div >
    )
}

export default WithdrawPaymentDetails