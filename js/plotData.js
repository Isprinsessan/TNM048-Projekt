function ParseDataForPlot(data){

  FocusPlotContext(data);

}


function FocusPlotContext(data)
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

  //Create focus plot
  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top +  ")");

  //Create context plot
  var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  //
  var maxValue = maxAllYears(data);
  //Parse the dates
  var parseDate = d3.timeParse("%Y");

  //Get the data for the max and min values of the axes
  var axisData = getYearAndValues(data[0]);

  //Set axes and domain
  var x = d3.scaleTime().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);
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
          .attr("class", "axis axis--x")
          .attr("transform", "translate (0 , " + height  + ")")
          .call(d3.axisBottom(x));

      //Skapa y-axeln
      focus.append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(y))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Amount (kg)");

      console.log(currentData);

      //Skapa linjen
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
  */
}
