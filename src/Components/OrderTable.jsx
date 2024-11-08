import React, { useEffect, useRef, useState } from "react";
import { getMonth } from "../utils/getMonth";
import { getOrdersByDate } from "../utils/getOrdersByDate";
import { downloadExcel } from "../utils/xlsx";
import { generateTable } from "../utils/generateHTML";
let LIMIT = 20;

function OrderTable() {
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [orderData, setOrderData] = useState([]);


  const handleDownload = () => {
    let dateToFind = date;
    if (date) {
      let splitted = date.split("-");
      dateToFind = `${
        splitted[2] < 10 ? splitted[2][1] : splitted[2]
      }-${getMonth(splitted[1])}-${splitted[0].slice(2)}`;
    }
    const parser = new DOMParser();
    let doc = parser.parseFromString(generateTable(dateToFind),'text/html')
    let table = doc.getElementById('order-table')
    let colWidth = [20,20,20,20,15] 
    downloadExcel(table,colWidth,"Order_Data")
  };
  useEffect(() => {
    let dateToFind = date;
    if (date) {
      let splitted = date.split("-");
      dateToFind = `${
        splitted[2] < 10 ? splitted[2][1] : splitted[2]
      }-${getMonth(splitted[1])}-${splitted[0].slice(2)}`;
    }
    setOrderData(getOrdersByDate(dateToFind, page, LIMIT));
  }, [date, page]);

  return (
    <div className="bg-white rounded-md w-full p-5 my-5 shadow-lg ">
    <div className="flex gap-3 flex-col md:flex-row md:items-end justify-between">
        <div className="w-full">
            <p className="my-2">Filter By Date</p>
            <div className="flex gap-4 items-center">
                <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}
                className="rounded-md border-[1px]
                p-2 w-[100%] sm:w-[60%] md:w-[35%]"
                />
                {date && (
                <button onClick={()=> setDate("")}
                    type="button"
                    className="text-blue-700"
                    >
                    Reset
                </button>
                )}
            </div>
        </div>
        <button type="button" onClick={handleDownload} className="border-2 border-[#5A57FE] rounded-md px-6 py-1">
            Download
        </button>
    </div>
    <div className="w-full overflow-x-scroll scroll-element">
        <table className="table-fixed min-w-[800px] w-full rounded-md my-5 ">
            <thead className="bg-[#ddd] h-[3rem]">
                <tr className="border-l-2 border-r-2 border-b-2">
                    <th className="border-r-2 border-[#c6c6c6]">Order Date</th>
                    <th className="border-r-2 border-[#c6c6c6]">Product Name</th>
                    <th className="border-r-2 border-[#c6c6c6]">Order Quantity</th>
                    <th className="border-r-2 border-[#c6c6c6]">Unit Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className="bg-[#fdfdfd]">
                {orderData.map((order) => {
                return (
                <tr key={order?.grnNumber} className="border-l-2 border-r-2 border-b-2 ">
                    <td className="border-r-2 border-[#c6c6c6] text-center py-2">
                        {order?.orderDate}
                    </td>
                    <td className="border-r-2 border-[#c6c6c6] text-center py-2">
                        {order?.productName}
                    </td>
                    <td className="border-r-2 border-[#c6c6c6] text-center py-2">
                        {order?.orderQty}
                    </td>
                    <td className="border-r-2 border-[#c6c6c6] text-center py-2">
                        {order?.unitPrice}
                    </td>
                    <td className=" h-full">
                        <p className={`${ order?.status==="Shipped" ? "bg-blue-400" : "bg-green-500" } w-fit mx-auto
                            rounded-full px-4 py-[2px]`}>
                            {order?.status}
                        </p>
                    </td>
                </tr>
                );
                })}
            </tbody>
        </table>
    </div>

    <div className="flex justify-between">
        <button disabled={page < 1} onClick={()=>
            setPage((prev) => {
            if (prev > 1) {
            return prev - 1;
            }
            return prev;
            })
            }
            className={
            page > 1
            ? "border-2 border-[#5A57FE] rounded-full px-8 py-1 font-semibold tracking-widest"
            : "border-2 border-[#5a57feb2] text-[#6f6f6fc1] rounded-full px-8 py-1 font-semibold tracking-widest"
            }
            >
            Prev
        </button>
        <button disabled={orderData < 20} onClick={()=>
            setPage((prev) => {
            if (orderData?.length >= 20) {
            return prev + 1;
            }
            return prev;
            })
            }
            className={
            orderData?.length >= 20
            ? "border-2 border-[#5A57FE] rounded-full px-8 py-1 font-semibold tracking-widest"
            : "border-2 border-[#5a57feb2] text-[#6f6f6fc1] rounded-full px-8 py-1 font-semibold tracking-widest"
            }
            >
            Next
        </button>
    </div>
</div>
  );
}

export default OrderTable;
