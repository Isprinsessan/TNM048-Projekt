function Information()
{

  //Function to display the tooltip information
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

  this.tooltipMap = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-map")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-map")
        .text("Country: " + d["Area"]);

    //Select the food id in tooptip and change the text
    tooltip.select("#food-map")
        .text("Produced food type: " + d["Item"]);

  }

}
