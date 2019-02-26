
var dataObject;

d3.csv("/data/FAO.csv",function(data) {
  	//Parse the data into something useful. The data is split into 2 part, Food and Feed
  	//dataObject[0] is all food objects and dataObject[1] is all feed objects
  	dataObject =ParseData(data);
  	var wheat =splitOnAttribute(dataObject[0],'Item Code', 2511);
    ParseDataForPlot(wheat);


    $.getJSON("/data/customLow.geo.json",function(wData){

      worldMap(dataObject,wData);
    })

});
