const vlSpec_c2 = JSON.parse(JSON.stringify(vlSpec_b));
vlSpec_c2.title = "Number of Ratings 2016–2020 (Log Scale)";

if (Array.isArray(vlSpec_c2.layer)) {
  vlSpec_c2.layer.forEach(layer => {
    if (layer.encoding?.y) {
      layer.encoding.y.scale = {
        ...layer.encoding.y.scale,
        type: "log",
        domainMin: 1  // keep a zero from blowing up the graph
      };
    }
  });
}

vegaEmbed('#svg-c1', vlSpec_c1, { renderer: 'svg' }).catch(console.error);

function vega_lite_spec_c1() {
  return vlSpec_c1;
}
function vega_spec_c1() {
  return vegaLite.compile(vega_lite_spec_c1()).spec;
}



vegaEmbed('#svg-c2', vlSpec_c2, { renderer: 'svg' }).catch(console.error);

function vega_lite_spec_c2() {
  return vlSpec_c2;
}
function vega_spec_c2() {
  return vegaLite.compile(vega_lite_spec_c2()).spec;
}