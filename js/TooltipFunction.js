function Information()
{

  //Function to display the tooltip information
  this.tooltip = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country")
        .text("Country: " + d["Area"]);

    //Select the food id in tooptip and change the text 
    tooltip.select("#food")
        .text("Produced food type: " + d["Item"]);

  }

}
