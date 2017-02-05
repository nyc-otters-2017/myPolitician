// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
//= require_tree .
//= require d3

$(document).ready(function() {
  var width = 960,
      height = 960,
      active = d3.select(null);

  var projection = d3.geo.mercator()
    .scale(5000)
    .center([-75.94, 41.70])
    .translate([ width / 2, height / 2 ] );

  var zoom = d3.behavior.zoom()
    .translate([0, 0])
    .scale(1)

    .scaleExtent ([1, 20])

    .on("zoom", zoomed);

  var path = d3.geo.path()
    .projection(projection);

  var svg = d3.select(".map-container").append("svg")
    .attr("width", width)
    .attr("height", height)

  svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)

  var tooltipDiv = d3.select(".map-container").append("div")
    .attr("class", "tooltip");

  var g = svg.append("g");

  svg
    .call(zoom)
    .call(zoom.event);

  d3.json("NYS_Congressional_Districts.json", function(error, us) {
    if (error) throw error;
      console.log(us)

    g.selectAll("path")
      .data(topojson.feature(us, us.objects.districts).features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", "feature");

    g.append("path")
      .datum(topojson.mesh(us, us.objects.districts, function(a, b) {return a != b; }))
      .attr("class", "mesh")
      .attr("d", path);

      console.log(g.selectAll("path"))

      var features = g.selectAll(".feature")
        .on("mouseover", function(d) {
          console.log(this);
      })
  })



  function zoomed() {
    g.style("stroke-width", 1.5 / d3.event.scale + "px");
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
  }

});
