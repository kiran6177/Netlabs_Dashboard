import data from "../inventory.json";
let thirty = 30 * 24 * 3600 * 1000;
let sixty = 60 * 24 * 3600 * 1000;
let ninety = 90 * 24 * 3600 * 1000;
let oneTwenty = 120 * 24 * 3600 * 1000;

export function getCategoryGap(category) {
  let resultData = [
    {point : 0 , value : 0},
    {point : 30 , value : 0},
    {point : 60 , value : 0},
    {point : 90 , value : 0},
    {point : 120 , value : 0},
    {point : 140 , value : 0},
  ];
  let now = new Date().setHours(0, 0, 0, 0);
  let thirtyDaysEgo = now - thirty;
  let sixtyDaysEgo = now - sixty;
  let ninetyDaysEgo = now - ninety;
  let oneTwentyDaysEgo = now - oneTwenty;


  for (let each of data) {
    let itemsDate = new Date(each?.OrderDate);
    let valuePoint;
    if (each?.CategoryName === category) {
      if (itemsDate.getTime() === now) {
        valuePoint = 0;
      } else if (
        itemsDate.getTime() < now &&
        itemsDate.getTime() > thirtyDaysEgo
      ) {
        valuePoint = 30;
      } else if (
        itemsDate.getTime() < thirtyDaysEgo &&
        itemsDate.getTime() > sixtyDaysEgo
      ) {
        valuePoint = 60;
      } else if (
        itemsDate.getTime() < sixtyDaysEgo &&
        itemsDate.getTime() > ninetyDaysEgo
      ) {
        valuePoint = 90;
      } else if (
        itemsDate.getTime() < ninetyDaysEgo &&
        itemsDate.getTime() > oneTwentyDaysEgo
      ) {
        valuePoint = 120;
      } else {
        valuePoint = 140;
      }
      resultData.forEach((pointData)=>{
        if(pointData?.point === valuePoint){
            pointData.value = pointData.value + parseInt(each?.AvaliableQuantity)
        }
        return pointData
      })
    }
  }

  return resultData;
}


export function getProductGap(product) {
    let resultData = [
      {point : 0 , value : 0},
      {point : 30 , value : 0},
      {point : 60 , value : 0},
      {point : 90 , value : 0},
      {point : 120 , value : 0},
      {point : 140 , value : 0},
    ];
    let now = new Date().setHours(0, 0, 0, 0);
    let thirtyDaysEgo = now - thirty;
    let sixtyDaysEgo = now - sixty;
    let ninetyDaysEgo = now - ninety;
    let oneTwentyDaysEgo = now - oneTwenty;
  
  
    for (let each of data) {
      let itemsDate = new Date(each?.OrderDate);
      let valuePoint;
      if (each?.ProductName === product) {
        if (itemsDate.getTime() === now) {
          valuePoint = 0;
        } else if (
          itemsDate.getTime() < now &&
          itemsDate.getTime() > thirtyDaysEgo
        ) {
          valuePoint = 30;
        } else if (
          itemsDate.getTime() < thirtyDaysEgo &&
          itemsDate.getTime() > sixtyDaysEgo
        ) {
          valuePoint = 60;
        } else if (
          itemsDate.getTime() < sixtyDaysEgo &&
          itemsDate.getTime() > ninetyDaysEgo
        ) {
          valuePoint = 90;
        } else if (
          itemsDate.getTime() < ninetyDaysEgo &&
          itemsDate.getTime() > oneTwentyDaysEgo
        ) {
          valuePoint = 120;
        } else {
          valuePoint = 140;
        }
        resultData.forEach((pointData)=>{
          if(pointData?.point === valuePoint){
              pointData.value = pointData.value + parseInt(each?.AvaliableQuantity)
          }
          return pointData
        })
      }
    }
  
    return resultData;
  }

