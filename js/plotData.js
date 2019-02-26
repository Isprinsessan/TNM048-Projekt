function FocusPlotContext(data){
  var xValue = [ [2000,1, 1], [2001, 1, 1], [2002,1,1], [2003,1,1], [2004,1,1], [2005,1,1]];
  var yValue = [14000, 15000, 16000, 17000, 18000, 19000];

  //var parsedData = parseData(xValue, yValue);
  var parsedData = getYearAndValues(data[0]);
  drawChart(data[0]);
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

  //Parse the dates
  var parseDate = d3.timeParse("%Y");

  var axisData = getYearAndValues(data[0]);
  console.log(axisData);
  x.domain(d3.extent(axisData, function(d) { return parseDate(d.year) }));
  y.domain([0 ,d3.max(axisData, function(d) { return d.value })]);


  //Skapa linjen av datum och värde
  for(var i = 0; i < 2; i++)
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
  console.log(currentData);
  focus.append("path")
    .datum(currentData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
  }
/*

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Scale and axes for the plot
    var x = d3.scaleTime().range([0, width]),
        y = d3.scaleLinear().range([height, 0]),
        xAxis = d3.axisBottom(x),
        yAxis = d3.axisLeft(y);

    //Scale parameters, get them from function call with data (d) as argument
    //Features och properties funkar inte med vårat dataset, max och minDate är värdet på x-axeln
    var maxDate = parseDate(2006),
        minDate = parseDate(2000),
        maxDate_plus = new Date(maxDate.getTime() + 300 * 144000000);
    //data[i][""]
    //Här ska man hämta in y-axelns värden
    var maxFoodAmount = maxAllYears(data[0])/1000;
    //console.log(function(d));

    //var maxDate_plus = new Date(maxDate.getTime() + 300 * 144000000);

    //Setting min and max values of each axis
    x.domain([minDate, maxDate_plus]);
    y.domain([1, 16]);
    //navXscale är brushens graf


    //Rendering the focus plot

    //Append g tag for plotting the lines and the axes
    //var dots = focus.append("g");
    //dots.attr("", "url(#clip)");

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate (0 , " + height  + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    //Add legend to the y-axis in the plot
    d3.select(".legend")
        .style('left', "170px")
        .style('top', "300px");
    svg.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -margin2.top - 120)
        .attr('text-anchor', "end")
        .attr("dy", ".75em")
        .style("font-size", "20px")
        .text("Skillnad i matskit");

   /**
    Här ska punkterna plottas ut
    */

/*
    values = dots.selectAll()
      .data(data[0])
      .enter().append("circle")
      .attr("class", "dot")
      .filter(function (d) {return d["Y1961"] != null})
      .attr("cx", function (d) {
        return xScale(parseDate(1961));""
      })
      .attr("cy", function (d) {
        return yScale("Y1961");
      });

    plot(values);
*/
/*
var xValue = [2000, 2001, 2002, 2003, 2004, 2005];
var yValue = [10, 11, 12, 13, 14, 15];

var line = d3.line()
  .x(function(d) { return x(d)})
  .y(function(d) { return y(d)})
  x.domain(d3.extent(xValue, function(d) { return d }));
  y.domain(d3.extent(yValue, function(d) { return d }));

console.log(line);

focus.append('path')
    .datum(xValue)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

context.append('path')
    .datum(xValue)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
*/

/*
var x = {1,2,3,4,5,6};
var y = {90, 91, 92, 93, 94, 95};
*/

}
