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
    .attr("id", "legend");

// Tooltip text is added when the map is interactive.
let divTooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("display", "none");






// enter code to create color scale

// enter code to define tooltip

// enter code to define projection and path required for Choropleth
// For grading, set the name of functions for projection and path as "projection" and "path"
// var projection = 
// var path =


// define any other global variables 

Promise.all([
    // enter code to read files
    d3.json("data/world_countries.json"),
    d3.csv("data/wildlife_trafficking.csv", d => {
        return {
            country: d["Country of Incident"], // Keep as string
            year: +d.Year,                                // Convert to integer
            num_incidents: +d.Number_of_Incidents,  // Convert to integer
            avg_fine: Number.isFinite(+d.Average_Fine) ? +d.Average_Fine : 0,                // Convert to float
            avg_imprisonment: Number.isFinite(+d.Average_Imprisonment) ? +d.Average_Imprisonment : 0 // Convert to float
        };
    })
]).then(([worldData, traffickingData]) => {


/*
• Each row in wildlife_trafficking.csv represents the number of wildlife trafficking incidents per country in a
given year, in the form of <Year,Country,Number of Incidents,Average Fine,Average Imprisonment>,
where
– Year: the year in which the wildlife trafficking incidents occurred
– Country: a country in the world, e.g., United States of America.
– Number of Incidents: the number of wildlife trafficking incidents that occurred in Country in Year.
– Average Fine: the average fine in USD for wildlife traffickers caught for incidents occurring in Country in Year.
– Average Imprisonment: the average imprisonment term in years for wildlife traffickers caught for incidents
occurring in Country in Year.
*/




    // enter code to call ready() with required arguments
    ready(null, worldData, traffickingData);
});

// this function should be called once the data from files have been read
// world: topojson from world_countries.json
// traffickingData: data from wildlife_trafficking.csv

function ready(error, worldData, traffickingData) {
    // enter code to extract required fields from traffickingData

    // enter code to append the years to the dropdown
    
    // event listener for the dropdown. Update choropleth and legend when selection changes. Call createMapAndLegend() with required arguments.
    
    // create Choropleth with default option. Call createMapAndLegend() with required arguments. 
}

// this function should create a Choropleth and legend using the world and traffickingData arguments for a selectedYear
// also use this function to update Choropleth and legend when a different year is selected from the dropdown
function createMapAndLegend(world, traffickingData, selectedYear){ 

    
}

