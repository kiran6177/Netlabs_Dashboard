import { getCompleteOrders } from "./getOrdersByDate";

export function generateTable(date) {
    let orderList = getCompleteOrders(date)
    let tableHtml = `<table id='order-table'>
            <thead >
                <tr >
                    <th>Order Date</th>
                    <th>Product Name</th>
                    <th>Order Quantity</th>
                    <th>Unit Price</th>
                    <th >Status</th>
                </tr>
            </thead>
            <tbody >`;

    for (let order of orderList) {
      tableHtml += `
                    <tr >
                        <td >${order?.orderDate}</td>
                        <td >${order?.productName}</td>
                        <td >${order?.orderQty}</td>
                        <td >${order?.unitPrice}</td>
                        <td ><p>${order?.status}</p></td>
                    </tr>`;
    }

    tableHtml += `</tbody>
        </table>`;


    return tableHtml;
        
  }