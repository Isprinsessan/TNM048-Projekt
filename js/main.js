
var dataObject;

d3.csv("/data/FAO.csv",function(data) {
  	//Parse the data into something useful.
  	dataObject =ParseData(data);
  	console.log(dataObject);
    FocusPlotContext(dataObject);
});

worldMap();
