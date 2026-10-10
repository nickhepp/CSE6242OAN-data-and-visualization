// define the dimensions and margins for the bar chart
// enter code to define margin and dimensions for svg
var margin = { top: 50, right: 30, bottom: 30, left: 70 };
const width = 1000;
const height = 1000;

/*

<select id="yearDropdown"> sorted list of year options
|
+-- <option> (one option for each year; value = year)
|
+-- text (= year)

<svg id="choropleth"> contains choropleth map
|
+-- <g id="countries">
| |
| +-- <path>s for each country
|
+-- <g id="legend"> legend

<div id="tooltip"> contains tooltip to display (Q5.2)
|
+-- (text for tooltip)

*/

// Dropdown options are added after the wildlife data is loaded.
let yearDropdown = d3.select("#yearDropdown");

// enter code to create svg
// Choropleth map containers.
let svg = d3
    .select("body")
    .append("svg")
    .attr("id", "choropleth")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

let gCountries = svg.append("g")
    .attr("id", "countries")
    .attr("transform", `translate(${margin.left},${margin.top})`);

let gLegend = svg.append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${margin.left}, ${margin.top + 20})`)
    .text("nheppermann3");

// enter code to define tooltip
// Tooltip text is added when the map is interactive.
let divTooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("display", "none");

// enter code to define projection and path required for Choropleth
// For grading, set the name of functions for projection and path as "projection" and "path"
var projection = d3.geoMercator().translate([width/2, height/2]).scale(2200).center([0,40]);
var path = d3.geoPath().projection(projection);


// define any other global variables 

Promise.all([
    // enter code to read files
    d3.json("data/world_countries.json", d => {
        d.dval = '1';
        return d;
    }),
    d3.csv("data/wildlife_trafficking.csv", d => {
        return {
            country: d["Country of Incident"], // Keep as string
            year: +d.Year,                                // Convert to integer
            numIncidents: +d.Number_of_Incidents,  // Convert to integer
            avgFine: Number.isFinite(+d.Average_Fine) ? +d.Average_Fine : 0,                // Convert to float
            avgImprisonment: Number.isFinite(+d.Average_Imprisonment) ? +d.Average_Imprisonment : 0 // Convert to float
        };
    })
]).then(([worldData, traffickingData]) => {

    // enter code to call ready() with required arguments
    ready(null, worldData, traffickingData);

});

// this function should be called once the data from files have been read
// world: topojson from world_countries.json
// traffickingData: data from wildlife_trafficking.csv

function ready(error, worldData, traffickingData) {
    // enter code to extract required fields from traffickingData

    // enter code to append the years to the dropdown
    /*
        • The list options should be obtained from the Year column of the csv file.
        • Sort the list options in increasing order. Set the default display value to the first option.
    */
    const years = [...new Set(traffickingData.map(td => td.year))];
    const sortedYears = years.sort((a, b) => a - b);
    yearDropdown.selectAll("option")
        .data(sortedYears)
        .enter()
        .append("option")
        .attr("value", function(d) { return d; })
        .text(function(d) { return d; })
        .property("selected", (d, i) => {
            return i === 0;
        });


    // event listener for the dropdown. Update choropleth and legend when selection changes. Call createMapAndLegend() with required arguments.
    yearDropdown.on("change", function() {
        const selectedYear = +this.value; 
        createMapAndLegend(worldData, traffickingData, selectedYear);    
    });

    // create Choropleth with default option. Call createMapAndLegend() with required arguments. 
    createMapAndLegend(worldData, traffickingData, sortedYears[0]);
}

// this function should create a Choropleth and legend using the world and traffickingData arguments for a selectedYear
// also use this function to update Choropleth and legend when a different year is selected from the dropdown
function createMapAndLegend(world, traffickingData, selectedYear){ 

    const clrGradientCount = 4;

    // clear previous entries
    gCountries.selectAll("path").remove();

    // enter code to create color scale
    const yearNumIncs = traffickingData
        .filter(d => d.year === selectedYear)
        .map(td => td.numIncidents);

    // originally we tried a straight quantile w/o scaling, and all the data was bunched at the left
    // but we have a very right skewed data set (example year 2022)
    //.domain(yearNumIncs) <-- results from the left, below 
    // 1.00 to 1.75
    // 1.75 to 6.00
    // 6.00 to 14.25
    // 14.25 to 360.00

    // so instead of straight linear we goto to a log scale for colors
    const maxCount = d3.max(yearNumIncs);
    const maxLogCount = Math.log1p(maxCount);
    const breaks = d3.range(1, 4).map(i =>
        Math.expm1(maxLogCount * i / 4)
    );
    const colorScale = d3.scaleQuantile()
        .domain(breaks)
        // Color them along a gradient of exactly 4 gradations from a single hue, darker colors corresponding to
        // higher incident counts and lighter colors corresponding to lower incident counts
        .range(d3.schemeBlues[clrGradientCount]); // gets 4 blue shades

    gCountries.selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const countryName = d.properties.name;
                const trafficDat = traffickingData;
                const matchedTd = trafficDat.find(td => 
                    td.year === selectedYear && td.country === countryName
                );

                return matchedTd ? 
                    colorScale(matchedTd.numIncidents) : 
                    // Many countries have no incidents for some years — these should be colored gray
                    "#ccc";
            })
            .attr("stroke", "#333")
            .on("mouseover", function(d) {
                const countryName = d.properties.name;
                const matchedTd = traffickingData.find(td =>
                    td.year === selectedYear && td.country === countryName
                );

                const numIncs = matchedTd ? matchedTd.numIncidents : "N/A";
                const avgFine = matchedTd ? '$' + matchedTd.avgFine.toFixed(2) : "N/A";
                const avgImprisonment = matchedTd ? `${matchedTd.avgImprisonment.toFixed(2)} years` : "N/A";

                divTooltip
                    .style("display", "block")
                    .text(`Country: ${countryName}\n
                            Year: ${selectedYear}\n
                            Number of Incidents: ${numIncs}\n
                            Average Fine (USD): ${avgFine}\n
                            Average imprisonment (Years): ${avgImprisonment}`);
            })
            .on("mousemove", function() {
                divTooltip
                    .style("left", `${d3.event.pageX + 12}px`)
                    .style("top", `${d3.event.pageY + 12}px`);
            })
            .on("mouseout", function() {
                divTooltip.style("display", "none");
            });


    const colorLegend = d3.legendColor()
        .scale(colorScale)          // Pass your scale to the legend generator
        .shapeWidth(30)             // Customize width of the color block
        .shapeHeight(20)            // Customize height of the color block
        .shapePadding(5)            // Vertical spacing between blocks
        .labelFormat(d3.format(".2f")); // Clean up decimals on thresholds (e.g. "10 to 45")
    gLegend.call(colorLegend);

/*

Add a vertical legend showing how colors map to the number of incidents for a particular country. The
legend must update for the quartiles of the selected year, and display values formatted to show precision up to 2
decimal places. You must use exactly 4 color gradations in your submission. It is recommended, but not required,
to use d3-legend.min.js (in the lib folder) to create the legend for the scale you use. The legend bars should
be rectangular in shape. 



    // Display a legend on the right-hand portion of the chart to show how line colors map to years.
    const legendX = width - margin.right + 10; // legend on the right
    const legendY = margin.top;
    const rowHeight = 20; // vertical spacing between items
    gLegend.attr("transform", `translate(${legendX}, ${legendY})`);

    // Bind the years and create a container for each row
    const legendRows = gLegend.selectAll(".legend-row")
        .data(uniqueYears)
        .enter()
        .append("g")
        .attr("class", "legend-row")
        .attr("transform", (d, i) => `translate(0, ${i * rowHeight})`);

    // Display a filled circle for each rating-count data point
    legendRows.append("circle")
        .attr("cx", 5)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", year => colorScale(year));

    // Paint the year
    legendRows.append("text")
        .attr("x", 20)
        .attr("y", 4)
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("alignment-baseline", "middle")
        .text(year => year);



*/



}

