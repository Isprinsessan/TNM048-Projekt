function Information()
{

  //Function to display the tooltip information for the cluster
  this.tooltipCluster = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-cluster")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-cluster")
        .text("Countries in cluster: " + d["index"].length);
    var sum =0;
    d.line.forEach(function(d)
    {
      sum +=d.value;
    })
    sum =sum/d.line.length;
    //Select the food id in tooptip and change the text
    tooltip.select("#food-cluster")
        .text("Mean avaiblity: " + sum.toFixed(2));

  }

  //Function to display the tooltip information for the plot
  this.tooltipPlot = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-plot")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-plot")
        .text("Country: " + d["Area"]);

    //Select the food id in tooptip and change the text
    tooltip.select("#food-plot")
        .text("Produced food type: " + d["Item"]);

    var sum = 0;

    for(var i =1961;i<=2013 ;i++)
    {
      sum +=d["Y"+i];
    }
    sum =sum/(2013-1961);
    //Select the mean-plot id in tooptip-plot and change the text
    tooltip.select("#mean-plot")
        .text("Mean avaiblity: " + sum.toFixed(2));

  }

  //Function to display the tooltip information for the map
  this.tooltipMap = function(d, i) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-map")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-map")
        .text("Country: " + d.name);

    //Select the food id in tooptip and change the text
    tooltip.select("#food-map")
        .text("Food type: " + i);


    tooltip.select("#amount-map")
        .text("Amount produced: " + d.value.toFixed(2) + " kg/capita");

  }

}
