
//Takes in the data and make relevant string into ints and seperates the data into Feed and Food
function parseData(data)
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

// Takes in population data and makes digits from strings to ints.
function parsePopulation(data)
{
	data.forEach(function(d)
	{
		for(var i =1960; i<=2018;i++)
		{
			d[i.toString()] = +d[i.toString()];
		}
	});	
	return data;
}

// Convert the avaible food in a country to how many avaible kg per capita.
function convertToPerCapita(food, population)
{
	var data = [];
	//Loop over each food/feed item
	food.forEach(function(f)
	{
		var country =null;
		//Find cooresponding country
		for(var i = 0; i<population.length; i++)
		{
			if(f["Area Abbreviation"] == population[i]["Country Code"])
			{
				country = population[i];
				break;
			}
		}
		//If country is found tranform to kg per capita and store in a new array
		if(country!= null)
		{
			for(var i =1961; i<=2013;i++)
			{
				//If no population data is found set to 
				if(i.toString()>1)
				{
					f["Y"+i] =(f["Y"+i]*1000*1000)/country[i.toString()];
				}else{
					f["Y"+i] =0;
				}	
			}
			data.push(f);
		}
		
	});
	return data;
}

//Return the max value for all years for the data that is send into the function
function maxAllYears(data)
{
	max = 0;
	data.forEach(function(d)
	{
		for(var i =1961; i<=2013;i++)
		{
			if(max <d["Y"+i] && d["Y"+i] !=Infinity )
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

//Given an attribte and a value, split the string so only those values are returned.
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
//Transform the data to year and value so it could be intrepered into a line.
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

