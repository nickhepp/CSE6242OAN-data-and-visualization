const vlSpec_c1 = JSON.parse(JSON.stringify(vlSpec_b));
vlSpec_c1.title = "Number of Ratings 2016–2020 (Square root Scale)";

if (Array.isArray(vlSpec_c1.layer)) {
  vlSpec_c1.layer.forEach(layer => {
    if (layer.encoding?.y) {
      // If scale doesn't exist, initialize it as an empty object, then set type
      (layer.encoding.y.scale ??= {}).type = "sqrt";
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
