import React, { useEffect, useMemo, useRef, useState } from "react";
import { getCategories } from "../utils/getCategoryData";
import { getBackorders } from "../utils/getBackOrders";
import { d3Pie } from "../utils/d3Config";

function Backorder() {
  const categories = useMemo(() => getCategories(), []);
  const [viewOptions, setViewOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [warehouseData,setWarehouseData] = useState([])

  const svgRef = useRef();

  useEffect(()=>{
    const dataArr = getBackorders(selectedCategory)
    if(dataArr){
        setWarehouseData(dataArr)
    }
    d3Pie(dataArr,svgRef,true)

    return ()=> svgRef?.current && (svgRef.current.innerHTML = "")
  },[selectedCategory])

  return (
    <div className="bg-white rounded-md my-8 py-7 px-12">
    <h2 className="text-xl sm:text-3xl font-semibold my-5">Backorder Reports</h2>
    <div className="w-[100%]  md:w-[50%]">
        <h3 className="border-2 rounded-md text-xs sm:text-base px-4 py-2 flex justify-between relative" onClick={()=> setViewOptions(true)}
            >
            {selectedCategory}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M480-360 280-560h400L480-360Z" />
            </svg>
            {viewOptions && (
            <div className="absolute top-10 left-0 w-full overflow-hidden rounded-b-md" onClick={(e)=>
                e.stopPropagation()}
                >
                {categories?.map((cat) => {
                return (
                <p key={cat} onClick={()=> {
                    setSelectedCategory(cat);
                    setViewOptions(false);
                    }}
                    className="bg-[#ececec] hover:bg-white px-4 py-2 border-b-2"
                    >
                    {cat}
                </p>
                );
                })}
            </div>
            )}
        </h3>
    </div>
    <div className="my-4 flex justify-center flex-col items-center">
            <div className="w-full overflow-x-scroll scroll-element">
                <svg ref={svgRef} className="min-h-[500px] w-fit"></svg>
            </div>
        <div className="flex items-center flex-wrap gap-5 justify-evenly my-5 w-full">
            {
                warehouseData?.length > 0 && warehouseData.map(data=>{
                    return  <div key={data?.type} className="flex items-center gap-3"><p className="text-sm">{data?.type} : {data?.value}</p></div>
                })
            }
        </div>
        <div className="flex items-center flex-wrap gap-5 justify-evenly w-full">
            {
                warehouseData?.length > 0 && warehouseData.map(data=>{
                    return  <div key={data?.type} className="flex items-center gap-3 min-w-fit"><div style={{background:data?.label}} className="w-6 h-6  rounded-full"></div> <p className="text-xs">{data?.type}</p></div>
                })
            }
        </div>
    </div>
</div>
  );
}

export default Backorder;
