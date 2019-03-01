var dataObject =[];
var meanLines = [];

d3.queue()
.defer(d3.csv, "/data/FAO.csv")
.defer(d3.csv, "/data/WorldPopulation.csv")
.await(function(error, data1, data2) {
    if (error) {
        console.error('Something went wrong: ' + error);
    }
    else {
    	//Parse the data into something useful. The data is split into 2 part, Food and Feed
  		//foodFeed[0] is all food objects and foodFeed[1] is all feed objects
    	var foodFeed =parseData(data1);
    	//Parse the population, mostly just convert string to int
    	var population = parsePopulation(data2);

      //Convert both Food and Feed to kg per capita
    	dataObject.push(convertToPerCapita(foodFeed[0], population));
    	dataObject.push(convertToPerCapita(foodFeed[1], population));

      //Get a ceertain attribute from the data
    	var foodAttribute =splitOnAttribute(foodFeed[0],'Item Code', 2511);


      //Run the DBSCAN and label the data
    	var label =DBSCAN(foodAttribute,200,5);
    	mLines =CalulateMeanLines(foodAttribute, label);
    	meanLines = mLines.lines;
      //Plot the data

    	FocusPlotContext(foodAttribute, meanLines, -1, mLines.nrOfCluster);

	    $.getJSON("/data/customLow.geo.json",function(wData){
	      worldMap(dataObject,wData);
	    })
    }
});
