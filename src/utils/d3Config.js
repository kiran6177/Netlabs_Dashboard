import * as d3 from "d3";

export function generateContrastingColors(length) {
  const colors = [];
  const step = Math.floor(360 / length); 

  for (let i = 0; i < length; i++) {
    const hue = i * step; 
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }

  return colors;
}
 
export function d3Pie(data, svgRef,isNeeded ,colorArr) {
  let colors = colorArr ? colorArr : data.map(dat=>dat.label)
  const width = 450;
  const height = 450;
  const margin = 40;
  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const color = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.type))
    .range(colors);

  const pie = d3.pie().value((d) => d.value);
  const data_ready = pie(data);

  const arc = d3
    .arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius);

  svg
    .selectAll("pieces")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.label))
    .style("stroke-width", "2px")
    .style("opacity", 1);

  // Adding labels

  if(!isNeeded){
    svg
    .selectAll("text")
    .data(data_ready)
    .enter()
    .append("text")
    .text((d) => d.data.type)
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "14px");
  }
}

export function d3StackedBar(data, ref, width, height) {
  let dataLabels = data.map((each) => ({ label: each.label }));
  let [first, ...dataKeys] = Object.keys(data[0]);

  // Create SVG container
  const svg = d3.select(ref.current);

  // Create scales
  const xScale = d3
    .scaleBand()
    .rangeRound([0, width])
    .paddingOuter(0.9)
    .paddingInner(0.3)
    .align(0.1);
  const yScale = d3.scaleLinear().rangeRound([height, 0]);

  var stack = d3
    .stack()
    .keys([...dataKeys])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

  var series = stack(data);

  xScale.domain(
    dataLabels.map(function (d) {
      return d.label;
    })
  );
  yScale
    .domain([
      0,
      d3.max(series, function (d) {
        return d3.max(d, function (d) {
          return d[1];
        });
      }),
    ])
    .nice();

  var color = d3
    .scaleOrdinal()
    .domain([...dataKeys])
    .range(["#1f77b4", "#ff7f0e"]);
  // Create bars
  svg
    .append("g")
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .attr("transform", "translate(40, 10)")
    .attr("fill", function (d) {
      return color(d.key);
    })
    .selectAll("rect")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d.data.label);
    })
    .attr("y", function (d) {
      return yScale(d[1]);
    })
    .attr("height", function (d) {
      return yScale(d[0]) - yScale(d[1]);
    })
    .attr("width", xScale.bandwidth() - 10);

  // Create x-axis
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(30,${height + 10})`)
    .call(xAxis);

  // Create y-axis
  const yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(40, 10)")
    .call(yAxis);
}

export function d3Bar(dataObj, svgRef) {
    let width = window.innerWidth - 500;
    let height = 600;
    let leftMargin = 30;
    let rightMargin = 20;
    let bottomMargin = 30;
    let topMargin = 30;
    
    let svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + leftMargin + rightMargin)
      .attr("height", height + topMargin + bottomMargin);
    
    // X scale and axis
    let xscale = d3
      .scaleBand()
      .domain(Object.keys(dataObj))
      .range([0, width])
      .padding(0.1); // Adjust padding to control space
    
    let x_axis = d3.axisBottom(xscale);
    
    svg
      .append("g")
      .attr("transform", `translate(${leftMargin}, ${topMargin + height})`)
      .call(x_axis);
    
    // Y scale and axis (using logarithmic scale)
    let yscale = d3
      .scaleLog()
      .domain([1, Math.max(...Object.values(dataObj))]) // Ensure the domain starts at 1 to avoid log(0) errors
      .range([height, 0]);
    
    let y_axis = d3.axisLeft(yscale).ticks(10, "~s");
    
    svg
      .append("g")
      .attr("transform", `translate(${leftMargin}, ${topMargin})`)
      .call(y_axis);
    
    Object.values(dataObj).forEach((element, index) => {
      let g = svg.append("g");
    
      g.append("rect")
        .attr("x", xscale(Object.keys(dataObj)[index]))
        .attr("y", yscale(element))
        .attr("height", height - yscale(element))
        .attr("width", xscale.bandwidth() - 70) // Use dynamic bandwidth
        .attr("fill", "#1f77b4")
        .attr("transform", `translate(${leftMargin + 40}, ${topMargin})`);
     g.append("text")
        .attr("x", xscale(Object.keys(dataObj)[index]) )
        .attr("y", (yscale(element)))
        .text(element)
        .attr("transform", `translate(${leftMargin + 100}, ${topMargin - 10})`)
    });
    
}

export function d3LineChart(svgRef,data){
  const svg = d3.select(svgRef.current);
    const width = window.innerWidth - 500;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.point)])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.point))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg
      .append("g")
      .call(d3.axisLeft(y))
      .attr("transform", `translate(${margin.left},0)`);

    svg
      .append("g")
      .call(
        d3
          .axisBottom(x)
          .ticks(5)
          .tickSizeOuter(0)
      )
      .attr("transform", `translate(0,${height - margin.bottom})`);
}



