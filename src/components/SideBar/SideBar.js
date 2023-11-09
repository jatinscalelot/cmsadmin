import React, { useState, useEffect } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import HelpIcon from "../../assets/svg/help.svg";
import LogoutIcon from "../../assets/svg/logout.svg";
import SearchIcon from "../../assets/svg/search.svg";
import Notification from "../../assets/svg/notification.svg";
import CardAdd from "../../assets/svg/newaddCard.svg";
import Profile from "../../assets/images/profile.png";
import BackArrow from "../../assets/svg/backArrow.svg";
// import Login from '../auth/Login'
import CardHolderList from "../Cardholder/CardHolderList";
import AdminAccountDetails from "../Admin/AdminAccountDetails";
import AdminCards from "../Admin/AdminCards";
import AdminAddCard from "../Admin/AdminAddCard";
import CreateAccount from "../Cardholder/CreateAccount";
import SingleCardHolderDetail from "../Cardholder/SingleCardHolderDetail";
import SingleCardHolderCardsList from "../Cardholder/SingleCardHolderCardsList";
import TransactionHistory from "../Transactions/TransactionHistory";
import Payments from "../Payments/Payments";
import SinglePaymentRequestDetails from "../Payments/SinglePaymentRequestDetails";
import SinglePaymentPaidDetails from "../Payments/SinglePaymentPaidDetails";
import Commission from "../Commission/Commission";
import CommissionPaidHistory from "../Commission/CommissionPaidHistory";
import CommissionUnpaidHistory from "../Commission/CommissionUnpaidHistory";
import CardHolderAddCard from "../Cardholder/CardHolderAddCard";
import SingleUserCommissionDetails from "../Commission/SingleUserCommissionDetails";
import { baseurl } from "../../api/baseurl";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import previewImage1 from "../../assets/svg/Previewimage.svg";
import AdminWallet from "../Admin/AdminWallet";
import SingleCardDetails from "../Cardholder/SingleCardDetails";
import CardHolderEditCard from "../Cardholder/CardHolderEditCard";
import CardList from "../Cards/CardList";
import CardDetails from "../Cards/CardDetails";
import EditCardDetails from "../Cards/EditCardDetails";
import AdminCardDetails from "../Admin/AdminCardDetails";
import AdminEditCard from "../Admin/AdminEditCard";
import SingleCardHolderPayment from "../Cardholder/SingleCardHolderPayment";
import Charges from "../Charges/Charges";
import { iconFunction } from "../../common/Icons/Icon";
import { useDispatch } from "react-redux";
import { removeToken } from "../auth/AuthSlice";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = localStorage.getItem("user");
  const [details, setDetails] = useState({});
  const [navbarOpen, setNavbarOpen] = useState(false);
  const header = {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  };

  const location = useLocation();
  const [loc, setLoc] = useState(location.pathname);
  const getCardDetails = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/user/user-profile`, {
        headers: header,
      });
      setDetails(response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  function getPath() {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/dashboard":
        return "Dashboard";
      case "/cardholder":
        return "Card Holder";
      case "/cards":
        return "All Cards";
      case "/payment":
        return "Payments";
      case "/transaction":
        return "Transactions";
      case "/commission":
        return "Profit";
      default:
        return "";
    }
  }
  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("./");
    }, 200);
  };

  // useEffect(() => {
  //   getCardDetails();
  // }, []);

  const logout = () => {
    navigate("/");
    dispatch(removeToken())
    // localStorage.removeItem("user");
    // // localStorage.removeItem("isLoggedIn");
    // localStorage.clear();


  };

  return (
    <div className="main flex min-h-screen bg-white">
      {/* <!-- Left Panel --> */}
      <div
        className={
          "leftPanel max-w-[230px] w-full bg-lightWhite border-[#CBD5E1] lg:translate-x-0 border-r-2 fixed left-0 inset-y-0 lg:relative z-30 anim " +
          (navbarOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex flex-col min-h-full relative">
          <button
            className="absolute top-3 right-3 lg:hidden"
            onClick={() => setNavbarOpen((prev) => !prev)}
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g id="Close">
                  <rect
                    id="Rectangle"
                    fillRule="nonzero"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  ></rect>
                  <line
                    x1="16.9999"
                    y1="7"
                    x2="7.00001"
                    y2="16.9999"
                    id="Path"
                    stroke="#0C0310"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                  <line
                    x1="7.00006"
                    y1="7"
                    x2="17"
                    y2="16.9999"
                    id="Path"
                    stroke="#0C0310"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></line>
                </g>
              </g>
            </svg>
          </button>
          <div className="mx-auto p-[64px]">
            <img src={Logo} alt="logo images" />
          </div>
          <nav className="SideNav px-[24px]">
            <NavLink
              to="../dashboard"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray "
            >
              {/* <img src={DashboardIcon} alt="DashboardIcon" /> */}
              {iconFunction("dashboard")}
              <span className="text-sm font-bold leading-5  pl-[13px]">
                Dashboard
              </span>
            </NavLink>
            <NavLink
              to="../cardholder"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              {/* <img src={CardHolderIcon} alt="DashboardIcon" /> */}
              {iconFunction("cardholder")}
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Cards Holder
              </span>
            </NavLink>
            <NavLink
              to="../cards"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              {/* <img src={CardHolderIcon} alt="DashboardIcon" /> */}
              {iconFunction("allcards")}
              <span className="text-sm font-bold leading-5 pl-[13px]">
                All Cards
              </span>
            </NavLink>
            <NavLink
              to="../payment"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              {/* <img src={PaymentIcon} alt="DashboardIcon" /> */}
              {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.95 1.84332L7.94167 6.51832H5.93333C5.6 6.51832 5.275 6.54332 4.95833 6.60998L5.79167 4.60998L5.825 4.53498L5.875 4.40165C5.9 4.34332 5.91667 4.29332 5.94167 4.25165C6.90833 2.00998 7.99167 1.30998 9.95 1.84332ZM15.6092 6.74165L15.5925 6.73332C15.0925 6.59165 14.5842 6.51665 14.0675 6.51665H8.85083L10.7258 2.15832L10.7508 2.09998C10.8675 2.14165 10.9925 2.19998 11.1175 2.24165L12.9592 3.01665C13.9842 3.44165 14.7008 3.88332 15.1425 4.41665C15.2175 4.51665 15.2842 4.60832 15.3508 4.71665C15.4258 4.83332 15.4842 4.94998 15.5175 5.07498C15.5508 5.14998 15.5758 5.21665 15.5925 5.29165C15.7175 5.71665 15.7258 6.19998 15.6092 6.74165ZM10.4333 14.715H10.6417C10.8917 14.715 11.1 14.49 11.1 14.215C11.1 13.865 11 13.815 10.7833 13.7317L10.4333 13.6066V14.715Z" fill="#94A3B8" />
                <path d="M15.24 7.93327C14.865 7.82494 14.4733 7.7666 14.065 7.7666H5.93167C5.365 7.7666 4.83167 7.87494 4.33167 8.0916C3.60009 8.40632 2.97667 8.92835 2.53833 9.59326C2.09999 10.2582 1.86592 11.0369 1.865 11.8333V13.4583C1.865 13.6583 1.88167 13.8499 1.90667 14.0499C2.09 16.6999 3.50667 18.1166 6.15667 18.2916C6.34833 18.3166 6.54 18.3333 6.74833 18.3333H13.2483C16.3317 18.3333 17.9567 16.8666 18.115 13.9499C18.1233 13.7916 18.1317 13.6249 18.1317 13.4583V11.8333C18.1305 10.9593 17.8489 10.1088 17.3284 9.40683C16.8079 8.70481 16.0759 8.18831 15.24 7.93327ZM11.065 12.9166C11.4483 13.0499 11.965 13.3333 11.965 14.2166C11.965 14.9749 11.3733 15.5833 10.64 15.5833H10.4317V15.7666C10.4317 16.0083 10.24 16.1999 9.99833 16.1999C9.75667 16.1999 9.565 16.0083 9.565 15.7666V15.5833H9.49C8.69 15.5833 8.03167 14.9083 8.03167 14.0749C8.03167 13.8333 8.22333 13.6416 8.465 13.6416C8.70667 13.6416 8.89834 13.8333 8.89834 14.0749C8.89834 14.4249 9.165 14.7166 9.49 14.7166H9.565V13.3083L8.93167 13.0833C8.54834 12.9499 8.03167 12.6666 8.03167 11.7833C8.03167 11.0249 8.62333 10.4166 9.35667 10.4166H9.565V10.2333C9.565 9.9916 9.75667 9.79994 9.99833 9.79994C10.24 9.79994 10.4317 9.9916 10.4317 10.2333V10.4166H10.5067C11.3067 10.4166 11.965 11.0916 11.965 11.9249C11.965 12.1666 11.7733 12.3583 11.5317 12.3583C11.29 12.3583 11.0983 12.1666 11.0983 11.9249C11.0983 11.5749 10.8317 11.2833 10.5067 11.2833H10.4317V12.6916L11.065 12.9166Z" fill="#94A3B8" />
                <path d="M8.9 11.7834C8.9 12.1334 9 12.1834 9.21667 12.2668L9.56667 12.3918V11.2834H9.35833C9.1 11.2834 8.9 11.5084 8.9 11.7834Z" />
              </svg> */}
              {iconFunction("payments")}
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Payments
              </span>
            </NavLink>
            <NavLink
              to="../charges"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              {/* <img src={TransactIons} alt="DashboardIcon" /> */}
              {iconFunction("transactions")}
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Charges
              </span>
            </NavLink>
            <NavLink
              to="../commission"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              {/* <img src={CommissionIcon} alt="DashboardIcon" /> */}
              {iconFunction("profit")}
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Profit
              </span>
            </NavLink>
            <NavLink
              to="../transaction"
              activeclassname="active"
              className="SideLink flex items-center rounded-lg px-[18px] py-4 text-lightGray"
            >
              {/* <img src={TransactIons} alt="DashboardIcon" /> */}
              {iconFunction("transactions")}
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Transactions
              </span>
            </NavLink>
          </nav>
          <div className="mt-auto px-[24px] mb-[80px]">
            <NavLink
              to="../dashboard"
              className="SideLink flex items-center rounded-lg px-[18px] py-3.5 text-lightGray"
            >
              <img src={HelpIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Help
              </span>
            </NavLink>
            <button
              onClick={() => logout()}
              className="SideLink w-full flex items-center rounded-lg px-[18px] py-3.5 text-lightGray"
            >
              <img src={LogoutIcon} alt="DashboardIcon" />
              <span className="text-sm font-bold leading-5 pl-[13px]">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Right Panel  */}
      <div className="w-full lg:max-w-[calc(100%-230px)] h-screen">
        {/* <!-- Top Header --> */}
        <div className="w-full bg-lightWhite p-3 sm:py-6 sm:px-6 xl:px-20 xl:py-7 flex flex-wrap items-center border-[#CBD5E1] border-b-2">
          <div className="w-full flex justify-between items-center ">
            <div className="flex items-center space-x-3">
              <button
                className="lg:hidden"
                onClick={() => setNavbarOpen((prev) => !prev)}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="#000"
                    clipRule="#000"
                    d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
                    fill="#000000"
                  />
                </svg>
              </button>
              <h2 className="block font-bold leading-[48px] text-[#0F172A]">
                {getPath()}
              </h2>
            </div>
            <div className="flex items-center space-x-3.5 sm:space-x-5">
              {/* <button type="button" className="">
                <img src={SearchIcon} alt="Search Icon" />
              </button> */}
              <div className="relative group">
                <button type="button" className="">
                  <img src={Notification} alt="Notification Icon" />
                </button>
                {/* Notification Box  */}
                <div className="absolute right-0 top-10 w-full min-w-[482px] bg-white rounded-2xl p-6 shadow-shadowbox invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-16 group-hover:translate-y-0 z-40 anim">
                  <h6 className="text-[#1F2937] text-lg font-bold leading-8 border-b-2 border-[#CBD5E1] pb-2">
                    Notifications
                  </h6>
                  <div className="space-y-6 pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                      <div className="space-x-4">
                        <button
                          type="button"
                          className="text-xs font-semibold text-[#64748B] border-[#64748B] border-2 rounded-lg py-2 px-3"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold bg-darkGreen text-white border-darkGreen border-2 rounded-lg py-2 px-3"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={Profile}
                            alt="Notification Images"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-yankeesBlue pl-4">
                          <div className="">
                            <span className="font-bold">Ray Arnold</span>
                            <span className="font-normal font-second pl-1">
                              profile verify request profile verify request
                            </span>
                          </div>
                          <span className="font-second text-[#9CA3AF] text-xs font-normal">
                            Yesterday at 11:42 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <button type="button" className=""><img src={CardAdd} alt="New ADD Card Icon" /></button> */}
              {/* <button
                type="button"
                className="relative flex items-center bg-azureishWhite rounded-full p-2 sm:py-[6px] sm:px-4 group"
              >
                <div className="relative">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="w-9 h-9 overflow-hidden rounded-full bg-white">
                        <img
                          src={
                            details?.profile_pic && details?.profile_pic !== ""
                              ? details?.profile_pic
                              : previewImage1
                          }
                          alt="Profile Avatar"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <span className="hidden sm:block text-left max-w-[120px] min-w-[120px] w-full text-sm font-bold leading-5 text-[#1E293B] ml-3 truncate">
                        {details?.first_name + " " + details?.last_name}
                      </span>
                    </div>
                    <img
                      src={BackArrow}
                      alt="Back Arrow Icon"
                      className="hidden sm:inline-block pl-2"
                    />
                  </div>
                </div>
                <div className="absolute w-full top-[54px] right-0 bg-white rounded-2xl shadow-shadowbox max-w-[218px] min-w-[218px] invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 z-40 anim">
                  <div className="">
                    <span
                      onClick={() => navigate("../adminaccountdetails")}
                      className="w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pt-4"
                    >
                      Account Details
                    </span>
                    <span
                      onClick={() => navigate("adminwallet")}
                      className="w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2"
                    >
                      My wallet
                    </span>
                    <span
                      onClick={() => navigate("transaction")}
                      className="w-full block text-left text-[#334155] hover:text-darkGreen text-sm font-medium anim px-6 py-2 pb-4"
                    >
                      Transactions
                    </span>
                  </div>
                </div>
              </button> */}
              <button className="py-2 px-4 text-base font-medium rounded bg-azureishWhite" onClick={() => { navigate("/resetpassword") }}>

                Reset Password
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Content In --> */}
        <div className="rightInContent">
          <Routes>
            <Route
              path="adminaccountdetails"
              element={<AdminAccountDetails />}
            />
            <Route path="adminwallet" element={<AdminWallet />} />
            <Route path="adminaddcard" element={<AdminAddCard />} />
            <Route path="admincards" element={<AdminCards />} />
            <Route path="admincarddetails" element={<AdminCardDetails />} />
            <Route path="admineditcard" element={<AdminEditCard />} />
            <Route path="dashboard">
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="cards">
              <Route index element={<CardList />} />
              <Route path="carddetails" element={<CardDetails />} />
              <Route path="editcarddetails" element={<EditCardDetails />} />

            </Route>
            <Route path="cardholder">
              <Route index element={<CardHolderList />} />
              <Route path="createaccount" element={<CreateAccount />} />
              <Route path="addcardholdercard" element={<CardHolderAddCard />} />
              <Route
                path="singlecardholderdetail"
                element={<SingleCardHolderDetail />}
              />
              <Route
                path="singlecardholdercardlist"
                element={<SingleCardHolderCardsList />}
              />
              <Route path="singlecarddetails" element={<SingleCardDetails />} />

              <Route
                path="editcardholdercard"
                element={<CardHolderEditCard />}
              />
              <Route
                path="singlecardholderpayment"
                element={<SingleCardHolderPayment />}
              />
            </Route>

            <Route path="transaction">
              <Route index element={<TransactionHistory />} />
            </Route>
            <Route path="charges">
              <Route index element={<Charges />} />
            </Route>
            <Route path="payment">
              <Route index element={<Payments />} />
              <Route
                path="singlepaymentrequestdetails"
                element={<SinglePaymentRequestDetails />}
              />
              <Route
                path="singlepaymentpaiddetails"
                element={<SinglePaymentPaidDetails />}
              />
            </Route>
            <Route path="commission">
              <Route index element={<Commission />} />
              <Route
                path="commissionpaidhistory"
                element={<CommissionPaidHistory />}
              />
              <Route
                path="commissionunpaidhistory"
                element={<CommissionUnpaidHistory />}
              />
              <Route
                path="singleusercommissiondetails"
                element={<SingleUserCommissionDetails />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
