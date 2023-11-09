import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import DemoImage from "../../assets/images/profile.png";
import axios from "axios";
import { baseurl } from "../../api/baseurl";
import { ToastContainer, toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { calcPaidProfitAmt, calcUnpaidAmt, calcWithdrawAmt, calculateTotalDue, calculateTotalPaid, calcTotalProfitAmt, calcTotalCharge, calcChargePaid, calculateMonthlyTotalPaid, calcMonthlyTotalProfitAmt, calcMonthlyTotalCharge, calcMonthlyChargePaid, calcMonthlyTransaction, calculateDailyTotalPaid, calcDailyTotalProfitAmt, calDailyChargePaid, calcDailyTotalCharge, calcDailyTransaction, calcMonthlyWithdrawAmt, calcMonthlyUnpaidAmt } from "./services/utils";
// CHART
import { Chart } from "primereact/chart";
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';

export default function Dashboard() {
  localStorage.removeItem("card_id");
  localStorage.removeItem("user_id");
  localStorage.removeItem("request_id");

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [chartData1, setChartData1] = useState({});
  const [chartOptions1, setChartOptions1] = useState({});

  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});

  const [transaction, setTransaction] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [first, setfirst] = useState([]);
  const [paidProfitAmt, setPaidProfitAmt] = useState(0);
  const [totalProfitAmt, setTotalProfitAmt] = useState(0);
  const [withdrawAmt, setWithdrawAmt] = useState(0); const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);
  const [totalChargePaid, setTotalChargePaid] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [totalDue, setTotalDue] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [unpaidAmt, setUnpaidAmt] = useState(0);
  const [month, setMonth] = useState(0);

  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateNumber = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  const months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ];

  let monthlyTransaction = [];
  let monthlyTotalcharge = [];
  let monthlyChargePaid = [];
  let monthlyTotalProfit = [];
  let monthlyTotalPaid = [];

  let dailyTransaction = [];
  let dailyTotalcharge = [];
  let dailyChargePaid = [];
  let dailyTotalProfit = [];
  let dailyTotalPaid = [];

  for (let i = 0; i <= 11; i++) {
    monthlyTransaction.push(calcMonthlyTransaction(first, i + 1));
    monthlyTotalcharge.push(calcMonthlyTotalCharge(first, i + 1));
    monthlyChargePaid.push(calcMonthlyChargePaid(first, i + 1));
    monthlyTotalProfit.push(calcMonthlyTotalProfitAmt(first, i + 1));
    monthlyTotalPaid.push(calculateMonthlyTotalPaid(first, i + 1));
  }

  for (let i = 0; i <= 30; i++) {
    dailyTransaction.push(calcDailyTransaction(first, month + '-' + (i + 1) + '-2023'));
    dailyTotalcharge.push(calcDailyTotalCharge(first, month + '-' + (i + 1) + '-2023'));
    dailyChargePaid.push(calDailyChargePaid(first, month + '-' + (i + 1) + '-2023'));
    dailyTotalProfit.push(calcDailyTotalProfitAmt(first, month + '-' + (i + 1) + '-2023'));
    dailyTotalPaid.push(calculateDailyTotalPaid(first, month + '-' + (i + 1) + '-2023'));
  }

  const user = localStorage.getItem("user");
  const header = {
    "Authorization": `Bearer ${JSON.parse(user)?.token}`,
  };
  // bar chart
  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/transaction/profit-unpaidprofit-view?payment_status=True`,
        { headers: header }
      );

      if (response.data.Data) {
        // setUnpaidAmt(calcUnpaidAmt(response.data.Data))
        setPaidProfitAmt(calcPaidProfitAmt(response.data.Data))
        setTotalTransaction(response.data.Data.length)
        setTotalCharge(calcTotalCharge(response.data.Data))
        setUnpaidAmt(calcUnpaidAmt(response.data.Data))
        setTotalChargePaid(calcChargePaid(response.data.Data))
        setfirst(response.data.Data);
        setLoading1(false);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };



  // pai chart

  const getDashboardPaymentData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}/api/transaction/paid-unpaid-withdraw`,
        { headers: header }
      );
      if (response.data.Data) {
        const paymentData = response.data.Data
        setPieData(paymentData);
        setTotalDue(calculateTotalDue(paymentData))
        setTotalPaid(calculateTotalPaid(paymentData))

        setWithdrawAmt(calcWithdrawAmt(paymentData))
        // setUnpaidAmt(calcUnpaidAmt(paymentData))
        setTotalProfitAmt(calcTotalProfitAmt(paymentData))
        setLoading2(false);
      }

    } catch (error) {
      toast.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    getDashboardData();
    getDashboardPaymentData();
  }, []);

  useEffect(() => {
    // getTransactions();
  }, []);

  // chart 1
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: month ? dateNumber : monthName,
      datasets: [
        {
          label: "Total Paid Amount",
          data: month ? dailyTotalPaid : monthlyTotalPaid,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--dash4"),
          tension: 0.4,
        },
        {
          label: "Total Earning Amount",
          data: month ? dailyTotalProfit : monthlyTotalProfit,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--dash1"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [totalPaid, month]);

  // chart 2
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Paid", "Unpiad", "Withdraw"],
      datasets: [
        {
          data: [month ? calculateMonthlyTotalPaid(first, month + "-01-" + new Date().getFullYear()) : totalPaid, month ? calcMonthlyUnpaidAmt(pieData, month + "-01-" + new Date().getFullYear()) : unpaidAmt, month ? calcMonthlyWithdrawAmt(pieData, month + "-01-" + new Date().getFullYear()) : withdrawAmt],
          backgroundColor: [
            documentStyle.getPropertyValue("--dash1"),
            documentStyle.getPropertyValue("--dash2"),
            documentStyle.getPropertyValue("--dash3"),
          ],
          // hoverBackgroundColor: [
          //   documentStyle.getPropertyValue('--blue-400'),
          //   documentStyle.getPropertyValue('--yellow-400'),
          //   documentStyle.getPropertyValue('--green-400')
          // ]
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData1(data);
    setChartOptions1(options);
  }, [totalPaid, unpaidAmt, withdrawAmt, month]);

  // chart3
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: month ? dateNumber : monthName,
      datasets: [
        {
          type: "bar",
          label: "Total Transaction",
          backgroundColor: documentStyle.getPropertyValue("--dash4"),
          data: month ? dailyTransaction : monthlyTransaction,
        },
        {
          type: "bar",
          label: "Total Charges",
          backgroundColor: documentStyle.getPropertyValue("--dash1"),
          data: month ? dailyTotalPaid : monthlyTotalPaid,
        },
        {
          type: "bar",
          label: "Charges Paid By Customer",
          backgroundColor: documentStyle.getPropertyValue("--dash3"),
          data: month ? dailyTotalcharge : monthlyTotalcharge,
        },
        {
          type: "bar",
          label: "Profit",
          backgroundColor: documentStyle.getPropertyValue("--dash5"),
          data: month ? dailyChargePaid : monthlyChargePaid,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData2(data);
    setChartOptions2(options);
  }, [totalTransaction, month]);

  return (
    <div className="wrapper min-h-full relative">
      <div className="relative flex flex-wrap items-center- justify-start mb-[50px] -mx-3">
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-[#ed4d3714] py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-[#ED4D37] mb-3">₹ {totalDue}</h2>
            <span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
              Total Due Amount
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-darkGreen bg-opacity-10 py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-yankeesBlue mb-3">₹ {totalPaid} </h2>
            <span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
              Total Payment Paid
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-[#FFF0E0] py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-[#F6A351] mb-3">₹ {unpaidAmt}</h2>
            <span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
              Total Unpaid Profit Amount
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 xl:w-1/4 p-3 2xl:px-5">
          <div className="bg-darkGreen bg-opacity-10 py-7 px-7 2xl::px-11 rounded-xl h-full">
            <h2 className="text-yankeesBlue mb-3">₹ {paidProfitAmt}</h2>
            <span className="text-[# 64748B] text-base 2xl:text-xl font-semibold">
              Total Received Profit Amount
            </span>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-between pt-5 md:pt-0 pb-9">
        <div className="card flex">
          <Dropdown value={month} onChange={(e) => setMonth(e.value)} options={months} optionLabel="name"
            placeholder="select month" className="w-full md:w-14rem" />
          {/* <button type='button' onClick={() => setMonth(0)} className="text-base md:text-3xl font-bold text-yankeesBlue leading-8 pl-4 md:pl-7">clear</button> */}
          <button onClick={() => setMonth(0)} className="btn-secondary flex ml-2">
            Clear
          </button>
        </div>
        <div className="flex items-center space-x-3">
        </div>
      </div>
      <div className="flex flex-wrap w-full space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2 max-h-[500px] lg:pr-5">
          {loading1 && loading2 ? <Skeleton className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"></Skeleton> :
            month === 0 ?
              <Chart
                className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
                type="line"
                data={chartData}
                options={chartOptions}
              /> :
              <Chart
                className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
                type="line"
                data={chartData}
                options={chartOptions}
              />
          }
        </div>
        <div className="w-full lg:w-1/2 max-h-[500px] lg:pl-5">
          {loading1 && loading2 ? <Skeleton className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"></Skeleton> :
            <Chart
              type="pie"
              className="w-full h-full flex justify-center items-center bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
              data={chartData1}
              options={chartOptions1}
            />
          }
        </div>
        <div className="w-full h-full pt-5 md:mt-10">
          {loading1 && loading2 ? <Skeleton className="w-full h-full bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"></Skeleton> :
            month === 0 ?
              <Chart
                className="bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
                type="bar"
                data={chartData2}
                options={chartOptions2}
              />
              :
              <Chart
                className="bg-[#f8fafc] p-5 border-2 rounded-lg border-[#e5e7eb]"
                type="bar"
                data={chartData2}
                options={chartOptions2}
              />
          }
        </div>
      </div>
      
    </div>
  );
}
