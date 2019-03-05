function Information()
{
  console.log("hej");
  //Function to display the tooltip information
  this.tooltip = function(d) {

    var tooltip = d3.select("#tooltip")

    tooltip.select("#country")
        .text("Country: " + 10);

    tooltip.select("#food")
        .text("Produced food type: " + "Hej");
        
  }

}
