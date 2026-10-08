const vlSpec_b = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "data": { "url": "boardgame_ratings.csv" },

  "title": "Number of Ratings 2016–2020 with Rankings",


  "layer": [
    {
      "name": "lines",
      "comment": "Rating-count lines",
      "mark": { "type": "line" },
      "transform": [
        {
          "fold": [
            "Catan=count",
            "Codenames=count",
            "Terraforming Mars=count",
            "Gloomhaven=count",
            //
            "Dixit=count",
            "Dominion=count",
            "Magic: The Gathering=count",
            "Monopoly=count"
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
          "legend": null,
          "scale": {
            "scheme": "category10"
          }
        }
      }
    },
    {
      "name": "labels",
      "comment": "End-of-line game names",
      "mark": {
        "type": "text",
        "fontSize": 10,
        "align": "left",
        "baseline": "middle",
        "dx": 10,
      },
      "transform": [
        {
          "fold": [
            "Catan=count",
            "Codenames=count",
            "Terraforming Mars=count",
            "Gloomhaven=count",
            //
            "Dixit=count",
            "Dominion=count",
            "Magic: The Gathering=count",
            "Monopoly=count"            
          ],
          "as": ["Game", "count"]
        },
        {
          "calculate": "split(datum.Game, '=')[0]",
          "as": "GameName"
        },     
        {
          // we are going to add row numbers but doing so in reverse order
          "window": [{"op": "row_number", "as": "row_num"}],
          "sort": [{"field": "date", "order": "descending"}]
        },
        {
          // and we just want the last set, which is lowest values by row_num
          "filter": "datum.row_num <= 8"
          //"filter": "timeFormat(datum.date, '%Y-%m-%d') == '2020-08-01'"
        }           
      ],
      "encoding": {
        "text": {"field": "GameName"},        
        "x": {
          "field": "date",
          "type": "temporal"
        },
        "y": {
          "field": "count",
          "type": "quantitative"
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
    },

    {
      "name": "symbols",
      "comment": "Ranking circles",
      "mark": {
        "type": "circle",
        "size": 200,
        "tooltip": true
      },      
      "transform": [
        {
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
          "as": "gameName"
        },        
        {
          "filter": "month(datum.date) % 3 === 0"
        }
      ],
      "encoding": {
        "x": {
          "field": "date",
          "type": "temporal"
        },
        "y": {
          "field": "count",
          "type": "quantitative"
        },
        "color": {
          "field": "gameName",
          "type": "nominal",
          "title": "Game",
          "scale": {
            "scheme": "category10"
          }
        }
      }
     
    },

    {
      "name": "rank_labels",
      "comment": "Rankings inside circles",
      "mark": {
        "type": "text",
        "fontSize": 10,
        "align": "center",
        "baseline": "middle",
        "color": "white"
      },
      "transform": [
        {
          "fold": [
            // we need both count and rank
            // count drives the y height
            // rank drives the text
            "Catan=count",
            "Catan=rank",
            
            "Codenames=count",
            "Codenames=rank",
            
            "Terraforming Mars=count",
            "Terraforming Mars=rank",
            
            "Gloomhaven=count",
            "Gloomhaven=rank",
          ],
          // we treat both pairs of data as a generic game metric
          "as": ["GameMetric", "dataValue"]
        },
        {
          // adds a GameName field to each row
          // split off the name of the game
          "calculate": "split(datum.GameMetric, '=')[0]",
          "as": "GameName"
        },
        {
          // capture the metric
          "calculate": "split(datum.GameMetric, '=')[1]",
          "as": "Metric"
        }, 
        {
          // recombine the paired data pts so count and rank are one row
          "pivot": "Metric",
          "value": "dataValue",
          "groupby": ["date", "GameName"]
        },
        // {
        //   "calculate": "toNumber(datum.count)",
        //   "as": "count"
        // },
        // {
        //   "calculate": "toNumber(datum.rank)",
        //   "as": "rank"
        // },
        // {
        //   "filter": "isValid(datum.date) && isValid(datum.count) && isValid(datum.rank)"
        // },             
        {
          "filter": "month(datum.date) % 3 === 0"
        }
      ],
      "encoding": {
        "x": {
          "field": "date",
          "type": "temporal"
        },
        "y": {
          "field": "count",
          "type": "quantitative"
        },
        "text": {"field": "rank", "type": "quantitative"},
      }      
    },
  
    // {
    //   "name": "legend_symbols",
    //   "comment": "Legend circle",
    // },


    // {
    //   "name": "legend_labels",
    //   "comment": "'rank' inside legend circle",
    // },

    // {
    //   "name": "legend_title",
    //   "comment": "Legend description",
    // },

  ],




  // represents next to your chart (see Figure 5, bottom right).
  // - adding a circle marker with the ranking text on their corresponding lines
  // Done:
  // - visualize how the rankings of [‘Catan’, ‘Codenames’, ‘Terraforming Mars’, ‘Gloomhaven’]
  // - Chart title: Number of Ratings 2016–2020 with Rankings
  // - Show the circle marker for every three months and exactly align with the x-axis ticks in part 1. Add a legend to explain what this circle marker
};





vegaEmbed('#svg-b', vlSpec_b, { renderer: 'svg' }).catch(console.error);

function vega_lite_spec_b() {
  return vlSpec_b;
}
function vega_spec_b() {
  return vegaLite.compile(vega_lite_spec_b()).spec;
}
