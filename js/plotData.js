function FocusPlotContext(data, label, meanLines)
{

  //Create margin, width and height variables for the plots
  var margin = { top : 20, right: 20, bottom: 150, left: 40 },
      margin2 = { top: 100, right: 20, bottom: 50, left: 40 },
      width = $("#plot").parent().width() - margin.left - margin.right,
      widthCluster = $("#clusterPlot").parent().width() - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      height2 = 200 - margin2.top - margin2.bottom;

  //Apply svg tag to plot div
  var svg = d3.select("#plot").append("svg")
      .attr("position", "relative")
      .attr("width", "100%")
      .attr("height", height + margin2.top + margin.bottom);

  //Apply svg tag to cluster plot div
  var svg2 = d3.select("#clusterPlot").append("svg")
      .attr("position", "relative")
      .attr("width", "100%")
      .attr("height", height + margin2.top + margin.bottom);

  //Add brush rectangle
  svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

  //Create focus plot
  var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top +  ")");

  //Create context plot
  var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //Create the cluster plot
  var cluster = svg2.append("g")
      .attr("class", "cluster")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top +  ")");

  //Get the max value in data
  var maxValue = maxAllYears(data);
  //Parse the dates
  var parseDate = d3.timeParse("%Y");

  //Get the data for the max and min values of the axes
  var axisData = getYearAndValues(data[0]);

  //Set axes and domain for the focus plot
  var x = d3.scaleTime().rangeRound([0, width]);
  var y = d3.scaleLinear().rangeRound([height, 0]);
  x.domain(d3.extent(axisData, function(d) { return parseDate(d.year) }));
  y.domain([0 ,maxValue]);

  //Set axes and domain for the context plot
  var contextX = d3.scaleTime().rangeRound([0, width]);
  var contextY = d3.scaleLinear().rangeRound([0, height2]);
  contextX.domain(x.domain());
  contextY.domain(y.domain());

  //Set axes and domain for the cluster plot
  var clusterX = d3.scaleTime().rangeRound([0, widthCluster]);
  var clusterY = d3.scaleLinear().rangeRound([height, 0]);
  clusterX.domain(x.domain());
  clusterY.domain(y.domain());

  //Create x-axis for the context plot
  context.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate (0 , " + height2 + ")")
      .call(d3.axisBottom(contextX));

  //Create x-axis for the focus plot
  focus.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate (0 , " + height  + ")")
      .call(d3.axisBottom(x));

  //Create y-axis for the focus plot
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


  //Create x-axis for the cluster plot
  cluster.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate (0 , " + height + ")")
      .call(d3.axisBottom(clusterX));

  //Create y-axis for the cluster plot
  cluster.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(clusterY))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Clustertext");

      console.log(meanLines);
  // Show clusters
  for(var i = 0; i <meanLines.length; i++)
  {
      var currentData = meanLines[i].line;
      var line = d3.line()
         .x(function(d) { return clusterX(parseDate(d.year))})
         .y(function(d) { return clusterY(d.value)})

      //Add the line to the plot
      cluster.append("path")
         .datum(currentData)
         .attr("fill", "none")
         .attr("stroke", "red")
         .attr("stroke-linejoin", "round")
         .attr("stroke-linecap", "round")
         .attr("stroke-width", Math.sqrt(0.1*meanLines[i].index.length))
         .attr("d", line);
  }
//Show lines for the selected data
  for(var i = 0; i <data.length; i++)
  {
      var currentData = getYearAndValues(data[i]);
      var line = d3.line()
         .x(function(d) { return x(parseDate(d.year))})
         .y(function(d) { return y(d.value)})

      //Add the line to the plot
      focus.append("path")
         .datum(currentData)
         .attr("fill", "none")
         .attr("stroke", "red")
         .attr("stroke-linejoin", "round")
         .attr("stroke-linecap", "round")
         .attr("stroke-width", 1.0)
         .attr("d", line);
  }

}
