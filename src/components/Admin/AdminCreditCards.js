import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
// import DataTable from 'react-data-table-component';
import CardBg from "../../assets/images/card.png";
import DemoImage from "../../assets/images/profile.png";
import creditCard from "../../assets/images/credit-card.png";
import moment from "moment/moment";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../../api/baseurl";
import { useNavigate } from "react-router-dom";

function AdminCreditCards({ list }) {
  // eslint-disable-next-line
  const [listCreditCard, setListCreditCard] = useState([]);
  let totalCreditBalance = 0;
  const navigate = useNavigate();
  // const getCreditCards = () => {
  //     setListCreditCard(cards?.filter((card) => card.card_type === "Credit Card"));
  // }
  const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState(false);

  const user = localStorage.getItem("user");
  const header = {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  };
  localStorage.removeItem("card_id");

  const getCreditCards = async () => {
    try {
      const response = await axios.get(`${baseurl}/api/cards/view-admin-card`, {
        headers: header,
      });
      if (response.data.IsSuccess) {
        // toast.success(response.data.Message);
        setListCreditCard(response.data.Data);
        setLoading(false);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  };

  const deleteCardHolder = async (id) => {
		try {
			const response = await axios.delete(`${baseurl}/api/cards/delete-admin-card?card_id=${id}`, { headers: header });
			if (response.data.IsSuccess) {
				setUpdate(!update);
				toast.success(response.data.Message);
			} else {
				toast.error(response.data.Message);
			}
		} catch (error) {
			console.log(error);
		}
	}
  listCreditCard.map(
    (balance) => (totalCreditBalance += balance.credit_amount)
  );

  useEffect(() => {
    getCreditCards();
  }, [update]);

  // const columns = [
  //     {
  //         name: 'Holder Name', selector: row => <div className="flex">
  //         <div className="w-12 h-12 rounded-full overflow-hidden">
  //             <img src={DemoImage} alt="" className='w-full h-full overflow-hidden' />
  //         </div>
  //         <div className="pl-4">
  //             <span className="text-lg font-bold text-[#2D3643] block">{row.card_holder_name}</span>
  //         </div>
  //     </div>
  //     },
  //     {
  //         name: 'Card category', selector: (row) => {

  //             return <div className="flex">
  //                 <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                     <path d="M4.00002 11.5413C3.65484 11.5413 3.37502 11.8212 3.37502 12.1663C3.37502 12.5115 3.65484 12.7913 4.00002 12.7913H5.66669C6.01187 12.7913 6.29169 12.5115 6.29169 12.1663C6.29169 11.8212 6.01187 11.5413 5.66669 11.5413H4.00002Z" fill="#1E293B" />
  //                     <path d="M8.16669 11.5413C7.82151 11.5413 7.54169 11.8212 7.54169 12.1663C7.54169 12.5115 7.82151 12.7913 8.16669 12.7913H11.5C11.8452 12.7913 12.125 12.5115 12.125 12.1663C12.125 11.8212 11.8452 11.5413 11.5 11.5413H8.16669Z" fill="#1E293B" />
  //                     <path fillRule="evenodd" clipRule="evenodd" d="M13.4542 0.766851C12.7339 0.708001 11.8378 0.708004 10.6947 0.708008H7.30539C6.16229 0.708004 5.26609 0.708001 4.5458 0.766851C3.81235 0.826776 3.20642 0.950823 2.65798 1.23027C1.75637 1.68966 1.02334 2.42269 0.563948 3.3243C0.161637 4.11388 0.0755182 5.04082 0.0510079 6.32104C0.0416871 6.80789 0.0416871 7.36238 0.0416871 7.99485V8.02764C0.0416832 9.17074 0.0416802 10.0669 0.10053 10.7872C0.160456 11.5207 0.284503 12.1266 0.563948 12.675C1.02334 13.5767 1.75637 14.3097 2.65798 14.7691C3.20642 15.0485 3.81235 15.1726 4.5458 15.2325C5.26608 15.2913 6.16226 15.2913 7.30533 15.2913H10.6947C11.8377 15.2913 12.734 15.2913 13.4542 15.2325C14.1877 15.1726 14.7936 15.0485 15.3421 14.7691C16.2437 14.3097 16.9767 13.5767 17.4361 12.675C17.7155 12.1266 17.8396 11.5207 17.8995 10.7872C17.9584 10.0669 17.9584 9.17077 17.9584 8.0277V7.99484C17.9584 7.36238 17.9584 6.80788 17.949 6.32104C17.9245 5.04082 17.8384 4.11388 17.4361 3.3243C16.9767 2.42269 16.2437 1.68966 15.3421 1.23027C14.7936 0.950823 14.1877 0.826776 13.4542 0.766851ZM3.22547 2.34403C3.56833 2.16933 3.99144 2.06631 4.64759 2.0127C5.31104 1.95849 6.15626 1.95801 7.33335 1.95801H10.6667C11.8438 1.95801 12.689 1.95849 13.3525 2.0127C14.0086 2.06631 14.4317 2.16933 14.7746 2.34403C15.441 2.68358 15.9828 3.22538 16.3223 3.89179C16.5341 4.30736 16.6354 4.82648 16.6786 5.70801H1.32141C1.36462 4.82648 1.46596 4.30736 1.67771 3.89179C2.01726 3.22538 2.55906 2.68358 3.22547 2.34403ZM1.29169 7.99967C1.29169 7.62071 1.2917 7.27528 1.2936 6.95801H16.7064C16.7083 7.27528 16.7084 7.62071 16.7084 7.99967C16.7084 9.17676 16.7079 10.022 16.6537 10.6854C16.6001 11.3416 16.497 11.7647 16.3223 12.1076C15.9828 12.774 15.441 13.3158 14.7746 13.6553C14.4317 13.83 14.0086 13.933 13.3525 13.9866C12.689 14.0409 11.8438 14.0413 10.6667 14.0413H7.33335C6.15626 14.0413 5.31104 14.0409 4.64759 13.9866C3.99144 13.933 3.56833 13.83 3.22547 13.6553C2.55906 13.3158 2.01726 12.774 1.67771 12.1076C1.50301 11.7647 1.39999 11.3416 1.34638 10.6854C1.29217 10.022 1.29169 9.17676 1.29169 7.99967Z" fill="#1E293B" />
  //                 </svg>
  //                 <div className="text-lg font-semibold text-yankeesBlue">
  //                     {row.card_category}
  //                 </div>
  //             </div>
  //         }
  //     },
  //     {
  //         name: 'Bank name', selector: (row) => {
  //             return <div className="text-lg font-semibold text-yankeesBlue">{row.card_bank_name}</div>
  //         }
  //     },
  //     {
  //         name: 'Card', selector: (row) => {
  //             return <div className="text-lg font-semibold text-yankeesBlue">
  //                 ********{(row.card_number).toString().substr(-4)}

  //             </div>
  //         }
  //     },
  //     {
  //         name: 'Card expiry', selector: (row) => {
  //             return <div className="text-lg font-semibold text-yankeesBlue">
  //                 {moment(row.card_exp_date).format('ll')}
  //             </div>
  //         }
  //     },
  //     {
  //         name: 'Total credit', selector: (row) => {
  //             return <div className="text-lg font-semibold text-[#E52B2B]">
  //                 ₹ {row.credit_amount}
  //             </div>
  //         }
  //     }
  // ];
  const columns = [
    {
      header: "Holder Name",
      field: (row) => {
        return (
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={DemoImage}
                alt=""
                className="w-full h-full overflow-hidden"
              />
            </div>
            <div className="pl-4">
              <span className="text-lg font-bold text-[#2D3643] block">
                {row.card_holder_name}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      header: "Card Category",
      field: (row) => {
        return (
          <div className="flex items-center space-x-2">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.00002 11.5413C3.65484 11.5413 3.37502 11.8212 3.37502 12.1663C3.37502 12.5115 3.65484 12.7913 4.00002 12.7913H5.66669C6.01187 12.7913 6.29169 12.5115 6.29169 12.1663C6.29169 11.8212 6.01187 11.5413 5.66669 11.5413H4.00002Z"
                fill="#1E293B"
              />
              <path
                d="M8.16669 11.5413C7.82151 11.5413 7.54169 11.8212 7.54169 12.1663C7.54169 12.5115 7.82151 12.7913 8.16669 12.7913H11.5C11.8452 12.7913 12.125 12.5115 12.125 12.1663C12.125 11.8212 11.8452 11.5413 11.5 11.5413H8.16669Z"
                fill="#1E293B"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4542 0.766851C12.7339 0.708001 11.8378 0.708004 10.6947 0.708008H7.30539C6.16229 0.708004 5.26609 0.708001 4.5458 0.766851C3.81235 0.826776 3.20642 0.950823 2.65798 1.23027C1.75637 1.68966 1.02334 2.42269 0.563948 3.3243C0.161637 4.11388 0.0755182 5.04082 0.0510079 6.32104C0.0416871 6.80789 0.0416871 7.36238 0.0416871 7.99485V8.02764C0.0416832 9.17074 0.0416802 10.0669 0.10053 10.7872C0.160456 11.5207 0.284503 12.1266 0.563948 12.675C1.02334 13.5767 1.75637 14.3097 2.65798 14.7691C3.20642 15.0485 3.81235 15.1726 4.5458 15.2325C5.26608 15.2913 6.16226 15.2913 7.30533 15.2913H10.6947C11.8377 15.2913 12.734 15.2913 13.4542 15.2325C14.1877 15.1726 14.7936 15.0485 15.3421 14.7691C16.2437 14.3097 16.9767 13.5767 17.4361 12.675C17.7155 12.1266 17.8396 11.5207 17.8995 10.7872C17.9584 10.0669 17.9584 9.17077 17.9584 8.0277V7.99484C17.9584 7.36238 17.9584 6.80788 17.949 6.32104C17.9245 5.04082 17.8384 4.11388 17.4361 3.3243C16.9767 2.42269 16.2437 1.68966 15.3421 1.23027C14.7936 0.950823 14.1877 0.826776 13.4542 0.766851ZM3.22547 2.34403C3.56833 2.16933 3.99144 2.06631 4.64759 2.0127C5.31104 1.95849 6.15626 1.95801 7.33335 1.95801H10.6667C11.8438 1.95801 12.689 1.95849 13.3525 2.0127C14.0086 2.06631 14.4317 2.16933 14.7746 2.34403C15.441 2.68358 15.9828 3.22538 16.3223 3.89179C16.5341 4.30736 16.6354 4.82648 16.6786 5.70801H1.32141C1.36462 4.82648 1.46596 4.30736 1.67771 3.89179C2.01726 3.22538 2.55906 2.68358 3.22547 2.34403ZM1.29169 7.99967C1.29169 7.62071 1.2917 7.27528 1.2936 6.95801H16.7064C16.7083 7.27528 16.7084 7.62071 16.7084 7.99967C16.7084 9.17676 16.7079 10.022 16.6537 10.6854C16.6001 11.3416 16.497 11.7647 16.3223 12.1076C15.9828 12.774 15.441 13.3158 14.7746 13.6553C14.4317 13.83 14.0086 13.933 13.3525 13.9866C12.689 14.0409 11.8438 14.0413 10.6667 14.0413H7.33335C6.15626 14.0413 5.31104 14.0409 4.64759 13.9866C3.99144 13.933 3.56833 13.83 3.22547 13.6553C2.55906 13.3158 2.01726 12.774 1.67771 12.1076C1.50301 11.7647 1.39999 11.3416 1.34638 10.6854C1.29217 10.022 1.29169 9.17676 1.29169 7.99967Z"
                fill="#1E293B"
              />
            </svg>
            <div className="text-lg font-semibold text-yankeesBlue capitalize">
              {row.card_category}
            </div>
          </div>
        );
      },
    },
    {
      header: "Bank Name",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-yankeesBlue">
            {row.card_bank_name}
          </div>
        );
      },
    },
    {
      header: "Card Number",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-yankeesBlue">
            ********{row.card_number.toString().substr(-4)}
          </div>
        );
      },
    },
    {
      header: "Card Expiry",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-yankeesBlue">
            {moment(row.card_exp_date).format("ll")}
          </div>
        );
      },
    },
    {
      header: "Total Credit",
      field: (row) => {
        return (
          <div className="text-lg font-semibold text-[#E52B2B]">
            ₹ {row.credit_amount}
          </div>
        );
      },
    },
    {
			header: 'Actions', field: (row) => (
				// return (
				<div className="flex justify-start items-center">
					{/* <button type="button" className="p-3" onClick={(e) => { localStorage.setItem("card_id", row.card_id); navigate('../admineditcard'); e.stopPropagation(); }}>
						<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.06107 19.2164L3.50191 18.6096H3.50191L3.06107 19.2164ZM1.95491 18.1102L1.34815 18.5511L1.34815 18.5511L1.95491 18.1102ZM16.9389 19.2164L16.4981 18.6096H16.4981L16.9389 19.2164ZM18.0451 18.1102L17.4383 17.6694L18.0451 18.1102ZM1.95491 4.23238L1.34815 3.79155L1.34815 3.79155L1.95491 4.23238ZM3.06107 3.12623L3.50191 3.73299V3.73299L3.06107 3.12623ZM8.00899 2.92846C8.42317 2.9235 8.75491 2.58371 8.74995 2.16953C8.74498 1.75534 8.40519 1.42361 7.99101 1.42857L8.00899 2.92846ZM19.7427 13.1803C19.7477 12.7661 19.416 12.4263 19.0018 12.4214C18.5876 12.4164 18.2478 12.7481 18.2428 13.1623L19.7427 13.1803ZM10.7976 15.1758L10.7147 14.4303L10.7976 15.1758ZM6.67777 14.8783L6.14744 15.4086L6.14744 15.4086L6.67777 14.8783ZM6.3803 10.7585L7.12571 10.8413L6.3803 10.7585ZM7.5274 8.3718L6.99707 7.84147L7.5274 8.3718ZM6.64293 9.41572L5.96696 9.09083L5.96695 9.09083L6.64293 9.41572ZM13.1843 14.0287L13.7146 14.559L13.1843 14.0287ZM12.1403 14.9131L12.4652 15.5891H12.4652L12.1403 14.9131ZM10 19.4213C8.10843 19.4213 6.74999 19.4203 5.69804 19.3063C4.66013 19.1939 4.00992 18.9787 3.50191 18.6096L2.62024 19.8232C3.42656 20.409 4.37094 20.6713 5.53648 20.7976C6.68798 20.9223 8.14184 20.9213 10 20.9213V19.4213ZM0.25 11.1713C0.25 13.0295 0.248971 14.4833 0.373728 15.6348C0.500006 16.8004 0.762324 17.7448 1.34815 18.5511L2.56168 17.6694C2.19259 17.1614 1.97745 16.5112 1.865 15.4733C1.75103 14.4213 1.75 13.0629 1.75 11.1713H0.25ZM3.50191 18.6096C3.14111 18.3475 2.82382 18.0302 2.56168 17.6694L1.34815 18.5511C1.70281 19.0392 2.13209 19.4685 2.62024 19.8232L3.50191 18.6096ZM10 20.9213C11.8582 20.9213 13.312 20.9223 14.4635 20.7976C15.6291 20.6713 16.5734 20.409 17.3798 19.8232L16.4981 18.6096C15.9901 18.9787 15.3399 19.1939 14.302 19.3063C13.25 19.4203 11.8916 19.4213 10 19.4213V20.9213ZM17.4383 17.6694C17.1762 18.0302 16.8589 18.3475 16.4981 18.6096L17.3798 19.8232C17.8679 19.4685 18.2972 19.0392 18.6518 18.5511L17.4383 17.6694ZM1.75 11.1713C1.75 9.27974 1.75103 7.9213 1.865 6.86936C1.97745 5.83144 2.19259 5.18123 2.56168 4.67322L1.34815 3.79155C0.762324 4.59787 0.500006 5.54225 0.373728 6.70779C0.248971 7.85929 0.25 9.31315 0.25 11.1713H1.75ZM2.62023 2.51946C2.13209 2.87412 1.70281 3.3034 1.34815 3.79155L2.56168 4.67322C2.82382 4.31242 3.14111 3.99513 3.50191 3.73299L2.62023 2.51946ZM7.99101 1.42857C5.56449 1.45766 3.89894 1.59043 2.62023 2.51946L3.50191 3.73299C4.33627 3.1268 5.50819 2.95844 8.00899 2.92846L7.99101 1.42857ZM18.2428 13.1623C18.2129 15.6631 18.0445 16.835 17.4383 17.6694L18.6518 18.5511C19.5809 17.2724 19.7137 15.6068 19.7427 13.1803L18.2428 13.1623ZM18.0257 8.12652L12.6539 13.4983L13.7146 14.559L19.0864 9.18718L18.0257 8.12652ZM8.05773 8.90213L13.4295 3.53033L12.3689 2.46967L6.99707 7.84147L8.05773 8.90213ZM10.7147 14.4303C9.54475 14.5603 8.74843 14.647 8.15674 14.6279C7.58517 14.6094 7.35441 14.4943 7.2081 14.348L6.14744 15.4086C6.68084 15.942 7.36328 16.103 8.10833 16.1271C8.83326 16.1505 9.75698 16.046 10.8804 15.9212L10.7147 14.4303ZM5.63488 10.6757C5.51006 11.7991 5.40557 12.7228 5.42898 13.4477C5.45304 14.1928 5.61405 14.8752 6.14744 15.4086L7.2081 14.348C7.06179 14.2016 6.94665 13.9709 6.9282 13.3993C6.90909 12.8076 6.99571 12.0113 7.12571 10.8413L5.63488 10.6757ZM6.99707 7.84147C6.54195 8.2966 6.18261 8.64213 5.96696 9.09083L7.31891 9.74061C7.39835 9.57533 7.53029 9.42957 8.05773 8.90213L6.99707 7.84147ZM7.12571 10.8413C7.20808 10.1 7.23947 9.90589 7.31891 9.74061L5.96695 9.09083C5.7513 9.53953 5.70596 10.036 5.63488 10.6757L7.12571 10.8413ZM12.6539 13.4983C12.1265 14.0258 11.9807 14.1577 11.8155 14.2372L12.4652 15.5891C12.9139 15.3734 13.2595 15.0141 13.7146 14.559L12.6539 13.4983ZM10.8804 15.9212C11.5201 15.8501 12.0165 15.8048 12.4652 15.5891L11.8155 14.2372C11.6502 14.3166 11.4561 14.348 10.7147 14.4303L10.8804 15.9212ZM18.0257 3.53033C18.7074 4.21199 19.1642 4.67101 19.4598 5.05849C19.7422 5.42866 19.8061 5.64413 19.8061 5.82843H21.3061C21.3061 5.1843 21.0366 4.65222 20.6523 4.14862C20.2813 3.66232 19.7381 3.12134 19.0864 2.46967L18.0257 3.53033ZM19.0864 9.18718C19.7381 8.53551 20.2813 7.99453 20.6523 7.50824C21.0366 7.00463 21.3061 6.47256 21.3061 5.82843H19.8061C19.8061 6.01272 19.7422 6.22819 19.4598 6.59836C19.1642 6.98584 18.7074 7.44486 18.0257 8.12652L19.0864 9.18718ZM19.0864 2.46967C18.4347 1.818 17.8937 1.27476 17.4074 0.903733C16.9038 0.519499 16.3718 0.25 15.7276 0.25V1.75C15.9119 1.75 16.1274 1.81383 16.4976 2.09627C16.8851 2.3919 17.3441 2.84867 18.0257 3.53033L19.0864 2.46967ZM13.4295 3.53033C14.1112 2.84867 14.5702 2.3919 14.9577 2.09627C15.3279 1.81383 15.5433 1.75 15.7276 1.75V0.25C15.0835 0.25 14.5514 0.519499 14.0478 0.903733C13.5615 1.27476 13.0206 1.818 12.3689 2.46967L13.4295 3.53033ZM19.0864 8.12652L13.4295 2.46967L12.3689 3.53033L18.0257 9.18718L19.0864 8.12652Z" fill="#0F172A" />
						</svg>

					</button> */}
					<button type="button" className="p-3" onClick={(e) => { deleteCardHolder(row.card_id); e.stopPropagation(); }}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.5172 12.7795L19.26 12.8829L18.5172 12.7795ZM18.2549 14.6645L18.9977 14.7679L18.2549 14.6645ZM5.74514 14.6645L6.48798 14.5611L5.74514 14.6645ZM5.4828 12.7795L4.73996 12.8829L5.4828 12.7795ZM9.18365 21.7368L8.89206 22.4278L9.18365 21.7368ZM6.47508 18.5603L7.17907 18.3017L6.47508 18.5603ZM17.5249 18.5603L18.2289 18.819V18.819L17.5249 18.5603ZM14.8164 21.7368L14.5248 21.0458H14.5248L14.8164 21.7368ZM5.74664 8.92906C5.70746 8.5167 5.34142 8.21418 4.92906 8.25336C4.5167 8.29254 4.21418 8.65858 4.25336 9.07094L5.74664 8.92906ZM19.7466 9.07094C19.7858 8.65858 19.4833 8.29254 19.0709 8.25336C18.6586 8.21418 18.2925 8.5167 18.2534 8.92906L19.7466 9.07094ZM20 7.75C20.4142 7.75 20.75 7.41421 20.75 7C20.75 6.58579 20.4142 6.25 20 6.25V7.75ZM4 6.25C3.58579 6.25 3.25 6.58579 3.25 7C3.25 7.41421 3.58579 7.75 4 7.75V6.25ZM9.25 18C9.25 18.4142 9.58579 18.75 10 18.75C10.4142 18.75 10.75 18.4142 10.75 18H9.25ZM10.75 10C10.75 9.58579 10.4142 9.25 10 9.25C9.58579 9.25 9.25 9.58579 9.25 10H10.75ZM13.25 18C13.25 18.4142 13.5858 18.75 14 18.75C14.4142 18.75 14.75 18.4142 14.75 18H13.25ZM14.75 10C14.75 9.58579 14.4142 9.25 14 9.25C13.5858 9.25 13.25 9.58579 13.25 10H14.75ZM16 7V7.75H16.75V7H16ZM8 7H7.25V7.75H8V7ZM17.7744 12.6761L17.512 14.5611L18.9977 14.7679L19.26 12.8829L17.7744 12.6761ZM6.48798 14.5611L6.22564 12.6761L4.73996 12.8829L5.0023 14.7679L6.48798 14.5611ZM12 21.25C10.4708 21.25 9.92544 21.2358 9.47524 21.0458L8.89206 22.4278C9.68914 22.7642 10.6056 22.75 12 22.75V21.25ZM5.0023 14.7679C5.282 16.7777 5.43406 17.9017 5.77109 18.819L7.17907 18.3017C6.91156 17.5736 6.77851 16.6488 6.48798 14.5611L5.0023 14.7679ZM9.47524 21.0458C8.55279 20.6566 7.69496 19.7058 7.17907 18.3017L5.77109 18.819C6.3857 20.4918 7.48205 21.8328 8.89206 22.4278L9.47524 21.0458ZM17.512 14.5611C17.2215 16.6488 17.0884 17.5736 16.8209 18.3017L18.2289 18.819C18.5659 17.9017 18.718 16.7777 18.9977 14.7679L17.512 14.5611ZM12 22.75C13.3944 22.75 14.3109 22.7642 15.1079 22.4278L14.5248 21.0458C14.0746 21.2358 13.5292 21.25 12 21.25V22.75ZM16.8209 18.3017C16.305 19.7058 15.4472 20.6566 14.5248 21.0458L15.1079 22.4278C16.5179 21.8328 17.6143 20.4918 18.2289 18.819L16.8209 18.3017ZM6.22564 12.6761C6.00352 11.08 5.83766 9.88703 5.74664 8.92906L4.25336 9.07094C4.34819 10.069 4.51961 11.2995 4.73996 12.8829L6.22564 12.6761ZM19.26 12.8829C19.4804 11.2995 19.6518 10.069 19.7466 9.07094L18.2534 8.92906C18.1623 9.88702 17.9965 11.08 17.7744 12.6761L19.26 12.8829ZM20 6.25H4V7.75H20V6.25ZM10.75 18V10H9.25V18H10.75ZM14.75 18V10H13.25V18H14.75ZM15.25 6V7H16.75V6H15.25ZM16 6.25H8V7.75H16V6.25ZM8.75 7V6H7.25V7H8.75ZM12 2.75C13.7949 2.75 15.25 4.20507 15.25 6H16.75C16.75 3.37665 14.6234 1.25 12 1.25V2.75ZM12 1.25C9.37665 1.25 7.25 3.37665 7.25 6H8.75C8.75 4.20507 10.2051 2.75 12 2.75V1.25Z" fill="#E52B2B" />
						</svg>
					</button>
				</div>
			)
		},
  ];
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center pt-5">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : (
        <div className="wrapper min-h-full px-0">
          <div className="relative flex flex-wrap items-center- justify-start mt-3 sm:mt-5 md:mb-[50px]">
            <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
              <div className="bg-lightWhite py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                <h2 className="text-darkGreen mb-3">₹ {totalCreditBalance}</h2>
                <span className="text-[#64748B] text-xl font-semibold whitespace-nowrap">
                  Total Credit Amount
                </span>
              </div>
            </div>
            {/* <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
              <div className="bg-lightWhite py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                <h2 className="text-yankeesBlue mb-3">₹ 20,000</h2>
                <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                  Total Unpaid Profit Amount
                </span>
              </div>
            </div> */}
          </div>
          {!list ? (
            <>
              {/* List View  */}
              <div className="mt-9">
                {/* <DataTable value={listCreditCard}>
                        {columns.map((col, i) => (
                            <Column key={col.field} field={col.field} header={col.header} />
                        ))}
                    </DataTable> */}
                <DataTable
                  value={listCreditCard}
                  columnResizeMode={"expand"} 
                  resizableColumns={true} 
                  scrollable={true}
                  paginator
                  rows={5}
                  selectionMode="single"
                  onSelectionChange={(col) => {
                    localStorage.setItem("card_id", col.value.card_id);
                    navigate("../admincarddetails");
                  }}
                >
                  {columns.map((col, i) => (
                    <Column
                      key={col.field}
                      field={col.field}
                      header={col.header}
                    />
                  ))}
                </DataTable>
              </div>
            </>
          ) : (
            <>
              {/* Card View  */}
              <div className="flex justify-start flex-wrap mt-5 md:mt-9">
                {listCreditCard.length > 0 ? (
                  listCreditCard.map((card, i) => (
                    <div
                      key={i}
                      className="relative w-full md:w-1/2 xl:w-1/3 cursor-pointer overflow-hidden sm:px-3 2xl:mb-4 mb-4"
                      onClick={() => {
                        localStorage.setItem("card_id", card.card_id);
                        navigate("../admincarddetails");
                      }}
                    >
                      <div className="bg-[#0F172A] rounded-2xl lg:rounded-[32px] overflow-hidden relative max-w-[412px] md:mr-auto mx-auto">
                        <img
                          src={CardBg}
                          alt="Credit card background"
                          className="w-full h-full object-cover absolute inset-0 object-right"
                        />
                        <div className="px-5 py-7 md:p-10 relative z-10">
                          <div className="flex items-center">
                            <span className="text-lg text-white font-semibold pr-3">
                              {card.card_holder_name}
                            </span>
                            <svg
                              width="40"
                              height="13"
                              viewBox="0 0 40 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M37.0367 12.8124L36.6617 10.9277H32.4717L31.805 12.799L28.4467 12.8057C30.0455 8.94109 31.6477 5.07794 33.2533 1.21624C33.5267 0.561211 34.0117 0.227836 34.7267 0.231186C35.2733 0.236212 36.165 0.236211 37.4033 0.232861L40 12.8073L37.0367 12.8124ZM33.415 8.34613H36.115L35.1067 3.62191L33.415 8.34613ZM11.7667 0.22951L15.1433 0.232861L9.92333 12.814L6.505 12.8107C5.64541 9.48752 4.79652 6.16156 3.95833 2.83286C3.79167 2.16946 3.46167 1.70541 2.82667 1.48595C2.26167 1.28995 1.32 0.988402 0 0.577964V0.234537H5.395C6.32833 0.234537 6.87333 0.688531 7.04833 1.61997C7.225 2.55309 7.66833 4.92861 8.38167 8.74652L11.7667 0.22951ZM19.7833 0.232861L17.1133 12.8107L13.9 12.8073L16.5667 0.22951L19.7833 0.232861ZM26.3 0C27.2617 0 28.4733 0.301547 29.17 0.577964L28.6067 3.18634C27.9767 2.9317 26.94 2.58827 26.0683 2.6C24.8017 2.62178 24.0183 3.15619 24.0183 3.66882C24.0183 4.50309 25.3783 4.92358 26.7783 5.83492C28.3767 6.87358 28.5867 7.8067 28.5667 8.82023C28.545 10.9244 26.7783 13 23.0517 13C21.3517 12.9749 20.7383 12.8308 19.3517 12.3366L19.9383 9.6143C21.35 10.209 21.9483 10.3983 23.155 10.3983C24.26 10.3983 25.2083 9.94936 25.2167 9.16701C25.2233 8.61082 24.8833 8.33441 23.6433 7.64755C22.4033 6.95902 20.6633 6.0058 20.6867 4.09265C20.715 1.64343 23.0233 0 26.3017 0H26.3Z"
                                fill="white"
                              />
                            </svg>
                          </div>

                          <div className="flex flex-col pt-3 lg:pt-6">
                            <span className="text-[#94A3B8] text-sm lg:text-base font-normal">
                              {card.card_bank_name}
                            </span>
                            <span className="text-white text-xl lg:text-2xl font-semibold">
                              ********{card.card_number.toString().substr(-4)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-3 lg:pt-6">
                            <div className="flex flex-col">
                              <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                Total Credit
                              </span>
                              <span className="text-white text-xl lg:text-2xl font-semibold">
                                ₹ {card.credit_amount}{" "}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                Due Date
                              </span>
                              <span className="text-white text-xl lg:text-2xl font-semibold">
                                29 Dec 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center">
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
                  </div>
                )}
              </div>
            </>
          )}
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
      )}
    </>
  );
}

export default AdminCreditCards;
