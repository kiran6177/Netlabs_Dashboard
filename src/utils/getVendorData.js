import data from "../inventory.json"

export function getVendorData(){
    let vendorData = {};
    for(let each of data){
        if(vendorData[each?.VendorName]){
            vendorData[each?.VendorName].availableQuantity = vendorData[each?.VendorName].availableQuantity + parseInt(each?.AvaliableQuantity)
            vendorData[each?.VendorName].orderQuantity = vendorData[each?.VendorName].orderQuantity + parseInt(each?.OrderItemQuantity)
        }else{
            vendorData[each?.VendorName] = {
                availableQuantity : parseInt(each?.AvaliableQuantity),
                orderQuantity : parseInt(each?.OrderItemQuantity)
            }
        }
    }
    return Object.entries(vendorData).map(([key,valueObj])=>({label:key,"availableQuantity" : valueObj?.availableQuantity, "orderQuantity" : valueObj?.orderQuantity }))
}