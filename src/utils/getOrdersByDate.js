import data from "../inventory.json";

export const getOrdersByDate = function (date, page = 1, LIMIT = 20) {
  const startIndex = (page - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;

  if (!date) {
    return data.slice(startIndex, endIndex).map((each) => {
      let obj = {
        grnNumber: each?.GRNNumber,
        orderDate: each?.OrderDate,
        productName: each?.ProductName,
        orderQty: each?.OrderItemQuantity,
        unitPrice: each?.PerUnitPrice,
        status: each?.Status,
      };
      return obj;
    });
  } else {
    return data
      .filter((each) => each.OrderDate === date)
      .slice(startIndex, endIndex)
      .map((each) => {
        let obj = {
          grnNumber: each?.GRNNumber,
          orderDate: each?.OrderDate,
          productName: each?.ProductName,
          orderQty: each?.OrderItemQuantity,
          unitPrice: each?.PerUnitPrice,
          status: each?.Status,
        };
        return obj;
      });
  }
};
