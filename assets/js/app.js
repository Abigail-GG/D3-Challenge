// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Load data 
d3.csv("./assets/data/data.csv").then(function(journalData) {

// Print the journalData
console.log(journalData);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([3, 22])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.left)
      .attr("y", height + margin.top + 30)
      .text("In Poverty (%)")
      .attr("class", "active");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top - height/2 + 20)
      .text("Lacks Healthcare (%)")
      .attr("class", "active");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([7, 26])
    .range([ height, 10]);
  svg.append("g")
    .call(d3.axisLeft(y));

  

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(journalData)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.healthcare); } )
      .attr("cy", function (d) { return y(d.poverty); } )
      .attr("r", 15)
      .attr("class", "stateCircle")


  var gdots =  svg.selectAll("g.dot")
      .data(journalData)
      .enter().append('g');

      gdots.append("circle")
      .attr("class", "dot")

      .attr("cx", function (d) {
          return x(d.healthcare);
      })
      .attr("cy", function (d) {
          return y(d.poverty);
      })
 

      gdots.append("text").text(function(d){
        return d.abbr;
    })
    .attr("x", function (d) {
        return x(d.healthcare);
    })
    .attr("y", function (d) {
        return y(d.poverty);
    })
    .attr("class", "stateText");
    
});