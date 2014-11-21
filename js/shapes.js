var w = 400;
var h = 400;
var interval = w/4;
var sw = 40;
var sh = 40;

var flow_shapes = { 
  prep: function(height, width) {
    var points = [ [0,height/2], [width*.2,0], [width*.8,0], [width,height/2],[width*.8,height],[width*.2,height],[0,height/2] ]
    return d3.svg.line()(points);
  },
  io: function(height, width) {
    var points = [ [0,height], [width*.2,0], [width,0], [width*.8,height], [0,height] ]
    return d3.svg.line()(points);
  },
  square: function(height, width) {
    var points = [ [0,height], [width,0], [width,0], [width,height], [0,height] ]
    return d3.svg.line()(points);
  }
}

var nodes = [
  {NodeType: "prep", x:50, y:0,  height:sh, width: sw},
]

svg = d3.select("#canvas").append("svg:svg").attr("width", w).attr("height", h)

svg.selectAll("path")
  .data(nodes).enter().append("svg:path")
  .attr("d", function(d) { return flow_shapes[d.NodeType](d.height, d.width);})
  .attr("stroke", "black")
  .attr("fill", "none")
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")"
  });

function animate(x, y, colour, type) {
  d3.selectAll("path")
    .transition().delay(300)
    .attr("fill", colour)
    .attr("d", function() { return flow_shapes[type](sh, sw);})
    .attr("transform", function(d) {
      return "translate(" + x + "," + y + ")"
    });
}

$('#about').click(function() {
  animate(0, 0, "white", "square");
});

$('#blog').click(function() {
  animate(interval, 0, "red", "prep");
});

$('#contact').click(function() {
  animate(interval*2, 0, "green", "io");
});

$('#github').click(function() {
  animate(interval*3, 0, "blue", "prep");
});