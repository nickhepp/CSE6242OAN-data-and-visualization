(function () {
  "use strict";

  var chartHeight = 330;
  var margins = { top: 20, right: 16, bottom: 48, left: 50 };
  var dynamicPoints = [
    { x: 0.02, y: 0.19 },
    { x: 0.25, y: 0.58 },
    { x: 0.5, y: 0.78 },
    { x: 0.75, y: 0.58 },
    { x: 0.98, y: 0.19 }
  ];

  function drawAxes(plot, innerWidth, innerHeight) {
    plot.append("line")
      .attr("class", "axis-line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", innerHeight)
      .attr("y2", innerHeight);

    plot.append("line")
      .attr("class", "axis-line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", innerHeight);

    plot.append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 36)
      .attr("text-anchor", "middle")
      .text("feature");

    plot.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -36)
      .attr("text-anchor", "middle")
      .text("predicted value");
  }

  function setupChart(selector) {
    var svg = d3.select(selector);
    var width = Math.max(240, Math.round(svg.node().getBoundingClientRect().width));
    var innerWidth = width - margins.left - margins.right;
    var innerHeight = chartHeight - margins.top - margins.bottom;
    var plot = svg
      .attr("viewBox", "0 0 " + width + " " + chartHeight)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    drawAxes(plot, innerWidth, innerHeight);

    return {
      svg: svg,
      plot: plot,
      innerWidth: innerWidth,
      innerHeight: innerHeight,
      x: d3.scaleLinear().domain([0, 1]).range([0, innerWidth]),
      y: d3.scaleLinear().domain([0, 1]).range([innerHeight, 0])
    };
  }

  var staticChart = setupChart("#static-chart");
  var staticLine = d3.line()
    .x(function (point) { return staticChart.x(point.x); })
    .y(function (point) { return staticChart.y(point.y); });

  staticChart.plot.append("path")
    .datum([{ x: 0.02, y: 0.18 }, { x: 0.98, y: 0.82 }])
    .attr("class", "trend-line static-line")
    .attr("d", staticLine);

  var dynamicChart = setupChart("#dynamic-chart");
  var spline = d3.line()
    .curve(d3.curveCatmullRom.alpha(0.5))
    .x(function (point) { return dynamicChart.x(point.x); })
    .y(function (point) { return dynamicChart.y(point.y); });
  var splinePath = dynamicChart.plot.append("path")
    .attr("class", "trend-line dynamic-line");
  var handles = dynamicChart.plot.append("g").attr("aria-label", "Editable curve points");

  function updateCurve() {
    splinePath.datum(dynamicPoints).attr("d", spline);
    handles.selectAll(".point-hit")
      .attr("cx", function (point) { return dynamicChart.x(point.x); })
      .attr("cy", function (point) { return dynamicChart.y(point.y); })
      .attr("aria-valuenow", function (point) { return Math.round(point.y * 100); });
    handles.selectAll(".point-handle")
      .attr("cx", function (point) { return dynamicChart.x(point.x); })
      .attr("cy", function (point) { return dynamicChart.y(point.y); });
  }

  function adjustPoint(point, delta) {
    point.y = Math.max(0.06, Math.min(0.94, point.y + delta));
    updateCurve();
  }

  var dragBehavior = d3.drag()
    .container(function () { return dynamicChart.plot.node(); })
    .on("drag", function (point) {
      point.y = Math.max(0.06, Math.min(0.94, dynamicChart.y.invert(d3.event.y)));
      updateCurve();
    });

  handles.selectAll(".point-hit")
    .data(dynamicPoints)
    .enter()
    .append("circle")
    .attr("class", "point-hit")
    .attr("r", 14)
    .attr("tabindex", 0)
    .attr("role", "slider")
    .attr("aria-label", function (point, index) { return "Curve control point " + (index + 1); })
    .attr("aria-valuemin", 6)
    .attr("aria-valuemax", 94)
    .on("keydown", function (point) {
      if (d3.event.key === "ArrowUp" || d3.event.key === "ArrowRight") {
        d3.event.preventDefault();
        adjustPoint(point, 0.04);
      } else if (d3.event.key === "ArrowDown" || d3.event.key === "ArrowLeft") {
        d3.event.preventDefault();
        adjustPoint(point, -0.04);
      }
    })
    .call(dragBehavior);

  handles.selectAll(".point-hit")
    .each(function (point) {
      handles.append("circle")
        .datum(point)
        .attr("class", "point-handle")
        .attr("r", 5);
    });

  updateCurve();
}());