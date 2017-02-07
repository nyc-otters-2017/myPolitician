class State extends React.Component{

  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {

    var width = 960,
        height = 720,
        active = d3.select(null);

    var projection = d3.geo.mercator()
        .scale(6500)
        .center([-75.75, 42.80])
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
        .on("click", stopped, true);

        svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height)
          .on("click", reset);

    var tooltip = d3.select(".map-container").append("div")
          .attr("class", "tooltip");
        tooltip.append('h3')
          .attr("class", "congressman")
        tooltip.append('h4')
          .attr("class", "congressional")
        tooltip.append('h4')
          .attr("class", "location")

    var g = svg.append("g");

        svg
          .call(zoom)
          .call(zoom.event);

    d3.json("NYS_Congressional_Districts.json", function(error, ny) {
        if (error) throw error;
        g.selectAll("path")
          .data(topojson.feature(ny, ny.objects.districts).features)
          .enter().append("path")
            .attr("d", path)
            .attr("class", "feature")
            .on("click", clicked);
        g.append("path")
          .datum(topojson.mesh(ny, ny.objects.districts, function(a, b) {return a != b; }))
          .attr("class", "mesh")
          .attr("d", path);

        var features = g.selectAll(".feature")
          .on("mouseover", function(ny) {
            tooltip.select(".congressman").html(ny.properties.CD_Name + " (" + ny.properties.Party + ")")
            tooltip.select(".congressional").html(ny.properties.NAMELSAD)
            tooltip.select(".location").html(ny.properties.CD_Location)
            tooltip.style("opacity", .9)
          }.bind(this))
          .on("mousemove", function(ny) {
            tooltip.style("left", (d3.event.pageX - 600) + "px")
            tooltip.style("top", (d3.event.pageY - 400) + "px")
          })
          .on("mouseout", function(ny) {
            tooltip.style("opacity", 0);
          })

        g.selectAll(".feature")
        .on("click", function(ny) {
          debugger
          this.props.onGetHouseMember(ny.properties.CD114FP)
          this.props.onGetStateMembers()
          // Need to update ny info with member id
          this.props.onGetMember(ny.properties.id)
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
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    function stopped() {
          if (d3.event.defaultPrevented) d3.event.stopPropagation();
        }
    }

    handleClick(e) {
        e.preventDefault;
        state = e.target.innerHTML;
        this.props.onGetStateMembers(state);
    }

    render(){
      return(
        <h1></h1>
      )
    }
}
