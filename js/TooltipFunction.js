function Information()
{

  //Function to display the tooltip information for the cluster
  this.tooltipCluster = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-cluster")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-cluster")
        .text("Country: " + d["Area"]);

    //Select the food id in tooptip and change the text
    tooltip.select("#food-cluster")
        .text("Produced food type: " + d["Item"]);

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

  }

  //Function to display the tooltip information for the map
  this.tooltipMap = function(d, i) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-map")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-map")
        .text("Country: " + d.name);

    tooltip.select("#food-map")
        .text("Food type: " + i);

    //Select the food id in tooptip and change the text
    tooltip.select("#amount-map")
        .text("Amount produced: " + d.value.toFixed(2) + " kg/capita");

  }

}
