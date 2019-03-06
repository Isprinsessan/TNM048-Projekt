function FocusPlotContext(data, meanLines, nrOfCluster)
{
  //Create colors for lines.
  var colors = colorbrewer.Set3[Math.min(Math.max(nrOfCluster,3),12)];

  //Create margin, width and height variables for the plots
  var margin = { top : 20, right: 20, bottom: 50, left: 40 },
      margin2 = { top: 20, right: 20, bottom: 50, left: 40 },
      width = $("#plot").parent().width() - margin.left - margin.right,
      widthCluster = $("#clusterPlot").parent().width() - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom,
      height2 = 155 - margin2.top - margin2.bottom;

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
      .attr("transform", "translate(" + margin.left + "," + (margin.top-100) + ")");

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

  //Call the function to plot the context plot
  createContextPlot();

  //Create context plot function
  function createContextPlot()
  {
      //Set axes and domain for the context plot
      var contextX = d3.scaleTime().rangeRound([0, width]);
      var contextY = d3.scaleLinear().rangeRound([0, height2]);
      contextX.domain(d3.extent(axisData, function(d) { return parseDate(d.year) }));
      contextY.domain([0 ,maxValue]);

      //Create x-axis for the context plot
      context.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate (0 , " + height2 + ")")
          .call(d3.axisBottom(contextX));
  }

  //Call the function to create the cluster plot
  createClusterPlot(meanLines, colors);

  //Create cluster plot function
  function createClusterPlot(meanLines, colors)
  {

    //Set axes and domain for the cluster plot
    var clusterX = d3.scaleTime().rangeRound([0, widthCluster]);
    var clusterY = d3.scaleLinear().rangeRound([height, 0]);
    clusterX.domain(d3.extent(axisData, function(d) { return parseDate(d.year) }));
    clusterY.domain([0 ,maxValue]);

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
        .text("kg/Capita");

    //Loop through all lines in the data and
    for(var i = 0; i <meanLines.length; i++)
    {
        //Get the year and value for the current point in the data
        var currentData = meanLines[i].line;

        //Create the line from the years and the values
        var line = d3.line()
           .x(function(d) { return clusterX(parseDate(d.year))})
           .y(function(d) { return clusterY(d.value)})

        //Add the line to the plot
        cluster.append("path")
           .attr("class", "clusterLines")
           .datum(currentData)
           .attr("fill", "none")
           .attr("stroke", colors[meanLines[i].color])
           .attr("stroke-linejoin", "round")
           .attr("stroke-linecap", "round")
           .attr("stroke-width", Math.sqrt(1.0*meanLines[i].index.length))
           .attr("d", line)
           .attr("id", i);

    }

    //Update the click functions
    updateClick(data, meanLines);

  }

  //Variable to make sure that the focus plot is created at start
  var index = -1;

  //Call function to create the focus plot
  createFocusPlot(data, meanLines, index);

  //Create focus plot function
  function createFocusPlot(data, meanLines, index)
  {

    var newData = [];
    var maxValue =0;

    if(index == -1)
    {
       maxValue = maxAllYears(data);
    }
    else
    {

        meanLines[index].index.forEach(function(d)
        {
          newData.push(data[d]);
        })
        maxValue = maxAllYears(newData);

    }

    //Set axes and domain for the focus plot
    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    x.domain(d3.extent(axisData, function(d) { return parseDate(d.year) }));
    y.domain([0 ,maxValue]);

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
        .text("Availability per capita (kg/person)");

    //If it is the first time the function is called, loop through all the data
    //else only loop through the specifik data
    if(index == -1)
    {
      for(var i = 0; i <data.length; i++)
      {
          var currentData = getYearAndValues(data[i]);
          var line = d3.line()
             .x(function(d) { return x(parseDate(d.year))})
             .y(function(d) { return y(d.value)})

          //Add the line to the plot
          focus.append("path")
             .attr("class", "plotLines")
             .datum(currentData)
             .attr("fill", "none")
             .attr("stroke", "red")
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("stroke-width", 1.0)
             .attr("d", line)
             .attr("id", i);

      }
    }
    else {

      //Get the index of each line
      var indices = meanLines[index].index;

      //Loop through all the lines
      for(var i = 0; i <indices.length; i++)
      {

          //Get the year and values for the current line in the data
          var currentData = getYearAndValues(data[indices[i]]);

          //Create the line from the year and specified value
          var line = d3.line()
             .x(function(d) { return x(parseDate(d.year))})
             .y(function(d) { return y(d.value)})

          //Add the line to the plot
          focus.append("path")
             .attr("class", "plotLines")
             .datum(currentData)
             .attr("fill", "none")
             .attr("stroke", "red")
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("stroke-width", 1.0)
             .attr("d", line)
             .attr("id", i);

      }
    }

    //Update click functions
    updateClick(data, meanLines,colors, index);

  }

  //Call click functions
  updateClick(data, meanLines,colors,index);

  //Function to update the click functions
  function updateClick(data, meanLines,colors, index)
  {

    //Select all the created lines
    selected_lines = d3.selectAll("path");

    //Mouse over function
    mouseOver(selected_lines, data, meanLines,index);
    //Mouse out function
    mouseOut(selected_lines);
    //Mouse click function
    mouseClick(selected_lines, data, meanLines,colors);

  }

  //Variable to save the original width of the line
  var originalWidth = 0;

  //Mouse over function
  function mouseOver(selected_lines, data, meanLines,index)
  {
      //On mouse over increase the width of the line
      selected_lines.on("mouseover", function(d)
      {
          //Make sure that it is a line that is targeted and not an axis
          if(this.attributes[0].nodeValue != "clusterLines" && this.attributes[0].nodeValue != "plotLines" )
            return;


          //Store the original width
          originalWidth = d3.select(this).attr('stroke-width');

          //Rescale the line on hover
          d3.select(this).attr('stroke-width', 10);

          //Create a information object
          var information = new Information();

          //Check which plot the current line is in and update the correct information div
          if(this.attributes[0].nodeValue == "clusterLines")
          {
              //Show tooltip information
              information.tooltipCluster(meanLines[this.id]);
          }
          else if(this.attributes[0].nodeValue == "plotLines")
          {

              //Show tooltip information
              if(index ==-1)
              {
                information.tooltipPlot(data[this.id]);
              }
              else
              {
                information.tooltipPlot(data[meanLines[index].index[this.id]]);
              }

          }

      });
  }

  //Mouse out function
  function mouseOut(selected_lines)
  {

      //On mouse out return to the original width of the line
      selected_lines.on("mouseout", function(d){
          //Make sure that it is a line that is targeted and not an axis
          if(this.attributes[0].nodeValue != "clusterLines" && this.attributes[0].nodeValue != "plotLines" )
            return;

          //Return line to original state
          if(d3.select(this).attr("clicked") == "clicked")
            return;

          d3.select(this).attr('stroke-width', originalWidth);

      });
  }

  //On mouse click function
  function mouseClick(selected_lines, data, meanLines,colors)
  {

      //On mouse click, change the data shown in the focus plot
      selected_lines.on("click", function(d){

          //Make sure that it is a line that is targeted and not an axis
          if(this.attributes[0].nodeValue != "clusterLines" && this.attributes[0].nodeValue != "plotLines" )
            return;

          //Select all the lines in the focus plot (if changed to d3.selectAll("path"), it will work with the cluster plot too)
          var allLines = focus.selectAll("path");

          //Add a tag to each line to see if it has been clicked
          allLines.attr("clicked", null);

          //Array to store the original width of the stroke for each line
          var orgValArray = [];

          //Loop through all the lines in the plot
          for(var i = 0; i < allLines._groups[0].length; i++)
          {
            //Make sure that the line has the attribute stroke-width
            if(!allLines._groups[0][i].attributes[5] ||  allLines._groups[0][i].attributes[5].localName != "stroke-width")
              continue;

            //Store all the original values in an array
            orgValArray[i] = allLines._groups[0][i].attributes[5].nodeValue;

            //Set the stroke width to the original value
            allLines._groups[0][i].attributes[5].nodeValue = 1;

          }

          //Set the clicked lines width to the set value
          d3.select(this).attr('stroke-width', 10);

          //Change the tag to clicked so that the thickness doesnt disapper when hovered
          d3.select(this).attr("clicked", "clicked");

          //Get the index of the lines
          idx = d3.select(this).attr("id");

          //Create a new data from the selected lines
          var selected_data = [];

          //Check which plot the clicked line is in
          if(this.attributes[0].nodeValue == "clusterLines")
          {
              var indices = meanLines[idx].index;

              for (var i = 0; i < indices.length; i++) {
                selected_data.push(data[indices[i]]);
              }

              //Remove all the earlier lines in the plots
              d3.selectAll("path").remove();
              //Remove the y-axis so it can be redrawn with new values
              d3.selectAll(".axis--y").remove();

              //Replot the plots
              createClusterPlot(meanLines, colors);
              createFocusPlot(data, meanLines, idx);
              createContextPlot();

          }
          else if(this.attributes[0].nodeValue == "plotLines")
          {
              //If the line is in the focus plot, send the data for that line to the map
              selected_data.push(data[idx]);
          }

          //Update the map with the new data and recolor it
          updateData(selected_data);
          var year_in = document.getElementById("myRange").value;
          updateMap(year_in);
      });

  }

}
