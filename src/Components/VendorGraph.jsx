import React, { useEffect, useRef } from "react";
import { d3StackedBar } from "../utils/d3Config";
import { getVendorData } from "../utils/getVendorData";

function VendorGraph() {
  
  const margin = { top: 0, right: 150, bottom: 30, left: 150 };
  const width = window.innerWidth - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svgRef = useRef();
  useEffect(() => {
    const data = getVendorData()
    d3StackedBar(data, svgRef, width, height);
  }, []);

  return (
    <div className="bg-white rounded-md my-8 py-7 px-12">
      <h2 className="text-3xl font-semibold my-5">Vendor Specific Reports</h2>
      <svg className="w-full min-h-[550px]" ref={svgRef}></svg>
        <div className="flex items-center gap-10 justify-center">
      <div className="flex items-center gap-3"><div className="w-6 h-6 bg-[#1f77b4] rounded-full"></div> <p className="text-xs">Available Quantity</p></div>
      <div className="flex items-center gap-3"><div className="w-6 h-6 bg-[#ff7f0e] rounded-full"></div> <p className="text-xs">Order Quantity</p></div>

        </div>
    </div>
  );
}

export default VendorGraph;
