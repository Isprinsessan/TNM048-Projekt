function plotData(data){

    //Create margins and figure size
    var margin = { top : 20, right: 20, bottom: 150, left: 40 },
        margin2 = { top: 100, right: 20, bottom: 50, left: 40 },
        width = $("#plot").parent().width() - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 200 - margin2.top - margin2.bottom;


    /*
     * Select the plot div and append a svg tag
     * Then add two g tags to it
     */
    var svg = d3.select("#plot").append("svg")
        .attr("position", "relative")
        .attr("width", "100%")
        .attr("height", height + margin2.top + margin.bottom);

    var focus = svg.append("g")
        .attr("class", "focus");

    var context = svg.append("g")
        .attr("class", "context");

    //Parse the date
    var parseDate = d3.timeParse("%Y-%m-%d");

    //Scale and axes for the plot
    var xScale = d3.scaleTime().range([0, width]),
        yScale = d3.scaleLinear().range([0, height]),
        xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);

    //Scale parameters, get them from function call with data (d) as argument
    //Features och properties funkar inte med vårat dataset, max och minDate är värdet på x-axeln
    //var maxDate = d3.max(data.features, function(d){ return parseDate(d.properties.Date) });
    //var minDate = d3.min(data.features, function(d){ return parseDate(d.properties.Date) });
    //Här ska man hämta in y-axelns värden

    //console.log(function(d));

    //var maxDate_plus = new Date(maxDate.getTime() + 300 * 144000000);

    //Setting min and max values of each axis
    xScale.domain([0, 50]);
    yScale.domain([0,10])
    //navXscale är brushens graf


    //Rendering the focus plot

    //Append g tag for plotting the lines and the axes
    var dots = focus.append("g");
    //dots.attr("", "url(#clip)");

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "transate (0 , " + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        call(yAxis);

    //Add legend to the y-axis in the plot
    d3.select(".legend")
        .style('left', "170px")
        .style('top', "300px");
    svg.append("text")
        .attr("class", "axis-label");
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -margin2.top - 120)
        .attr('text-anchor', "end")
        .attr("dy", ".75em")
        .style("font-size", "20px")
        .text("Skillnad i matskit")

   /**
    Här ska punkterna plottas ut
    */
}
