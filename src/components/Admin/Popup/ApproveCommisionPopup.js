import { Formik, Form, useFormik, ErrorMessage, Field } from 'formik';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup';
import { baseurl } from '../../../api/baseurl';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import { async } from 'q';
import { useDispatch } from 'react-redux';
import { updateCardDueDate } from '../../Cards/CardSlice';
import { toast } from 'sonner';
import { approveUser, getAllUser } from '../../Cardholder/UserSlice';
function ApproveCommisionPopup({ handleClose, user }) {
    const dispatch = useDispatch()
    const userid = user._id
    const [loading, setLoading] = useState(false);
    const initialValues = {
        commission: user.commission || 0
    }
    const validationSchema = Yup.object().shape({
        commission: Yup.number().required("Commission is required!")
    })
    const onSubmit = async (values) => {

        const payload = {
            "userid": userid,
            commission: values.commission
        }
        try {
            setLoading(true)
            const response = await dispatch(approveUser(payload))
            if (response?.payload?.data?.IsSuccess) {
                toast.success(response?.payload?.data?.Message)

            }
            handleClose(false)
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }

    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    // const userid = localStorage.getItem("useridForcard")
    // console.log('userid', userid)
    // let minDateValue = new Date(new Date().setDate(new Date().getDate() + 1));

    // const paymentMethod = [
    //     { name: 'Deposit', value: 'Deposit' },
    //     { name: 'Cycle', value: 'Cycle' },
    //     { name: 'Withdraw', value: 'Withdraw' },
    // ];

    // const initialState = {
    //     userid: dueData?.userid,
    //     cardid: dueData?._id,
    //     due_date: "",
    //     due_amount: null,
    //     // payment_method: ''
    // }

    // const validationSchema = Yup.object().shape({
    //     due_amount: Yup.number().positive('Due Amount should be greater than 0*').required('Due amount is required*'),
    //     due_date: Yup.string().required('Due Date is required*'),
    //     // payment_method: Yup.string().required('Payment Method is required*'),
    // });

    // const onSubmit = async (values) => {

    //     console.log('values', values)
    //     const payload = Object.assign({}, values)
    //     setLoading(true)
    //     const response = await dispatch(updateCardDueDate(payload))
    //     if (response?.payload?.data?.IsSuccess) {
    //         toast.success(response?.payload?.data?.Message)
    //         handleClose(false)
    //     }
    //     console.log('response', response)
    //     setLoading(false)
    // }


    // const DueDateSend = async (values) => {
    //     setLoading(true);
    //     const requestObj = { ...values };
    //     try {
    //         const response = await axios.post(`${baseurl}/api/paymentRequest/add-payment-request-byadmin`, requestObj, { headers: header });
    //         if (response.data.IsSuccess) {
    //             toast.success(response.data.Message);
    //             navigate("../../payment", { state: { paymentMethod: formik.values.payment_method } });
    //             handleClose(false);
    //         } else {
    //             toast.error(response.data.Message);
    //             console.log("error");
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         toast.error("Something Went Wrong.");
    //         setLoading(false);
    //     }
    // }

    // const formik = useFormik({
    //     initialValues: initialState,
    //     validationSchema: ValidationSchema,
    //     onSubmit: DueDateSend,
    // });

    // const setInputValue = useCallback(
    //     (key, value) =>
    //         formik.setValues({
    //             ...formik.values,
    //             [key]: value,
    //         }),
    //     [formik]
    // );

    return (
        <div className="fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] flex backdrop-blur-[1px] z-50">
            <div className="relative max-w-2xl h-auto w-full  m-auto bg-white rounded-lg md:rounded-3xl shadow-shadowbox p-5 sm:p-8">
                <button onClick={() => handleClose(false)} className="absolute top-1 right-1 md:top-5 md:right-5 text-xl max-[640px]:pl-6" >
                    <svg className="w-7 h-7" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Close"><rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"></rect><line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line><line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line></g></g></svg>
                </button>
                <h2 className='flex justify-center mb-7'>Add Request</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {
                        ({ formik, setFieldValue, values, errors }) => {

                            return (
                                <>
                                    <Form >
                                        {/* <div className="w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7">
                                            <div className='paymentpop w-full mb-3 md:mb-0'>
                                                <label htmlFor="payment_method" className="input-title2">Payment method</label>
                                                <Dropdown value={formik.values.payment_method} onChange={(e) => setInputValue("payment_method", e.target.value)} options={paymentMethod} optionLabel="name" placeholder="Select payment type" className="w-full overflow-hidden box-shadow" />
                                                <small className="text-red-500 text-xs">{formik.errors.payment_method}</small>
                                            </div>
                                        </div> */}
                                        <div className='w-full flex flex-wrap md:flex-nowrap md:space-x-6 md:mb-7'>
                                            <div className="w-full flex space-x-6">
                                                <div className='w-full md:w-full mb-3 md:mb-0'>
                                                    <label htmlFor="due_amount" className="inline-block text-sm font-bold text-yankeesBlue mb-1">Enter Commission (%)</label>
                                                    <Field type="number" name="commission" className="input_box placeholder:text-[#94A3B8] placeholder:text-base" placeholder='33%' />
                                                    <small className="text-red-500 text-xs"> <ErrorMessage name='commission' /></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full flex">
                                            {loading ?
                                                <button type="button" className="flex items-center justify-center btn-secondary w-full mt-5 sm:mt-0 cursor-not-allowed" disabled="">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </button>
                                                :
                                                <button type="submit" className="btn-secondary w-full">Add Request</button>
                                            }
                                        </div>
                                    </Form>
                                </>
                            )
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}

export default ApproveCommisionPopup