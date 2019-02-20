
var dataObject;

d3.csv("/data/FAO.csv",function(data) {
  	//Parse the data into something useful. The data is split into 2 part, Food and Feed
  	//dataObject[0] is all food objects and dataObject[1] is all feed objects
  	dataObject =ParseData(data);
  	console.log(maxAllYears(dataObject[0]));
    FocusPlotContext(dataObject);
});

worldMap();
