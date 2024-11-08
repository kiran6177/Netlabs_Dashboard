import React, { useEffect, useMemo, useRef, useState } from "react";
import { getCategoryGap } from "../utils/getOrdersGap";
import { getCategories } from "../utils/getCategoryData";
import { d3LineChart } from "../utils/d3Config";

function CategoryAging() {
  const svgRef = useRef();
  const categories = useMemo(() => getCategories(), []);
  const [viewOptions, setViewOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  useEffect(() => {
    const data = getCategoryGap(selectedCategory);
    d3LineChart(svgRef, data);

    return () => svgRef?.current && (svgRef.current.innerHTML = "");
  }, [selectedCategory]);

  return (
    <div className="bg-white rounded-md my-8 py-3 px-9">
  <h2 className="text-3xl font-semibold my-5">Category Aging Reports</h2>
  <div className="w-[50%]">
    <h3 className="border-2 rounded-md px-4 py-2 flex justify-between relative" onClick={()=> setViewOptions(true)}
      >
      {selectedCategory}
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <path d="M480-360 280-560h400L480-360Z" />
      </svg>
      {viewOptions && (
      <div className="absolute top-10 left-0 w-full overflow-hidden rounded-b-md" onClick={(e)=> e.stopPropagation()}
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
  <svg ref={svgRef}></svg>
</div>
  );
}

export default CategoryAging;