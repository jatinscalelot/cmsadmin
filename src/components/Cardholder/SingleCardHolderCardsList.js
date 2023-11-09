import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CardBg from "../../assets/images/card.png";
import axios from 'axios';
import { baseurl } from '../../api/baseurl';
import { Column } from 'primereact/column';
// import DataTable from 'react-data-table-component';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import DemoImage from "../../assets/images/profile.png"
import creditCard from "../../assets/images/credit-card.png"
import moment from 'moment/moment';
import Modal from '../../common/Modals/Modal';
import CardHolderDueAmount from '../Admin/Popup/CardHolderDueAmount'
import { useDispatch } from 'react-redux';
import { async } from 'q';
import { getCardList } from '../Cards/CardSlice';
import { toast } from 'sonner';
import { useUserList } from './UserSlice';



export default function SingleCardHolderCardsList() {
    const userList = useUserList()
    const userid = localStorage.getItem("useridForcard")

    const user = userList.find((items) => {
        return items.id === userid
    })
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [cardList, setCardList] = useState([])
    const [loading1, setLoading1] = useState(false);
    const [dueAmountPop, setDueAmountPop] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [listCards, setListCards] = useState([]);
    const [listView, setListView] = useState(false);
    const [dueData, setDueData] = useState({});




    const getCardDetails = async () => {
        const payload = {
            userid: userid,
            page: 1,
            limit: 1000000
        }
        try {
            setLoading1(true)
            setLoading2(true)
            const response = await dispatch(getCardList(payload))

            if (response?.payload?.data?.IsSuccess) {
                toast.success(response?.payload?.data?.Message)
                setCardList(response?.payload?.data?.Data?.docs)
                setListCards(response?.payload?.data?.Data?.docs)
            }

        } catch (error) {
            console.log('error', error)
        }
        setLoading1(false)
        setLoading2(false)
    }

    useEffect(() => {
        getCardDetails()
    }, [])





    // const { state } = useLocation();
    // const { data } = state;

    // const [userData, setUserData] = useState({});
    // // const [userDueAmount, setUserDueAmount] = useState({});

    // const user_id = localStorage.getItem("user_id");
    // localStorage.removeItem("card_id");
    // const user = localStorage.getItem("user");
    // const header = {
    //     Authorization: `Bearer ${JSON.parse(user)?.token}`,
    // };
    // const [cards, setCards] = useState([]);
    // const getUserProfile = async () => {
    //     try {
    //         const response = await axios.get(`${baseurl}/api/user/user-list?id=${user_id}`, { headers: header });
    //         if (response.data.IsSuccess) {
    //             setUserData(response.data.Data[0]);
    //             setLoading1(false);
    //         } else {
    //             toast.error(response.data.Message);
    //             setLoading1(false);
    //         }
    //     } catch (error) {
    //         toast.error("Something went wrong!!");
    //     }
    // }

    // const getUserCards = async () => {
    //     try {
    //         const response = await axios.get(`${baseurl}/api/cards/cards-list?user_id=${user_id}`, { headers: header });
    //         if (response.data.IsSuccess) {
    //             // toast.success(response.data.Message);
    //             setListCards(response.data.Data);
    //             setLoading2(false);
    //         }
    //     } catch (error) {
    //         toast.error("Something went wrong!!");
    //         console.log(error);
    //     }
    // }
    // useEffect(() => {
    //     getUserProfile();
    //     getUserCards();
    // }, []);
    const columns = [
        {
            header: 'Holder Name', field: row => <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={DemoImage} alt="" className='w-full h-full overflow-hidden' />
                </div>
                <div className="pl-4">
                    <span className="text-lg font-bold text-[#2D3643] block">{row.card_holder}</span>
                </div>
            </div>
        },
        {
            header: 'Card Number', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">
                    ********{(row.card_number).toString().substr(-4)}

                </div>
            }
        },
        {
            header: 'Category', field: (row) => {

                return <div className="flex items-center space-x-2">
                    <svg className='w-5 h-5' width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.00002 11.5413C3.65484 11.5413 3.37502 11.8212 3.37502 12.1663C3.37502 12.5115 3.65484 12.7913 4.00002 12.7913H5.66669C6.01187 12.7913 6.29169 12.5115 6.29169 12.1663C6.29169 11.8212 6.01187 11.5413 5.66669 11.5413H4.00002Z" fill="#1E293B" />
                        <path d="M8.16669 11.5413C7.82151 11.5413 7.54169 11.8212 7.54169 12.1663C7.54169 12.5115 7.82151 12.7913 8.16669 12.7913H11.5C11.8452 12.7913 12.125 12.5115 12.125 12.1663C12.125 11.8212 11.8452 11.5413 11.5 11.5413H8.16669Z" fill="#1E293B" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.4542 0.766851C12.7339 0.708001 11.8378 0.708004 10.6947 0.708008H7.30539C6.16229 0.708004 5.26609 0.708001 4.5458 0.766851C3.81235 0.826776 3.20642 0.950823 2.65798 1.23027C1.75637 1.68966 1.02334 2.42269 0.563948 3.3243C0.161637 4.11388 0.0755182 5.04082 0.0510079 6.32104C0.0416871 6.80789 0.0416871 7.36238 0.0416871 7.99485V8.02764C0.0416832 9.17074 0.0416802 10.0669 0.10053 10.7872C0.160456 11.5207 0.284503 12.1266 0.563948 12.675C1.02334 13.5767 1.75637 14.3097 2.65798 14.7691C3.20642 15.0485 3.81235 15.1726 4.5458 15.2325C5.26608 15.2913 6.16226 15.2913 7.30533 15.2913H10.6947C11.8377 15.2913 12.734 15.2913 13.4542 15.2325C14.1877 15.1726 14.7936 15.0485 15.3421 14.7691C16.2437 14.3097 16.9767 13.5767 17.4361 12.675C17.7155 12.1266 17.8396 11.5207 17.8995 10.7872C17.9584 10.0669 17.9584 9.17077 17.9584 8.0277V7.99484C17.9584 7.36238 17.9584 6.80788 17.949 6.32104C17.9245 5.04082 17.8384 4.11388 17.4361 3.3243C16.9767 2.42269 16.2437 1.68966 15.3421 1.23027C14.7936 0.950823 14.1877 0.826776 13.4542 0.766851ZM3.22547 2.34403C3.56833 2.16933 3.99144 2.06631 4.64759 2.0127C5.31104 1.95849 6.15626 1.95801 7.33335 1.95801H10.6667C11.8438 1.95801 12.689 1.95849 13.3525 2.0127C14.0086 2.06631 14.4317 2.16933 14.7746 2.34403C15.441 2.68358 15.9828 3.22538 16.3223 3.89179C16.5341 4.30736 16.6354 4.82648 16.6786 5.70801H1.32141C1.36462 4.82648 1.46596 4.30736 1.67771 3.89179C2.01726 3.22538 2.55906 2.68358 3.22547 2.34403ZM1.29169 7.99967C1.29169 7.62071 1.2917 7.27528 1.2936 6.95801H16.7064C16.7083 7.27528 16.7084 7.62071 16.7084 7.99967C16.7084 9.17676 16.7079 10.022 16.6537 10.6854C16.6001 11.3416 16.497 11.7647 16.3223 12.1076C15.9828 12.774 15.441 13.3158 14.7746 13.6553C14.4317 13.83 14.0086 13.933 13.3525 13.9866C12.689 14.0409 11.8438 14.0413 10.6667 14.0413H7.33335C6.15626 14.0413 5.31104 14.0409 4.64759 13.9866C3.99144 13.933 3.56833 13.83 3.22547 13.6553C2.55906 13.3158 2.01726 12.774 1.67771 12.1076C1.50301 11.7647 1.39999 11.3416 1.34638 10.6854C1.29217 10.022 1.29169 9.17676 1.29169 7.99967Z" fill="#1E293B" />
                    </svg>
                    <div className="text-lg font-semibold text-yankeesBlue capitalize">
                        {row.card_type}
                    </div>
                </div>
            }
        },
        {
            header: 'Bank Name', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{row.bank_name}</div>
            }
        },
        {
            header: '', field: (row) => {
                return <div onClick={(e) => {
                    e.stopPropagation();
                    setDueData(row);
                    setDueAmountPop(true);
                }} className="relative text-base font-semibold text-white inline-block bg-[#8FB50B] rounded-lg px-3 py-2">Add Request</div>
            }
        },

    ];
    return (
        <>
            {loading1 && loading2 ? <div className="flex items-center justify-center">
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div> :
                <div className="wrapper min-h-full">
                    <div className="sm:flex flex-wrap items-center justify-between">
                        <div className="flex items-center cursor-pointer">
                            <svg onClick={() => navigate("../")} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.65995 2.41586C8.0277 2.05138 8.03034 1.4578 7.66586 1.09005C7.30139 0.722305 6.7078 0.719657 6.34005 1.08414L4.09664 3.30762C3.25167 4.14505 2.56108 4.82949 2.07132 5.43932C1.56203 6.07348 1.19337 6.71716 1.09489 7.4898C1.0517 7.82858 1.0517 8.17142 1.09489 8.5102C1.19337 9.28284 1.56203 9.92652 2.07132 10.5607C2.56108 11.1705 3.25167 11.855 4.09665 12.6924L6.34005 14.9159C6.7078 15.2803 7.30138 15.2777 7.66586 14.9099C8.03034 14.5422 8.02769 13.9486 7.65995 13.5841L5.45624 11.4C4.56187 10.5136 3.94837 9.90353 3.53324 9.38662C3.39833 9.21863 3.29307 9.07075 3.21135 8.9375H22C22.5178 8.9375 22.9375 8.51777 22.9375 8C22.9375 7.48223 22.5178 7.0625 22 7.0625H3.21135C3.29308 6.92925 3.39833 6.78137 3.53324 6.61338C3.94837 6.09647 4.56187 5.48642 5.45624 4.6L7.65995 2.41586Z" fill="#0F172A" stroke="#0F172A" strokeLinecap="round" />
                            </svg>
                            <h3 className=" text-yankeesBlue leading-8 pl-4 smx:pl-7 truncate">

                                {`${user.fname} ${user.lname}`.toLocaleUpperCase()}
                            </h3>
                        </div>
                        <div className="flex justify-end items-center space-x-4">
                            <div onClick={() => navigate("../singlecardholderpayment")} className="flex items-center rounded-lg border-2 border-lightGray cursor-pointer px-3 sm:px-5 py-1.5 sm:py-2.5">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.75 12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12H22.75ZM18.001 4L17.5505 4.59962L18.001 4ZM20 5.99903L19.4004 6.44953L19.431 6.49029L19.4669 6.52653L20 5.99903ZM21.4069 0.996654C21.405 0.582444 21.0677 0.248159 20.6535 0.250007C20.2393 0.251856 19.905 0.589137 19.9069 1.00335L21.4069 0.996654ZM20.6657 2.98571L21.4157 2.98237V2.98237L20.6657 2.98571ZM16.9857 6.66571L16.9824 7.41571L16.9857 6.66571ZM15.0034 5.90686C14.5891 5.90501 14.2519 6.2393 14.25 6.65351C14.2482 7.06772 14.5824 7.405 14.9967 7.40685L15.0034 5.90686ZM20.2572 5.90267L20.8503 6.36169V6.36169L20.2572 5.90267ZM19.9027 6.25717L20.3617 6.85029L20.3617 6.85029L19.9027 6.25717ZM20.0912 6.09117L20.6215 6.6215L20.0912 6.09117ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM12 2.75C14.0836 2.75 16.0044 3.43804 17.5505 4.59962L18.4515 3.40038C16.6546 2.05032 14.4197 1.25 12 1.25V2.75ZM17.5505 4.59962C18.2508 5.12582 18.8742 5.74916 19.4004 6.44953L20.5996 5.54852C19.9886 4.73519 19.2648 4.01145 18.4515 3.40038L17.5505 4.59962ZM19.9069 1.00335L19.9157 2.98906L21.4157 2.98237L21.4069 0.996654L19.9069 1.00335ZM16.9891 5.91572L15.0034 5.90686L14.9967 7.40685L16.9824 7.41571L16.9891 5.91572ZM19.9157 2.98906C19.9193 3.79848 19.9206 4.34217 19.8757 4.75351C19.8324 5.14976 19.7542 5.32713 19.664 5.44365L20.8503 6.36169C21.1793 5.93661 21.3089 5.44728 21.3668 4.91635C21.4232 4.4005 21.4192 3.75651 21.4157 2.98237L19.9157 2.98906ZM16.9824 7.41571C17.7565 7.41916 18.4005 7.42317 18.9164 7.36684C19.4473 7.30886 19.9366 7.17926 20.3617 6.85029L19.4437 5.66404C19.3271 5.75421 19.1498 5.83243 18.7535 5.8757C18.3422 5.92062 17.7985 5.91933 16.9891 5.91572L16.9824 7.41571ZM19.664 5.44365C19.6321 5.4849 19.5976 5.52404 19.5608 5.56084L20.6215 6.6215C20.7031 6.5399 20.7795 6.45314 20.8503 6.36169L19.664 5.44365ZM19.5608 5.56084C19.524 5.59764 19.4849 5.63211 19.4437 5.66404L20.3617 6.85029C20.4531 6.77952 20.5399 6.7031 20.6215 6.6215L19.5608 5.56084ZM19.4669 6.52653L19.558 6.61867L20.6243 5.56367L20.5331 5.47152L19.4669 6.52653Z" fill="#2D264B" />
                                    <path d="M12 9L12 11.6906C12 12.8176 12 13.3812 12.268 13.8453C12.5359 14.3094 13.024 14.5912 14 15.1547L14.5981 15.5" stroke="#2D264B" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span className="text-base font-extrabold hidden md:inline-block text-yankeesBlue pl-3">Payment History</span>
                            </div>
                            <button onClick={() => navigate("../addcardholdercard")} className="btn-secondary flex">
                                <svg className='mr-3' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.6 1.6C8.6 1.26863 8.33137 1 8 1C7.66863 1 7.4 1.26863 7.4 1.6L7.4 7.4H1.6C1.26863 7.4 1 7.66863 1 8C1 8.33137 1.26863 8.6 1.6 8.6H7.4V14.4C7.4 14.7314 7.66863 15 8 15C8.33137 15 8.6 14.7314 8.6 14.4V8.6H14.4C14.7314 8.6 15 8.33137 15 8C15 7.66863 14.7314 7.4 14.4 7.4H8.6L8.6 1.6Z" fill="white" stroke="white" strokeLinecap="round" />
                                </svg>
                                Add Card
                            </button>
                            <div
                                onClick={() => setListView(!listView)}


                                className="flex items-center rounded-lg border-2 border-lightGray cursor-pointer px-3 sm:px-5 py-2 sm:py-3">

                                {listView ? <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H15C15.4142 1.75 15.75 1.41421 15.75 1C15.75 0.585786 15.4142 0.25 15 0.25H1Z" fill="#1E293B" />
                                    <path d="M4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75H12C12.4142 7.75 12.75 7.41421 12.75 7C12.75 6.58579 12.4142 6.25 12 6.25H4Z" fill="#1E293B" />
                                    <path d="M6 12.25C5.58579 12.25 5.25 12.5858 5.25 13C5.25 13.4142 5.58579 13.75 6 13.75H10C10.4142 13.75 10.75 13.4142 10.75 13C10.75 12.5858 10.4142 12.25 10 12.25H6Z" fill="#1E293B" />
                                </svg> : <>
                                    {/* List view Icon */}
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 10C4 11.1046 3.10457 12 2 12C0.895431 12 3.49691e-07 11.1046 3.49691e-07 10C3.49691e-07 8.89543 0.895431 8 2 8C3.10457 8 4 8.89543 4 10Z" fill="#1E293B" />
                                        <path d="M12 10C12 11.1046 11.1046 12 10 12C8.89544 12 8 11.1046 8 10C8 8.89543 8.89544 8 10 8C11.1046 8 12 8.89543 12 10Z" fill="#1E293B" />
                                        <path d="M20 10C20 11.1046 19.1046 12 18 12C16.8954 12 16 11.1046 16 10C16 8.89543 16.8954 8 18 8C19.1046 8 20 8.89543 20 10Z" fill="#1E293B" />
                                        <path d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 6.99382e-07 3.10457 6.99382e-07 2C6.99382e-07 0.89543 0.895431 0 2 0C3.10457 0 4 0.89543 4 2Z" fill="#1E293B" />
                                        <path d="M12 2C12 3.10457 11.1046 4 10 4C8.89544 4 8.00001 3.10457 8.00001 2C8.00001 0.89543 8.89544 0 10 0C11.1046 0 12 0.89543 12 2Z" fill="#1E293B" />
                                        <path d="M20 2C20 3.10457 19.1046 4 18 4C16.8954 4 16 3.10457 16 2C16 0.89543 16.8954 0 18 0C19.1046 0 20 0.89543 20 2Z" fill="#1E293B" />
                                        <path d="M4 18C4 19.1046 3.10457 20 2 20C0.89543 20 0 19.1046 0 18C0 16.8954 0.89543 16 2 16C3.10457 16 4 16.8954 4 18Z" fill="#1E293B" />
                                        <path d="M12 18C12 19.1046 11.1046 20 10 20C8.89544 20 8.00001 19.1046 8.00001 18C8.00001 16.8954 8.89544 16 10 16C11.1046 16 12 16.8954 12 18Z" fill="#1E293B" />
                                        <path d="M20 18C20 19.1046 19.1046 20 18 20C16.8954 20 16 19.1046 16 18C16 16.8954 16.8954 16 18 16C19.1046 16 20 16.8954 20 18Z" fill="#1E293B" />
                                    </svg></>}
                                {/* card view Icon */}


                            </div>
                        </div>

                    </div>
                    <div className="pt-12 p-5 -mx-5">
                        {/* <div className="flex flex-wrap"> */}
                        {/* <div className="relative w-1/2 2xl:w-1/3 h-72 overflow-hidden px-3 2xl:mb-4">
                <div className="bg-[#0F172A] rounded-[32px] overflow-hidden">
                    <img src={CardBg} alt="Credit card background" className='w-full h-full object-cover' />
                    <div className="absolute inset-0 p-10">
                        <span className="text-lg text-white font-semibold">JOHNSON DOE</span>
                        <div className="flex flex-col pt-6">
                            <span className="text-[#94A3B8] text-base leading-7 font-normal">IndusInd Bank</span>
                            <span className="text-white text-2xl font-semibold">************9982</span>
                        </div>
                        <div className="flex flex-col pt-6">
                            <span className="text-[#94A3B8] text-base leading-7 font-normal">Total Credit</span>
                            <span className="text-white text-2xl font-semibold">₹3,00,000</span>
                        </div>
                    </div>
                </div>
            </div> */}
                        {cardList.length > 0 ?
                            !listView ?
                                <>
                                    {/* List View  */}
                                    <div className="sm:mt-9">
                                        <DataTable value={cardList} selectionMode="single" columnResizeMode={"expand"} resizableColumns={true} scrollable={true}
                                            onSelectionChange={(col) => {
                                                if (col && col.value._id) {
                                                    localStorage.setItem("card_id", col.value._id);
                                                    navigate("../singlecarddetails");
                                                }
                                            }}
                                            paginator rows={5}>
                                            {columns.map((col, i) => (
                                                <Column className="relative" key={col.field} field={col.field} header={col.header} />
                                            ))}
                                        </DataTable>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="flex justify-start flex-wrap sm:mt-9">
                                        {listCards.map((card) => {

                                            return (
                                                <>
                                                    <div className="relative w-full md:w-1/2 xl:w-1/3 overflow-hidden sm:px-3 2xl:mb-4 mb-4" onClick={() => { localStorage.setItem("card_id", card._id); navigate("../singlecarddetails") }}>
                                                        <div className="bg-[#0F172A] rounded-2xl lg:rounded-[32px] overflow-hidden relative max-w-[412px] md:mr-auto mx-auto">
                                                            <img
                                                                src={CardBg}
                                                                alt="Credit card background"
                                                                className="w-full h-full object-cover absolute inset-0 object-right"
                                                            />
                                                            <div className="px-5 py-7 md:p-10 relative z-10">
                                                                <div className='flex items-center'>

                                                                    <span className="text-lg text-white font-semibold pr-3">
                                                                        {card.card_holder}
                                                                    </span>

                                                                </div>

                                                                <div className="flex flex-col pt-3 lg:pt-6">
                                                                    <span className="text-[#94A3B8] text-sm lg:text-base font-normal">
                                                                        {card.bank_name}
                                                                    </span>
                                                                    <span className="text-white text-xl lg:text-2xl font-semibold">
                                                                        ********{card.card_number.toString().substr(-4)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between pt-3 lg:pt-6">
                                                                    <div className='flex flex-col'>
                                                                        <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                                                        </span>
                                                                        <span className="text-white text-xl lg:text-2xl font-semibold">
                                                                            {card.purpose}
                                                                        </span>
                                                                    </div>
                                                                    <div className='flex flex-col'>
                                                                        <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                                                        </span>
                                                                        <span className="text-white text-xl lg:text-2xl font-semibold">
                                                                            {card.card_type}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        )}
                                    </div>
                                </>
                            : <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center flex-col">
                                    <img
                                        src={creditCard}
                                        alt="Credit Card Images"
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="text-[#64748B] text-3xl font-normal pt-5">
                                        Please add your cards
                                    </span>
                                </div>
                            </div>}

                        {/* </div> */}
                    </div>
                    <Modal isOpen={dueAmountPop}>
                        <CardHolderDueAmount
                            handleClose={setDueAmountPop}
                            dueData={dueData}
                        />
                    </Modal>

                </div>
            }</>
    )
}
