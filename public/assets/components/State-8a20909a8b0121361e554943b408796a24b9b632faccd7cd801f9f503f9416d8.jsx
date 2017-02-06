class State extends React.Component{

  constructor(){
    super()

    this.state = {}
    this.handleClick = this.handleClick.bind(this)



  }


  componentDidMount(){

      var width = 960,
          height = 960,
          active = d3.select(null);

      var projection = d3.geo.mercator()
        .scale(6550)
        .center([-75.75, 42.30])
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
        .on("click", reset);

      var tooltip = d3.select(".map-container").append("div")
        .attr("class", "tooltip");
        tooltip.append('h2')
          .attr("class", "congressional-district")
        tooltip.append('h3')
          .attr("class", "congressman")

      var g = svg.append("g");

      svg
        .call(zoom)
        .call(zoom.event);

      d3.json("NYS_Congressional_Districts.json", function(error, us) {
        if (error) throw error;
          console.log(us)
          console.log(us)
        g.selectAll("path")
          .data(topojson.feature(us, us.objects.districts).features)
          .enter().append("path")
            .attr("d", path)
            .attr("class", "feature")
            .on("click", clicked);

        g.append("path")
          .datum(topojson.mesh(us, us.objects.districts, function(a, b) {return a != b; }))
          .attr("class", "mesh")
          .attr("d", path);


        var features = g.selectAll(".feature")
          .on("mouseover", function(us) {
            console.log(us.properties.NAMELSAD)
            tooltip.select(".congressional-district").html(us.properties.NAMELSAD)
            tooltip.select(".congressman").html(us.properties.CD_Name + " (" + us.properties.Party + ")")
            tooltip.style("opacity", 1)
            .style("left", (d3.event.pageX / 2) + "px")
            .style("top", (d3.event.pageY / 2) + "px");
          })
          .on("mouseout", function(us) {
            tooltip.style("opacity", 0);
          })
          
        g.selectAll(".feature")
        .on("click", function(us) {


          this.props.onGetHouseMember(us.properties.CD114FP)
          this.props.onGetState()


              // tooltip.style('display', 'block');
              // // d3.select(this).classed("active", true).movetoFront();

          }.bind(this))

      }.bind(this))

      function clicked(d) {
        if (active.node() === this) return reset();
        active.classed("active", false);
        active = d3.select(this).classed("active", true);

        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg.transition()
            .duration(750)
            .call(zoom.translate(translate).scale(scale).event);
    }


    function reset() {
      active.classed("active", false);
      active = d3.select(null);

      svg.transition()
          .duration(750)
          .call(zoom.translate([0, 0]).scale(1).event);
    }


      function zoomed() {
        g.style("stroke-width", 1.5 / d3.event.scale + "px");
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
      }

}



  handleClick(e){
    e.preventDefault
    state = e.target.innerHTML
    this.props.onGetState(state)
  }

  render(){
    return(
      <h1></h1>
    )
  }
}
