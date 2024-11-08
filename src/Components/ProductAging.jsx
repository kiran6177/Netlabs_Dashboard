import React, { useEffect, useMemo, useRef, useState } from "react";
import { getProductGap } from "../utils/getOrdersGap";
import { getProducts } from "../utils/getCategoryData";
import { d3LineChart } from "../utils/d3Config";

function ProductAging() {
  const svgRef = useRef();
  const products = useMemo(() => getProducts(), []);
  const [viewOptions, setViewOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(products[0]);

  useEffect(() => {
    const data = getProductGap(selectedCategory);
    d3LineChart(svgRef, data);

    return () => svgRef?.current && (svgRef.current.innerHTML = "");
  }, [selectedCategory]);

  return (
    <div className="bg-white rounded-md my-8 py-3 px-9">
  <h2 className="text-xl sm:text-3xl font-semibold my-5">Product Aging Reports</h2>
  <div className="w-[100%] sm:w-[60%]  md:w-[50%]">
    <h3 className="border-2 rounded-md text-xs sm:text-base px-4 py-2 flex justify-between relative" onClick={()=> setViewOptions(true)}
      >
      {selectedCategory}
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M480-360 280-560h400L480-360Z" />
      </svg>
      {viewOptions && (
      <div className="absolute top-10 left-0 w-full overflow-hidden overflow-y-scroll max-h-[10rem] rounded-b-md" onClick={(e)=> e.stopPropagation()}
        >
        {products?.map((cat) => {
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
      <div className="w-full overflow-x-scroll scroll-element">
        <svg ref={svgRef}></svg>
      </div>
</div>
  );
}

export default ProductAging;
