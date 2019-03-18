function Information()
{

  //Function to display the tooltip information for the cluster
  this.tooltipCluster = function(d,item) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-cluster")
    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-cluster")
        .text("Countries in cluster: " );
    tooltip.select("#country-cluster-value")
        .text(d["index"].length)
        .style("font-weight", "bold")


    //Calculate mean
    var sum =0;
    var counter = 0;
    d.line.forEach(function(d)
    {
      if(d.value !=Infinity &&d.value !=0&&!isNaN(d.value))
      {
        sum +=d.value;
        counter++;
      }

    })
    sum =sum/counter;
    //Select the food id in tooptip and change the text

    tooltip.select("#food-cluster")
        .text("Mean avaiblity for all countries and all years in cluster: ")
        .style("font-weight", "");
    tooltip.select("#food-cluster-value")
        .text(sum.toFixed(2))
        .style("font-weight", "bold")

    //Food item type
     tooltip.select("#type-cluster")
        .text("Cluster type: ")
        .style("font-weight", "");
    tooltip.select("#type-cluster-value")
        .text(item)
        .style("font-weight", "bold")
  }

  //Function to display the tooltip information for the plot
  this.tooltipPlot = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-plot")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-plot")
        .text("Country: ");
    tooltip.select("#country-plot-value")
        .text(d["Area"])
        .style("font-weight", "bold")

    //Select the food id in tooptip and change the text
    tooltip.select("#food-plot")
        .text("Produced food type: ");
    tooltip.select("#food-plot-value")
        .text(d["Item"])
        .style("font-weight", "bold")
    var sum =0;
    var counter =0;
    //console.log(d);
    for(var i =1961;i<=2013 ;i++)
    {
      if(d["Y"+i] !=Infinity &&d["Y"+i] !=0&&!isNaN(d["Y"+i]))
      {
        sum +=d["Y"+i];
        counter++;
      }

    }
    sum =sum/counter;
    //Select the food id in tooptip and change the text
    tooltip.select("#mean-plot")
        .text("Mean avaiblity: ");
    tooltip.select("#mean-plot-value")
        .text(sum.toFixed(2))
        .style("font-weight", "bold")

  }
  //Function to display the tooltip information for the plot
  this.tooltipPlotClicked = function(d) {

    //Access the tooltip div
    var tooltip = d3.select("#tooltip-plot")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-plot-clicked")
        .text("Country: ");
    tooltip.select("#country-plot-value-clicked")
        .text(d["Area"])
        .style("font-weight", "bold")

    //Select the food id in tooptip and change the text
    tooltip.select("#food-plot-clicked")
        .text("Produced food type: ");
    tooltip.select("#food-plot-value-clicked")
        .text(d["Item"])
        .style("font-weight", "bold")
    
   //Caluclate mean
    var sum =0;
    var counter =0;
    for(var i =1961;i<=2013 ;i++)
    {
      if(d["Y"+i] !=Infinity &&d["Y"+i] !=0 &&!isNaN(d["Y"+i]))
      {
        sum +=d["Y"+i];
        counter++;
      }

    }
    sum =sum/counter;
    
    //Select the food id in tooptip and change the text
    tooltip.select("#mean-plot-clicked")
        .text("Mean avaiblity: ");
    tooltip.select("#mean-plot-value-clicked")
        .text(sum.toFixed(2))
        .style("font-weight", "bold")

  }

  //Function to display the tooltip information for the map
  this.tooltipMap = function(d, i) {
    //Access the tooltip div
    var tooltip = d3.select("#tooltip-map")

    //Select the country id in tooptip and change the text to the current country
    tooltip.select("#country-map")
        .text("Country: ");
    tooltip.select("#country-map-value")
        .text(d.name)
        .style("font-weight", "bold")

    //Select the food id in tooptip and change the text
    tooltip.select("#food-map")
        .text("Food type: ");
    tooltip.select("#food-map-value")
        .text(i)
        .style("font-weight", "bold")
    //Select the food id in tooptip and change the text
    tooltip.select("#amount-map")
        .text("Amount available: " );
    tooltip.select("#amount-map-value")
        .text( d.value.toFixed(2))
        .style("font-weight", "bold")
    tooltip.select("#amount-map-kg")
        .text( " kg/capita")
        .style("font-weight", "")

  }

}
