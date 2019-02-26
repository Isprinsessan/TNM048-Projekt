function FocusPlotContext(data){

  drawChart(data);
}


function drawChart(data)
{


  var margin = { top : 20, right: 20, bottom: 150, left: 40 },
      margin2 = { top: 100, right: 20, bottom: 50, left: 40 },
      width = $("#plot").parent().width() - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      height2 = 200 - margin2.top - margin2.bottom;

  var svg = d3.select("#plot").append("svg")
      .attr("position", "relative")
      .attr("width", "100%")
      .attr("height", height + margin2.top + margin.bottom);

  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top +  ")");

  var x = d3.scaleTime().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);

  //
  var maxValue = maxAllYears(data);
  //Parse the dates
  var parseDate = d3.timeParse("%Y");

  var axisData = getYearAndValues(data[0]);
  x.domain(d3.extent(axisData, function(d) { return parseDate(d.year) }));
  y.domain([0 ,maxValue]);



  //Skapa linjen av datum och värde
  for(var i = 0; i < data.length; i++)
  {
  var currentData = getYearAndValues(data[i]);

  var line = d3.line()
     .x(function(d) { return x(parseDate(d.year))})
     .y(function(d) { return y(d.value)})


  //Skapa x-axeln
  focus.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  //Skapa y-axeln
  focus.append("g")
     .call(d3.axisLeft(y))
     .append("text")
     .attr("fill", "#000")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")
     .text("Price ($)");

  //Skapa linjen

  focus.append("path")
    .datum(currentData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
  }

}
