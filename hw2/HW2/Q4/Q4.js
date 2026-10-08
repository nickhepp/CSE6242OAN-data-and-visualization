// define the dimensions and margins for the line chart
// Use the Margin Convention referenced in the HW document to layout your graph


// define the dimensions and margins for the bar chart
var margin = {top: 50, right: 30, bottom: 30, left: 70};
const width = 1000;
const height = 1000;

// append svg element to the body of the page
// set dimensions and position of the svg element
let svg = d3
  .select("body")
  .append("svg")
  .attr("id", "line_chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

let gContainer = svg.append("g")
  .attr("id", "container")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


let gLines = gContainer.append("g")
  .attr("id", "lines")

/*
 +-- <g id="lines"> element containing all line elements
 | |
 | +-- <path> elements for plotted lines
*/

/*
 +-- <g id="x-axis-lines"> element for x-axis
 |
 +-- <g id="y-axis-lines"> element for y-axis
*/
let gXAxisLines = gContainer.append("g")
  .attr("id", "x-axis-lines")
let gYAxisLines = gContainer.append("g")
  .attr("id", "y-axis-lines")

/*
 +-- <g id="circles"> element for all circular elements
 | |
 | +-- <circle> elements
*/
let gCircles = gContainer.append("g")
  .attr("id", "circles")

/*
 +-- <text id="line_chart_title"> element for line chart title
*/
txtLineChartTitle = gContainer
    .append("text")
    .attr("id", "line_chart_title")
    .text("TODO");

/*
 +-- <text id="credit"> element for GT username
*/
txtCredit = gContainer
    .append("text")
    .attr("id", "credit")
    .text("nheppermann3");

/*
 +-- <g id="legend"> element for legend
 | |
 | +-- (<circle> elements for legend)
 | |
 | +-- (<text> elements for legend)
*/
let gLegend = gContainer.append("g")
  .attr("id", "legend")


/*
 +-- <text> element for x axis label
 |
 +-- <text> element for y axis label

 • Set the horizontal axis label to Rating and the vertical axis label to Count.
*/
xAxisLabel = gContainer
    .append("text")
    .attr("id", "x_axis_label")
    .text("Rating");
yAxisLabel = gContainer
    .append("text")
    .attr("id", "y_axis_label")
    .text("Count");

/*
<div id="bar_chart_title"> containing bar chart title
*/
let divBarChartTitle = d3
  .select("body")
  .append("div")
  .attr("id", "bar_chart_title")
  .text("TODO");

/*
<svg id="bar_chart"> containing bar chart
*/
let svgBarChart = d3
  .select("body")
  .append("svg")
  .attr("id", "bar_chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

/*
+-- <g id="container_2">
*/
let gContainer2 = svgBarChart.append("g")
  .attr("id", "container_2")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

/*
 +-- <g id="bars"> element for bars
 | |
 | +-- <rect> elements for bars
*/
let gBars = gContainer2.append("g")
    .attr("id", "bars");

/*
 +-- <g id="x-axis-bars"> element for x-axis
 |
 +-- <g id="y-axis-bars"> element for y-axis
*/
let gXAxisBars = gContainer2.append("g")
    .attr("id", "x-axis-bars");
let gYAxisBars = gContainer2.append("g")
    .attr("id", "y-axis-bars");

/*
 +-- <text id="bar_x_axis_label"> element for x axis label
 |
 +-- <text id="bar_y_axis_label"> element for y axis label
*/
txtXBarAxisLabel = gContainer
    .append("text")
    .attr("id", "bar_x_axis_label")
    .text("TODO");

txtYBarAxisLabel = gContainer
    .append("text")
    .attr("id", "bar_y_axis_label")
    .text("TODO");


/*
<svg id="line_chart"> containing line chart
|
+-- <g id="container">
 |
 +-- <g id="lines"> element containing all line elements
 | |
 | +-- <path> elements for plotted lines
 |
 +-- <g id="x-axis-lines"> element for x-axis
 |
 +-- <g id="y-axis-lines"> element for y-axis
 |
 +-- <g id="circles"> element for all circular elements
 | |
 | +-- <circle> elements
 |
 +-- <text id="line_chart_title"> element for line chart title
 |
 +-- <text id="credit"> element for GT username
 |
 +-- <g id="legend"> element for legend
 | |
 | +-- (<circle> elements for legend)
 | |
 | +-- (<text> elements for legend)
 |
 +-- <text> element for x axis label
 |
 +-- <text> element for y axis label
<div id="bar_chart_title"> containing bar chart title
<svg id="bar_chart"> containing bar chart
|
+-- <g id="container_2">
 |
 +-- <g id="bars"> element for bars
 | |
 | +-- <rect> elements for bars
 |
 +-- <g id="x-axis-bars"> element for x-axis
 |
 +-- <g id="y-axis-bars"> element for y-axis
 |
 +-- <text id="bar_x_axis_label"> element for x axis label
 |
 +-- <text id="bar_y_axis_label"> element for y axis label
*/






// Fetch the data
var pathToCsv = "average-rating.csv";		// path to csv

d3.dsv(",", pathToCsv, function (d) {

  
  return {
    name: d.name,
    year: d.year,
    averageRating: Number.isFinite(d.average_rating) ? Math.floor(d.average_rating) : 0,
    usersRated: Number.isFinite(d.users_rated) ? Math.floor(d.users_rated) : 0,
  }
}).then(function (data) {
  console.log(data); // you should see the data in your browser's developer tools console

  /* Create bar plot using data from csv */
  //  Display one plot line for each of the 5 years (2015–2019) in the dataset 

  const targetData = data.filter(datum => 2015 <= datum.year && datum.year <= 2019);

  // If some of the datapoints in the chart do not have ratings, generate dummy values (0s) to be displayed on
  // the chart for the required years (i.e If a year/rating combination has no games, use a count of 0).


}).catch(function (error) {
  console.log(error);
});