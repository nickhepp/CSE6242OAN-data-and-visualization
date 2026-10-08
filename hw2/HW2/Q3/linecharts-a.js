const vlSpec_a = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": { "url": "boardgame_ratings.csv" },
  "mark": { "type": "line" },
  "title": "Number of Ratings 2016-2020",
  "transform": [
    {
      "fold": [
        "Catan=count",
        "Dominion=count",
        "Codenames=count",
        "Terraforming Mars=count",
        "Gloomhaven=count",
        "Magic: The Gathering=count",
        "Dixit=count",
        "Monopoly=count"
      ],
      "as": ["Game", "Count"]
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
      "field": "Count",
      "type": "quantitative",
      "title": "Player Count"
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
};

vegaEmbed('#svg-a', vlSpec_a, { renderer: 'svg' })
  .catch(console.error);

function vega_lite_spec_a() {
  return vlSpec_a;
}
function vega_spec_a() {
  return vegaLite.compile(vega_lite_spec_a()).spec;
}
