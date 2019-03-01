//Here the Data mining teqniq will be displayed
var NOISE = 999;
var ALPHA = 0.001;
//Function that runs the DBSAN, returns
function DBSCAN(data, eps, minPts)
{
	//Set label variable
	var label = new Array(data.length);
	//Counter for the clusters
	var clusterCounter =0;
	//Loop for each object
	for(var i =0; i < data.length; i++)
	{
		//If object already been label, continue
		if(label[i] != undefined)
		{
			continue; 
		}
		//find neighbours to data[i]
		var neighbors = findNeighbours(data, data[i], eps);

		//Check size of neighbourhood and if it is smaller than minPTS label it as noise
		if(neighbors.length<minPts)
		{
			label[i] = NOISE;
			continue;
		}
		//Increment cluster and loop over neigbohood 
		clusterCounter = clusterCounter+1;
		label[i] = clusterCounter;
		neighbors.forEach(function(d)
		{
			if(label[d.Index] == NOISE)
			{
				label[d.Index] = clusterCounter;
			}
			if(label[d.Index] =! true)
			{
				return;
			}

			label[d.Index] =clusterCounter;
			var N = findNeighbours(data, data[d.Index], eps);
			if(N.length>minPts)
			{
				N.forEach(function(s)
				{
					label[s.Index] = clusterCounter;
				})
			}
		})
	}
	return label;
}


//Find all neighbors that is closer than the eps
function findNeighbours(data,point, eps)
{
	var neighbors = [];
	for(var i = 0; i<data.length; i++)
	{
		var dist =euclideanDist(point, data[i]);
		if(dist < eps)
		{
			//Disregard if point == d
			if(dist <ALPHA )
			{
				continue;
			}else{
				neighbors.push({
					Object: data[i],
					Index: i
				});
			}
			
		}
	}
	return neighbors
}


//Get the eucleadian distance for every year
function euclideanDist(point1, point2)
{
	var sum =0;
	for(var i =1961; i<=2013; i++)
	{

		sum += Math.pow(point1["Y"+i]-point2["Y"+i],2);
	}
	return Math.sqrt(sum);
}


function CalulateMeanLines(data, label)
{
	var lines =[];
	//Check how many different labels there are
	var max = 0;
	label.forEach(function(d)
	{
		if(d>max && d != NOISE)
		{
			max = d;
		}
	})

	for(var i=1; i<=max; i++)
	{
		//Sum over all years
		var sum = new Array(data.length).fill(0);
		var counter = 0;
		var indexCheck = [];
		for(var j =0; j<data.length; j++)
		{
			if(label[j] ==i)
			{
				counter++;
				for(var y=1961; y<=2013; y++)
				{
					sum[y-1961]= sum[y-1961] +data[j]["Y"+y];
				}
				indexCheck.push(j);
			}
		}
		//Calculate the mean value for each year		
		var result = [];
		for(var y=1961; y<=2013; y++)
		{
			result.push(
			{
				value: sum[y-1961]/counter,
				year: y
			});
		}
		lines.push({
			line: result,
			index: indexCheck
		})
	}
	//Push noise to lines
	for(var j =0; j<data.length; j++)
	{

		if(label[j] ==NOISE)
		{
			var result = [];
			for(var y=1961; y<=2013; y++)
			{
				result.push(
				{
					value: data[j]["Y"+y],
					year: y
				});
			}
			lines.push(
			{
				line: result,
				index: [j]

			});
		}

	}
	return lines;
}
