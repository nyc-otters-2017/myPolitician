//
// setting path and svg variables
// var path = d3.geo.path()
//     .projection(projection);

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .on("click", stopped, true);

// svg.append("rect")
//     .attr("class", "background")
//     .attr("width", width)
//     .attr("height", height)
//     .on("click", reset);







// If we want to project, this:
//var path = d3.geo.path()
//   .projection(projection);
//
//Get JSON file to set paths(coordinates) to d attr
// d3.json("/mbostock/raw/4090846/us.json", function(error, us) {
//   if (error) throw error;

//   g.selectAll("path")
//       .data(topojson.feature(us, us.objects.states).features)
//     .enter().append("path")
//       .attr("d", path)
//       .attr("class", "feature")
//       .on("click", clicked);

//   g.append("path")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//       .attr("class", "mesh")
//       .attr("d", path);
// });

//
