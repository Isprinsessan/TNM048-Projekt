function FocusPlotContext(data){

    //Create margins and figure size
    var margin = { top : 20, right: 20, bottom: 150, left: 40 },
        margin2 = { top: 100, right: 20, bottom: 50, left: 40 },
        width = $("#plot").parent().width() - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 200 - margin2.top - margin2.bottom;


    /*
     * Select the plot div and append a svg tags
     * Then add two g tags to it
     */

    var svg = d3.select("#plot").append("svg")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin2.top + margin.bottom);

    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top +  ")");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Parse the date
    var parseDate = d3.timeParse("%Y");

    //Scale and axes for the plot
    var xScale = d3.scaleTime().range([0, width]),
        yScale = d3.scaleLinear().range([height, 0]),
        xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);

    //Scale parameters, get them from function call with data (d) as argument
    //Features och properties funkar inte med vårat dataset, max och minDate är värdet på x-axeln
    var maxDate = parseDate(2013),
        minDate = parseDate(1960),
        maxDate_plus = new Date(maxDate.getTime() + 300 * 144000000);
    //data[i][""]
    //Här ska man hämta in y-axelns värden
    var maxFoodAmount = maxAllYears(data[0])/1000;
    //console.log(function(d));

    //var maxDate_plus = new Date(maxDate.getTime() + 300 * 144000000);

    //Setting min and max values of each axis
    xScale.domain([minDate, maxDate_plus]);
    yScale.domain([1, maxFoodAmount])
    //navXscale är brushens graf


    //Rendering the focus plot

    //Append g tag for plotting the lines and the axes
    var dots = focus.append("g");
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

var lineGenerator = d3.line();

var points = [ [1960,150000],[1965,100000],[1970,150000],[1975,175000],[1980,200000] ];

var pathData = lineGenerator(points);
console.log(pathData);

var g = svg.append("g")
   .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")"
   );


g.append('path')
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", pathData);

d3.select('path')
    .attr('d', pathData);

/*
var x = {1,2,3,4,5,6};
var y = {90, 91, 92, 93, 94, 95};


    var line = d3.line()
      .xScale(function(d) {
        console.log(d);
         return x(d.date)})
      .yScale(function(d) { return y(d.value)})
      xScale.domain(d3.extent(data, function(d) { return d.date }));
      yScale.domain(d3.extent(data, function(d) { return d.value }));
*/
}
