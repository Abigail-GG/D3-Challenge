var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart and shift the latter by left and top margins
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data 
d3.csv("./assets/data/data.csv").then(function(censusData) {

// Print the journalData
console.log(journalData);

// Parse data
censusData.forEach(function(data) {
  data.healthcare = +data.healthcare;
  data.poverty = +data.poverty;
});

 // Create scale functions
var xLinearScale = d3.scaleLinear()
.domain(d3.extent(censusData, d => d.poverty))
.range([0, width]);

var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(censusData, d => d.healthcare)])
.range([height, 0]);

// Create axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Append axes to the chart
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

// Create circles
var circlesGroup = chartGroup.selectAll("Circle")
.data(censusData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("class", "stateCircle");

var circleLabels = chartGroup.selectAll(null).data(censusData).enter().append("text");

circleLabels
.attr("x", function(d) {
  return xLinearScale(d.poverty);
})
.attr("y", function(d) {
  return yLinearScale(d.healthcare);
})
.text(function(d) {
  return d.abbr;
})
.attr("font-family", "sans-serif")
.attr("class", "stateText");


// Create axes labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left + 40)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.attr("class", "active")
.text("Lacks Healthcare (%)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "active")
.text("In Poverty (%)");

});