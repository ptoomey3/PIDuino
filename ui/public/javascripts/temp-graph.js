var n = 243,
    duration = 750,
    now = new Date(Date.now() - duration),
    random = d3.random.normal(0, 20),
    gdata = d3.range(n).map(function() { return 0; }),
    bdata = d3.range(n).map(function() { return 0; }),
    t1data = [],
    t2data = []
var margin = {top: 6, right: 0, bottom: 20, left: 40},
    width = 940 - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.time.scale()
    .domain([now - (n - 2) * duration, now - duration])
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d, i) { return x(now - (n - 1 - i) * duration); })
    .y(function(d, i) { return y(d); });

var svg = d3.select("#temp-graph").append("p").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", -margin.left + "px")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var axis = svg.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + height + ")")
    .call(x.axis = d3.svg.axis().scale(x).orient("bottom"));

//var gpath = svg.append("g")
//    .attr("clip-path", "url(#clip)")
//  .append("path")
//    .data([gdata])
//    .attr("class", "line")

var bpath = svg.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .data([bdata])
    .attr("class", "line")

var gpath = svg.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .data([gdata])
    .attr("class", "line")


tick();

function tick() {
  // update the domains
  now = new Date();
  x.domain([now - (n - 2) * duration, now - duration]);
  //y.domain([0, d3.max(gdata)]);
  y.domain([60, 250]);

  // push the accumulated count onto the back, and reset the count

  // Get average temp during tick duration
  var sum = 0, avg = 0, tcopy;

  tcopy = t1data;
  t1data = [];
  tcopy.forEach(function(n){
    sum += parseFloat(n); 
    avg = sum / tcopy.length;
  });
  console.log(avg);
  bdata.push(avg);

  sum = 0;
  tcopy = t2data;
  t2data = [];
  tcopy.forEach(function(n){
    sum += parseFloat(n); 
    avg = sum / tcopy.length;
  });
  console.log(avg);
  gdata.push(avg);


  // redraw the line
  svg.selectAll(".line")
      .attr("d", line)
      .attr("transform", null);

  // slide the line left
  bpath.transition()
      .duration(duration)
      .ease("linear")
      .attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")
  // slide the line left
  gpath.transition()
      .duration(duration)
      .ease("linear")
      .attr("transform", "translate(" + x(now - (n - 1) * duration) + ")")

  // slide the x-axis left
  axis.transition()
      .duration(duration)
      .ease("linear")
      .call(x.axis)
      .each("end", tick);

  // pop the old data point off the front
  gdata.shift();
  bdata.shift();
}