import data from "../inventory.json";
import { generateContrastingColors } from "./d3Config";

function getWarehouses() {
  const set = new Set();
  for (let each of data) {
    if (!set.has(each?.WarehouseName)) {
      set.add(each?.WarehouseName);
    }
  }
  return Array.from(set);
}

export function getBackorders(category) {
  let result = {};
  for (let each of data) {
    if (each?.CategoryName === category) {
      if (result[each?.WarehouseName]) {
        result[each.WarehouseName].available =
          result[each.WarehouseName].available +
          parseInt(each.AvaliableQuantity);
        result[each.WarehouseName].ordered =
          result[each.WarehouseName].ordered + parseInt(each.OrderItemQuantity);
      } else {
        result[each.WarehouseName] = {
          available: parseInt(each.AvaliableQuantity),
          ordered: parseInt(each.OrderItemQuantity),
        };
      }
    }
  }
  let outputArr = getWarehouses().map(data=>({type:data,value : 0}));
  let colors = generateContrastingColors(outputArr.length)
  for (let [key, value] of Object.entries(result)) {
    if (value.ordered > value.available) {
        outputArr.forEach((wareData,i)=>{
            if(wareData?.type === key){
                wareData.value = wareData.value + parseInt(value.ordered - value.available)
            }
            return wareData
        })
    }
  }
  outputArr.forEach((wareData,i)=>{
    wareData.label = colors[i]
    return wareData
    })
  return outputArr
}
