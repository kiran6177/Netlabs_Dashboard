import data from "../inventory.json";

export function getDataCounts(type){
    let set = new Set();
    let key = "";
    let sumKey = ""
    if (type === "Warehouses") {
        key = "WarehouseName"
    } else if (type === "Categories") {
        key = "CategoryName"
    } else if (type === "Products") {
        key = "ProductName"
    } else if (type === "Vendors") {
        key = "VendorName"
    } else if (type === "Order Quantity") {
        sumKey = "OrderItemQuantity"
    } else {
        sumKey = "AvaliableQuantity"
    }
    if(key){
        for(let each of data){
            if(!set.has(each?.[key])){
                set.add(each?.[key])
            }
        }
        return set.size
    }
    if(sumKey){
        return data.reduce((acc,curr)=> acc + parseInt(curr?.[sumKey]) ,0)
    }
}

export function getStatusCount(){
    let shippedCount = 0;
    let recievedCount = 0;
    for(let each of data){
        if(each?.Status === "Shipped"){
            shippedCount++
        }else{
            recievedCount++
        }
    }
    return [shippedCount,recievedCount]
}