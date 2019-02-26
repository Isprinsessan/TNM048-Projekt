
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


//Return the max value for all years for the data that is send into the function
function maxAllYears(data)
{
	max = 0;
	data.forEach(function(d)
	{
		for(var i =1961; i<=2013;i++)
		{
			if(max <d["Y"+i])
			{
				max = d["Y"+i];
			}
		}
	})
	return max;
}

//Returns an array with the max value for each year for all data between max and min Year
function maxValueYears(data, minYear, maxYear)
{
	var maxYears =[];
	console.log(data);
	for(var i =minYear; i<=maxYear;i++)
	{
		var max =0;

		data.forEach(function(d)
		{
			if(max<d["Y"+i])
			{
				max =d["Y"+i];
			}

		})
		maxYears.push(max);
	}
	return maxYears;
}


function splitOnAttribute(data, attribute, value)
{
	var splitData = [];

	data.forEach(function(d)
	{
		if(value == d[attribute])
		{
			splitData.push(d);
		}

	})
	return splitData;
}



function getYearAndValues(data)
{
	var result = [];
	for(var i =1961; i<=2013; i++)
	{
		result.push(
		{
			value: data["Y"+i],
			year: i
		});
	}
	return result;
}

























