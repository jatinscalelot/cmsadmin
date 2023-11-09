import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
// import DataTable from 'react-data-table-component';
import { DataTable } from "primereact/datatable";
import CardBg from "../../assets/images/card.png";
import DemoImage from "../../assets/images/profile.png";
import creditCard from "../../assets/images/credit-card.png";
import moment from "moment/moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { baseurl } from "../../api/baseurl";
import { ProgressSpinner } from "primereact/progressspinner";

function AdminDebitCards({ list }) {
  // eslint-disable-next-line
  const [listDebitCard, setListDebitCard] = useState([]);
  let totalAvailableBalance = 0;
  const [loading, setLoading] = useState(true);



  const user = localStorage.getItem("user");
  const header = {
    Authorization: `Bearer ${JSON.parse(user)?.token}`,
  };

  const getDebitCards = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/cards/view-admin-card?card_type=Debit Card`,
        { headers: header }
      );
      if (response.data.IsSuccess) {
        // toast.success(response.data.Message);
        setListDebitCard(response.data.Data);
        setLoading(false);
      } else {
        toast.error("Something went wrong!!");
      }
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(error);
    }
  };
  listDebitCard.map(
    (balance) => (totalAvailableBalance += balance.available_balance)
  );

  useEffect(() => {
    getDebitCards();
  }, []);

  const columns = [
    {
      header: "Holder Name",
      field: (row) => (
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
      ),
    },
    // {
    //   header: "Card category",
    //   field: (row) => {
    //     return (
    //       <div className="flex item-center">
    //         <svg
    //           width="18"
    //           height="16"
    //           viewBox="0 0 18 16"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M4.00002 11.5413C3.65484 11.5413 3.37502 11.8212 3.37502 12.1663C3.37502 12.5115 3.65484 12.7913 4.00002 12.7913H5.66669C6.01187 12.7913 6.29169 12.5115 6.29169 12.1663C6.29169 11.8212 6.01187 11.5413 5.66669 11.5413H4.00002Z"
    //             fill="#1E293B"
    //           />
    //           <path
    //             d="M8.16669 11.5413C7.82151 11.5413 7.54169 11.8212 7.54169 12.1663C7.54169 12.5115 7.82151 12.7913 8.16669 12.7913H11.5C11.8452 12.7913 12.125 12.5115 12.125 12.1663C12.125 11.8212 11.8452 11.5413 11.5 11.5413H8.16669Z"
    //             fill="#1E293B"
    //           />
    //           <path
    //             fillRule="evenodd"
    //             clipRule="evenodd"
    //             d="M13.4542 0.766851C12.7339 0.708001 11.8378 0.708004 10.6947 0.708008H7.30539C6.16229 0.708004 5.26609 0.708001 4.5458 0.766851C3.81235 0.826776 3.20642 0.950823 2.65798 1.23027C1.75637 1.68966 1.02334 2.42269 0.563948 3.3243C0.161637 4.11388 0.0755182 5.04082 0.0510079 6.32104C0.0416871 6.80789 0.0416871 7.36238 0.0416871 7.99485V8.02764C0.0416832 9.17074 0.0416802 10.0669 0.10053 10.7872C0.160456 11.5207 0.284503 12.1266 0.563948 12.675C1.02334 13.5767 1.75637 14.3097 2.65798 14.7691C3.20642 15.0485 3.81235 15.1726 4.5458 15.2325C5.26608 15.2913 6.16226 15.2913 7.30533 15.2913H10.6947C11.8377 15.2913 12.734 15.2913 13.4542 15.2325C14.1877 15.1726 14.7936 15.0485 15.3421 14.7691C16.2437 14.3097 16.9767 13.5767 17.4361 12.675C17.7155 12.1266 17.8396 11.5207 17.8995 10.7872C17.9584 10.0669 17.9584 9.17077 17.9584 8.0277V7.99484C17.9584 7.36238 17.9584 6.80788 17.949 6.32104C17.9245 5.04082 17.8384 4.11388 17.4361 3.3243C16.9767 2.42269 16.2437 1.68966 15.3421 1.23027C14.7936 0.950823 14.1877 0.826776 13.4542 0.766851ZM3.22547 2.34403C3.56833 2.16933 3.99144 2.06631 4.64759 2.0127C5.31104 1.95849 6.15626 1.95801 7.33335 1.95801H10.6667C11.8438 1.95801 12.689 1.95849 13.3525 2.0127C14.0086 2.06631 14.4317 2.16933 14.7746 2.34403C15.441 2.68358 15.9828 3.22538 16.3223 3.89179C16.5341 4.30736 16.6354 4.82648 16.6786 5.70801H1.32141C1.36462 4.82648 1.46596 4.30736 1.67771 3.89179C2.01726 3.22538 2.55906 2.68358 3.22547 2.34403ZM1.29169 7.99967C1.29169 7.62071 1.2917 7.27528 1.2936 6.95801H16.7064C16.7083 7.27528 16.7084 7.62071 16.7084 7.99967C16.7084 9.17676 16.7079 10.022 16.6537 10.6854C16.6001 11.3416 16.497 11.7647 16.3223 12.1076C15.9828 12.774 15.441 13.3158 14.7746 13.6553C14.4317 13.83 14.0086 13.933 13.3525 13.9866C12.689 14.0409 11.8438 14.0413 10.6667 14.0413H7.33335C6.15626 14.0413 5.31104 14.0409 4.64759 13.9866C3.99144 13.933 3.56833 13.83 3.22547 13.6553C2.55906 13.3158 2.01726 12.774 1.67771 12.1076C1.50301 11.7647 1.39999 11.3416 1.34638 10.6854C1.29217 10.022 1.29169 9.17676 1.29169 7.99967Z"
    //             fill="#1E293B"
    //           />
    //         </svg>
    //         <div className="text-lg font-semibold text-yankeesBlue">
    //           {row.card_category}
    //         </div>
    //       </div>
    //     );
    //   },
    // },
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
            ₹ {row.available_balance}
          </div>
        );
      },
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
        <>
          <div className="wrapper min-h-full px-0">
            <div className="relative flex flex-wrap items-center- justify-start mt-3 sm:mt-5 md:mb-[50px]">
              <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                <div className="bg-lightWhite py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                  <h2 className="text-darkGreen mb-3">₹ {totalAvailableBalance}</h2>
                  <span className="text-[#64748B] text-xl font-semibold whitespace-nowrap">
                    Total Due Amount
                  </span>
                </div>
              </div>
              <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
                <div className="bg-lightWhite py-7 px-7 2xl::px-11 rounded-xl h-full border border-[#CBD5E1]">
                  <h2 className="text-yankeesBlue mb-3">₹ 20,000</h2>
                  <span className="text-[#64748B]  text-2xl:text-base xl font-semibold">
                    Total Unpaid Profit Amount
                  </span>
                </div>
              </div>
            </div>
            {!list ? (
              <>
                {/* List View  */}
                <div className="mt-9">
                  {/* <DataTable columns={columns} data={listDebitCard} 
					// Clicked 
					// onRowClicked={(row) => navigate('singlecardholderdetail',{ state: { data: row } })}
					/> */}
                  <DataTable value={listDebitCard} columnResizeMode={"expand"} resizableColumns={true} scrollable={true} paginator rows={5}>
                    {columns.map((col, i) => (
                      <Column
                        className="relative"
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
                <div className="flex justify-start flex-wrap mt-9">
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
                  {listDebitCard.length > 0 ? (
                    listDebitCard.map((card) => (
                      <div className="relative w-full md:w-1/2 xl:w-1/3 overflow-hidden sm:px-3 2xl:mb-4 mb-4">
                        <div className="bg-[#0F172A] rounded-2xl lg:rounded-[32px] overflow-hidden relative max-w-[412px] md:mr-auto mx-auto">
                          <img
                            src={CardBg}
                            alt="Credit card background"
                            className="w-full h-full object-cover absolute inset-0 object-right"
                          />
                          <div className="px-5 py-7 md:p-10 relative z-10">
                            <div className='flex items-center'>

                              <span className="text-lg text-white font-semibold pr-3">
                                {card.card_holder_name}
                              </span>
                              <svg width="40" height="13" viewBox="0 0 40 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.0367 12.8124L36.6617 10.9277H32.4717L31.805 12.799L28.4467 12.8057C30.0455 8.94109 31.6477 5.07794 33.2533 1.21624C33.5267 0.561211 34.0117 0.227836 34.7267 0.231186C35.2733 0.236212 36.165 0.236211 37.4033 0.232861L40 12.8073L37.0367 12.8124ZM33.415 8.34613H36.115L35.1067 3.62191L33.415 8.34613ZM11.7667 0.22951L15.1433 0.232861L9.92333 12.814L6.505 12.8107C5.64541 9.48752 4.79652 6.16156 3.95833 2.83286C3.79167 2.16946 3.46167 1.70541 2.82667 1.48595C2.26167 1.28995 1.32 0.988402 0 0.577964V0.234537H5.395C6.32833 0.234537 6.87333 0.688531 7.04833 1.61997C7.225 2.55309 7.66833 4.92861 8.38167 8.74652L11.7667 0.22951ZM19.7833 0.232861L17.1133 12.8107L13.9 12.8073L16.5667 0.22951L19.7833 0.232861ZM26.3 0C27.2617 0 28.4733 0.301547 29.17 0.577964L28.6067 3.18634C27.9767 2.9317 26.94 2.58827 26.0683 2.6C24.8017 2.62178 24.0183 3.15619 24.0183 3.66882C24.0183 4.50309 25.3783 4.92358 26.7783 5.83492C28.3767 6.87358 28.5867 7.8067 28.5667 8.82023C28.545 10.9244 26.7783 13 23.0517 13C21.3517 12.9749 20.7383 12.8308 19.3517 12.3366L19.9383 9.6143C21.35 10.209 21.9483 10.3983 23.155 10.3983C24.26 10.3983 25.2083 9.94936 25.2167 9.16701C25.2233 8.61082 24.8833 8.33441 23.6433 7.64755C22.4033 6.95902 20.6633 6.0058 20.6867 4.09265C20.715 1.64343 23.0233 0 26.3017 0H26.3Z" fill="white" />
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
                              <div className='flex flex-col'>
                                <span className="text-[#94A3B8] text-sm lg:text-base leading-7 font-normal">
                                  Total Credit
                                </span>
                                <span className="text-white text-xl lg:text-2xl font-semibold">
                                  ₹ {card.due_amount}{" "}
                                </span>
                              </div>
                              <div className='flex flex-col'>
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
                    <div className="flex justify-center items-center">
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
        </>
      )}{" "}
    </>
  );
}

export default AdminDebitCards;
