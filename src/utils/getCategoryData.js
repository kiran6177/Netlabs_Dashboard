import data from "../inventory.json"
export let availableQuantity = "Available Quantity";
export let orderQuantity = "Order Quantity";
export let shipped = "Shipped";
export let recieved = "Recieved";


export function getCategoryData(category){
    let resultData = {
        [availableQuantity] : 0,
        [orderQuantity] : 0,
        [shipped] : 0,
        [recieved] : 0    
    };
    for(let each of data){
        if(each?.CategoryName === category){
            resultData[availableQuantity] = resultData[availableQuantity] + parseInt(each?.AvaliableQuantity)
            resultData[orderQuantity] = resultData[orderQuantity] + parseInt(each?.OrderItemQuantity)
            if(each?.Status === "Shipped"){
            resultData[shipped] = resultData[shipped] + 1
            }else{
            resultData[recieved] = resultData[recieved] + 1
            }
        }
    }
    return resultData
}

export function getCategories(){
    const set = new Set();
    for(let each of data){
        if(!set.has(each?.CategoryName)){
            set.add(each?.CategoryName)
        }
    }
    return Array.from(set)
}

export function getProducts(){
    const set = new Set();
    for(let each of data){
        if(!set.has(each?.ProductName)){
            set.add(each?.ProductName)
        }
    }
    return Array.from(set)
}

export function getCategoryOrders(){
    let result = {}
    for(let each of data){
        if(!result[each?.CategoryName]){
            result[each?.CategoryName] = {
                [availableQuantity] : parseInt(each?.AvaliableQuantity),
                [orderQuantity] : parseInt(each?.OrderItemQuantity)
            } 
        }else{
            result[each?.CategoryName][availableQuantity] = result[each?.CategoryName][availableQuantity] + parseInt(each?.AvaliableQuantity)
            result[each?.CategoryName][orderQuantity] = result[each?.CategoryName][orderQuantity] + parseInt(each?.OrderItemQuantity)
        }
    }
    return result
}