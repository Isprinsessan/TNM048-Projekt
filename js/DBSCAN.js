/*
Author: Daniel Olsson
Last Updated: 2019-03-01
Description:
This file handles the data mining with the DBSCAN technique. There are
two major function and it is DBSCAN which runs the data mining and
CalulateMeanLines that calculates the mean line for each cluster inclusive
the Noise lines
*/

//Constant variables
var NOISE = 999;
var ALPHA = 0.001;

//The DBSCAN algoritm which calulates the clusters. 
//data: The data that will be evaluate
//eps: The max distance between the lines
//minPts: The minimum nr of lines to be classified as a cluster.
//
//Returns Label which is same size as data and contains which cluster each line balongs to.
// If the lines is considered as a NOISE it gets value 999.
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
			// Check if cluster is Noise
			if(label[d.Index] == NOISE)
			{
				label[d.Index] = clusterCounter;
			}
			if(label[d.Index] =! true)
			{
				return;
			}
			//Label the line to that cluster
			label[d.Index] =clusterCounter;
			//FInd neibhours to d
			var N = findNeighbours(data, data[d.Index], eps);
			if(N.length>minPts)
			{
				//Set to cluster
				N.forEach(function(s)
				{
					label[s.Index] = clusterCounter;
				})
			}
		})
	}
	return label;
}


//The findNeighbours function will find all
//lines that are closer to than eps to the current line
//
//data: The data that will be evaluate
//points: The line that is compared to
//eps: The maximal distance from point that will be considered.
//
//Returns an array with all neighbours to point that is closer than eps
function findNeighbours(data,point, eps)
{
	var neighbors = [];
	for(var i = 0; i<data.length; i++)
	{
		//Calculate the distance between the point and data
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


//The function euclideanDist calculates the distance between two lines
//
//point1: First line
//point2: Second line
//
//returns the distance between the two points
function euclideanDist(point1, point2)
{
	var sum =0;
	for(var i =1961; i<=2013; i++)
	{	if(point1["Y"+i] != 0 && point2["Y"+i] !=0)
		{
			sum += Math.pow(point1["Y"+i]-point2["Y"+i],2);
		}			
	}
	return Math.sqrt(sum);
}

//The function CalulateMeanLines takes in which lines that belongs to a 
//certain cluster and calulates its meanLine.
//
//data: All the lines
//label: An array with the cluster labels
//
//Return an object{
//	lines{
//		lines: The mean line
//		index: Which lines that the mean line contains
//		color: The color index
//		}
//	nrOfCluster: How many cluster there are
//}
function CalulateMeanLines(data, label)
{
	var lines =[];
	//Check how many different labels there are
	var max = 0;
	//Check how many cluster there are without the NOISE
	label.forEach(function(d)
	{
		if(d>max && d != NOISE)
		{
			max = d;
		}
	})

	//Loop over nr of clusters where 0 is NOISE
	for(var i=1; i<=max; i++)
	{
		//Sum over all years
		var sum = new Array(data.length).fill(0);
		var counter = new Array(data.length).fill(0);;
		var indexCheck = [];
		for(var j =0; j<data.length; j++)
		{
			//If label corresponds to the current cluster add that line to sum
			if(label[j] ==i)
			{
				
				for(var y=1961; y<=2013; y++)
				{
					if(data[j]["Y"+y] !=0 && !isNaN(data[j]["Y"+y]) && data[j]["Y"+y] !=undefined && data[j]["Y"+y] !=Infinity)
					{
						sum[y-1961] = sum[y-1961] +data[j]["Y"+y];
						counter[y-1961]++;
					}
		
				}
				//Add which index the line has
				indexCheck.push(j);
			}
		}
		//Calculate the mean value for each year		
		var result = [];
		for(var y=1961; y<=2013; y++)
		{

			result.push(
			{
				value: sum[y-1961]/counter[y-1961],
				year: y
			});
		}
		//Resulting object contains the resulting line, which index that it is made up by and its color index
		lines.push({
			line: result,
			index: indexCheck,
			color: i
		})
	}
	//Push noise to lines
	for(var j =0; j<data.length; j++)
	{

		if(label[j] ==NOISE)
		{
			var result = [];
			//Push all years
			for(var y=1961; y<=2013; y++)
			{
				//Check so data exist else push the value 0 to the data
				if(!isNaN(data[j]["Y"+y]))
				{
					result.push(
					{
						value: data[j]["Y"+y],
						year: y
					});
				}else
				{
					result.push(
					{
						value: 0,
						year: y
					});
				}
				
			}
			//Add line
			lines.push(
			{
				line: result,
				index: [j],
				color: 0

			});
		}

	}
	//Return the structure
	return {
		lines: lines,
		nrOfCluster: max
	}
}
