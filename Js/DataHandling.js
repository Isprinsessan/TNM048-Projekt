
//Takes in the data and make relevant string into ints and seperates the data into Feed and Food
function ParseData(data)
{
	//Variables
	var FEED =5521;
	var FOOD =5142;
	var feed =[];
	var food =[];
	//Loop thorugh data
	data.forEach(function(d)
	{
		//Make strings to ints
		d["Area Code"] = +d["Area Code"];
		d["Item Code"] = +d["Item Code"];
		d["Element Code"] = +d["Element Code"];
		d["latitude"] = +d["latitude"];
		d["longitude"] = +d["longitude"];
		//Loop over each year
		for(var i =1961; i<=2013;i++)
		{
			d["Y"+i] = +d["Y"+i];
		}

		//Split data
		if(d["Element Code"] ==FOOD)
		{
			food.push(d);
		}else if(d["Element Code"] == FEED)
		{
			feed.push(d);
		}
	})
	return [food,feed];
}
