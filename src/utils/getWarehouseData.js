import data from "../inventory.json"
export let availableQuantity = "Available Quantity";
export let orderQuantity = "Order Quantity";
export let shipped = "Shipped";
export let recieved = "Recieved";

export function getWarehouseOrders(){
    let result = {}
    for(let each of data){
        if(!result[each?.WarehouseName]){
            result[each?.WarehouseName] = {
                [availableQuantity] : parseInt(each?.AvaliableQuantity),
                [orderQuantity] : parseInt(each?.OrderItemQuantity),
                [shipped] : each?.Status === "Shipped" ? 1 : 0,
                [recieved] : each?.Status === "Recieved" ? 1 : 0,
            } 
        }else{
            result[each?.WarehouseName][availableQuantity] = result[each?.WarehouseName][availableQuantity] + parseInt(each?.AvaliableQuantity)
            result[each?.WarehouseName][orderQuantity] = result[each?.WarehouseName][orderQuantity] + parseInt(each?.OrderItemQuantity)
            if(each?.Status === "Shipped"){
                result[each?.WarehouseName][shipped] = result[each?.WarehouseName][shipped] + 1
            }else{
                result[each?.WarehouseName][recieved] = result[each?.WarehouseName][recieved] + 1
            }
        }
    }
    return result
}