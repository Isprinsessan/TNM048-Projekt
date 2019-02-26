
var dataObject;

d3.csv("/data/FAO.csv",function(data) {
  	//Parse the data into something useful.
  	dataObject =ParseData(data);
    FocusPlotContext(dataObject);

    $.getJSON("/data/customLow.geo.json",function(wData){
      worldMap(dataObject,wData);
    })

});
