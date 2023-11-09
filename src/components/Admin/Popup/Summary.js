import axios from 'axios';
import moment from 'moment/moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react'
import { baseurl } from '../../../api/baseurl';

function Summary({ handleClose, paymentRecord }) {

    let TotalsAmounts = 0;
    const sumAllTotals = paymentRecord.map((sum, i) => { TotalsAmounts += sum.total_amount })

    console.log(paymentRecord[0]?.payment_request?.request_id);
    const requestId = paymentRecord[0]?.payment_request?.request_id;
    console.log("rec : ", paymentRecord);
    const user = localStorage.getItem("user");
    const header = {
      Authorization: `Bearer ${JSON.parse(user)?.token}`,
    };
    const getInvoice = async () => {
        const response = await axios.get(`${baseurl}/api/transaction/pdf?request_id=${requestId}`, { headers: header });
        const invoiceURL = window.URL.createObjectURL(new Blob([response.data]));
        let alink = document.createElement('a');
        alink.href = invoiceURL;
        alink.download = `${requestId}.pdf`;
        alink.click();
        handleClose(false);
    }
    const columns = [
        {
            header: 'Paid Through', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{row.due_paid_through}</div>
            }
        },

        {
            header: 'Paid Amount', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{row.paid_amount}</div>
            }
        },
        {
            header: 'Bank Charges', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{row.deposit_charges + row.withdraw_charges}</div>
            }
        },
        {
            header: 'Profit', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{row.profit_amount}</div>
            }
        },
        {
            header: 'Paid Date', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{moment(row.due_paid_at).format('ll')}</div>
            }
        },
        {
            header: 'Paid Time', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{moment(row.due_paid_at).format('LT')}</div>
            }
        },
        {
            header: 'Total Amount', field: (row) => {
                return <div className="text-lg font-semibold text-yankeesBlue">{row.total_amount}</div>
            }
        }
    ];
    return (
        <div className='fixed inset-0 w-screen h-screen bg-[rgba(0,0,0,0.4)] overflow-auto flex backdrop-blur-[1px] z-50 select-none'>
            <div className="max-w-[1005px] w-full  m-auto bg-white rounded-3xl shadow-shadowbox p-5 md:p-11 relative">
                <button onClick={() => handleClose(false)} className="absolute top-1 right-1 md:top-5 md:right-5 text-xl max-[640px]:pl-6" >
                    <svg className="w-7 h-7" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="Close"><rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"></rect><line x1="16.9999" y1="7" x2="7.00001" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line><line x1="7.00006" y1="7" x2="17" y2="16.9999" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"></line></g></g></svg>
                </button>
                {/* <h2 className='flex justify-center mb-7'>{paymentRecord}</h2> */}
                <h2 className='flex justify-center mb-7'>Payment Summary</h2>
                {paymentRecord ?
                    <button onClick={() => getInvoice()} className="btn-secondary flex ml-auto mb-2">
                        Get Invoice
                    </button> : ""}
                <DataTable value={paymentRecord}
                    // filters={filters}
                    // globalFilterFields={['card.card_holder_name', 'card.card_number', 'card.card_bank_name', 'due_date']}
                    selectionMode="single"
                    columnResizeMode={"expand"} resizableColumns={true} scrollable={true} rows={10}>
                    {columns.map((col, i) => {
                        return <Column key={col.field} field={col.field} header={col.header} />
                    })}
                </DataTable>
                <p className='text-lg font-semibold text-yankeesBlue text-right pt-3'>Total Amount : <span className='text-lg font-black text-darkGreen pl-4'> {TotalsAmounts}</span> </p>
            </div>
        </div>
    )
}

export default Summary
