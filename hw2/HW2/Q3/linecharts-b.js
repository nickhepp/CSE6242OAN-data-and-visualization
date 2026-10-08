const vlSpec_b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": { "url": "boardgame_ratings.csv" },
  "mark": { "type": "line" },
  "title": "Number of Ratings 2016–2020 with Rankings",
  "transform": [
    {
      //"project": ['date', 'Catan=rank', 'Codenames=rank', 'Terraforming Mars=rank', 'Gloomhaven=rank'], 
      "fold": [
        "Catan=count",
        "Codenames=count",
        "Terraforming Mars=count",
        "Gloomhaven=count",
      ],
      "as": ["Game", "count"]
    },
    {
      "calculate": "split(datum.Game, '=')[0]",
      "as": "GameName"
    }
  ],
  "encoding": {
    "x": { 
      "field": "date", 
      "type": "temporal",
      "title": "Month",
      "axis": {
        "format": "%b %y"
      }      
    },
    "y": {
      "field": "count",
      "type": "quantitative",
      "title": "Num of Ratings"
    },
    "color": {
      "field": "GameName",
      "type": "nominal",
      "title": "Game",
      "scale": {
        "scheme": "category10"
      }      
    }
  }
  // your spec goes here
// Create a line chart (Figure 5) for this part (append to the same HTML page)
// whose design is a variant of what you have created in part 1. Start with your chart from part 1. Modify the Vega-Lite
// specification to 
// change over time by . Show the circle marker
// for every three months and exactly align with the x-axis ticks in part 1. Add a legend to explain what this circle marker
// represents next to your chart (see Figure 5, bottom right).
// - adding a circle marker with the ranking text on their corresponding lines
// Done:
 // - visualize how the rankings of [‘Catan’, ‘Codenames’, ‘Terraforming Mars’, ‘Gloomhaven’]
 // - Chart title: Number of Ratings 2016–2020 with Rankings

};





vegaEmbed('#svg-b', vlSpec_b, { renderer: 'svg' }).catch(console.error);

function vega_lite_spec_b() {
  return vlSpec_b;
}
function vega_spec_b() {
  return vegaLite.compile(vega_lite_spec_b()).spec;
}
