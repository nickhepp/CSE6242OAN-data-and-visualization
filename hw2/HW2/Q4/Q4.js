// define the dimensions and margins for the line chart
// Use the Margin Convention referenced in the HW document to layout your graph


// define the dimensions and margins for the bar chart
var margin = { top: 50, right: 30, bottom: 30, left: 70 };
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


/*
 +-- <g id="lines"> element containing all line elements
 | |
 | +-- <path> elements for plotted lines
*/
let gLines = gContainer.append("g")
    .attr("id", "lines")

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
// Display the title “Board games by Rating 2015-2019” at the top of the chart
txtLineChartTitle = gContainer
    .append("text")
    .attr("id", "line_chart_title")
    .attr("x", width/2)
    .attr("y", -25)
    .attr("text-anchor", "middle")  // Centers text horizontally
    .text("Board games by Rating 2015-2019");

/*
 +-- <text id="credit"> element for GT username
*/
// Add your GT username beneath the title
txtCredit = gContainer
    .append("text")
    .attr("id", "credit")
    .attr("x", width/2)
    .attr("y", -5)
    .attr("text-anchor", "middle")  // Centers text horizontally
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
    const parsedRating = parseFloat(d.average_rating);
    const parsedUsers = parseFloat(d.users_rated);

    return {
        name: d.name,
        year: Number(d.year),
        averageRating: Number.isFinite(parsedRating) ? Math.floor(parsedRating) : 0,
        usersRated: Number.isFinite(parsedUsers) ? Math.floor(parsedUsers) : 0,
    }
}).then(function (data) {
    console.log(data); // you should see the data in your browser's developer tools console

    /* Create bar plot using data from csv */
    //  Display one plot line for each of the 5 years (2015–2019) in the dataset 

    const startYear = 2015;
    const endYear = 2019;

    const targetData = data.filter(datum => startYear <= datum.year && datum.year <= endYear);

    const countsByRatingAndYear = getCountsByRatingAndYear(targetData);

    const ratingCounts = Object.values(countsByRatingAndYear);
    const minRating = d3.min(ratingCounts, datum => datum.averageRating);
    const maxRating = d3.max(ratingCounts, datum => datum.averageRating);
    const maxCount = d3.max(ratingCounts, datum => datum.count);

    // build up the scales based on our mins and maxs
    const xScale = d3.scaleLinear()
        .domain([minRating, maxRating])
        .range([0, width]);
    var xAxis = d3.axisBottom().scale(xScale);
    gXAxisLines.call(xAxis);

    const yScale = d3.scaleLinear()
        .domain([0, maxCount])
        .range([height, 0]);
    var yAxis = d3.axisLeft().scale(yScale);
    gYAxisLines.call(yAxis);


    const lineGenerator = d3.line()
        .x(datum => xScale(datum.averageRating)) // x-axis is rating
        .y(datum => yScale(datum.count));        // y-axis is count of ratings

    const years = d3.range(startYear, endYear + 1);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(years);

    // each year will be a series
    const yearSeries = years.map(year => ({
        year: year,
        values: ratingCounts
            .filter(datum => datum.year === year)
            .sort((first, second) => first.averageRating - second.averageRating)
    }));

    // Use a different color for each year’s line
    gLines.selectAll("path")
        .data(yearSeries)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", series => colorScale(series.year))
        .attr("stroke-width", 2)
        .attr("d", series => lineGenerator(series.values));

    // Display a filled circle for each rating-count data point.
    // To do that we need to explode the points back out to a full set (not series by year)
    const allPoints = yearSeries.flatMap(series => 
        series.values.map(d => ({ ...d, year: series.year }))
    );

    gLines.selectAll("circle")
        .data(allPoints)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.averageRating))
        .attr("cy", d => yScale(d.count))
        .attr("r", 4)
        .attr("fill", d => colorScale(d.year));

    // Display a legend on the right-hand portion of the chart to show how line colors map to years.
    // /*
    //  +-- <g id="legend"> element for legend
    //  | |
    //  | +-- (<circle> elements for legend)
    //  | |
    //  | +-- (<text> elements for legend)
    // */
    // let gLegend = gContainer.append("g")
    //     .attr("id", "legend")

    // Clean below


 // Extract unique years for the legend rows
    const uniqueYears = yearSeries.map(series => series.year);

    // Configurable coordinates for positioning the legend on the right
    // Adjust these offsets depending on your chart width and margins
    const legendX = width - margin.right + 10; 
    const legendY = margin.top;
    const rowHeight = 20; // Vertical spacing between items

    // Create a container group for the legend
    //const legend = gLines.append("g")
        gLegend.attr("class", "chart-legend")
        .attr("transform", `translate(${legendX}, ${legendY})`);

    // Bind the years and create a container for each row
    const legendRows = gLegend.selectAll(".legend-row")
        .data(uniqueYears)
        .enter()
        .append("g")
        .attr("class", "legend-row")
        .attr("transform", (d, i) => `translate(0, ${i * rowHeight})`);

    // Draw the color marker (a small matching circle or rect)
    legendRows.append("circle")
        .attr("cx", 5)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", year => colorScale(year));

    // Draw the text label next to the marker
    legendRows.append("text")
        .attr("x", 20)
        .attr("y", 4) // Slight vertical offset to align with the circle center
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("alignment-baseline", "middle")
        .text(year => year);



}).catch(function (error) {
    console.log(error);
});


function getCompositeKey(year, rating) {
    return `${year}_${rating}`;
}


function getCountsByRatingAndYear(data) {
    let minYear = Number.MAX_SAFE_INTEGER;
    let maxYear = Number.MIN_SAFE_INTEGER;
    let minRating = Number.MAX_SAFE_INTEGER;
    let maxRating = Number.MIN_SAFE_INTEGER;

    // group by year and rating
    const countsByRatingAndYear = data.reduce((acc, datum) => {

        // compound key using grouping fields
        const key = getCompositeKey(datum.year, datum.averageRating);

        if (!acc[key]) {
            acc[key] = {
                year: datum.year,
                averageRating: datum.averageRating,
                count: 1
            };
        } else {
            acc[key].count += 1;
        }

        minYear = Math.min(minYear, datum.year);
        maxYear = Math.max(maxYear, datum.year);
        minRating = Math.min(minRating, datum.averageRating);
        maxRating = Math.max(maxRating, datum.averageRating);

        return acc;
    }, {});


    // If some of the datapoints in the chart do not have ratings, generate dummy values (0s) to be displayed on
    // the chart for the required years (i.e If a year/rating combination has no games, use a count of 0).

    for (let tYear = minYear; tYear <= maxYear; tYear++)
    {
        for (let tRating = 0; tRating <= maxRating; tRating++)
        {
            const nextKey = getCompositeKey(tYear, tRating)
            if (!countsByRatingAndYear[nextKey]) {
                countsByRatingAndYear[nextKey] = {
                    year: tYear,
                    averageRating: tRating,
                    count: 0
                };
            };
        }
    }

    return countsByRatingAndYear;
}
