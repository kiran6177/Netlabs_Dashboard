import React, { useEffect, useRef } from "react";
import { d3Pie, generateContrastingColors } from "../utils/d3Config";
import { getStatusCount } from "../utils/getDataCounts";

function StatusGraph() {
  const svgRef = useRef();

  let statusData = getStatusCount();

  useEffect(() => {
    let colors = generateContrastingColors(statusData.length)
    let data = [
      { type: "Shipped", value: statusData[0], label:colors[0]},
      { type: "Received", value: statusData[1], label:colors[1] },
    ];
    d3Pie(data, svgRef,false,colors);
  }, []);

  return (
    <div className="bg-white rounded-md my-8 p-7">
      <h2 className="text-3xl font-semibold">Order Status Reports</h2>
      <svg ref={svgRef} className="mx-auto"></svg>
    </div>
  );
}

export default StatusGraph;
