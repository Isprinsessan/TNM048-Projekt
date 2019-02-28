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
// DBSCAN(DB, distFunc, eps, minPts) {
//    C = 0                                                  /* Cluster counter */
//    for each point P in database DB {
//       if label(P) ≠ undefined then continue               /* Previously processed in inner loop */
//       Neighbors N = RangeQuery(DB, distFunc, P, eps)      /* Find neighbors */
//       if |N| < minPts then {                              /* Density check */
//          label(P) = Noise                                 /* Label as Noise */
//          continue
//       }
//       C = C + 1                                           /* next cluster label */
//       label(P) = C                                        /* Label initial point */
//       Seed set S = N \ {P}                                /* Neighbors to expand */
//       for each point Q in S {                             /* Process every seed point */
//          if label(Q) = Noise then label(Q) = C            /* Change Noise to border point */
//          if label(Q) ≠ undefined then continue            /* Previously processed */
//          label(Q) = C                                     /* Label neighbor */
//          Neighbors N = RangeQuery(DB, distFunc, Q, eps)   /* Find neighbors */
//          if |N| ≥ minPts then {                           /* Density check */
//             S = S ∪ N                                     /* Add new neighbors to seed set */
//          }
//       }
//    }
// }


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


function euclideanDist(point1, point2)
{
	var sum =0;
	for(var i =1961; i<=2013; i++)
	{

		sum += Math.pow(point1["Y"+i]-point2["Y"+i],2);
	}
	return Math.sqrt(sum);
}






// RangeQuery(DB, distFunc, Q, eps) {
//    Neighbors = empty list
//    for each point P in database DB {                      /* Scan all points in the database */
//       if distFunc(Q, P) ≤ eps then {                      /* Compute distance and check epsilon */
//          Neighbors = Neighbors ∪ {P}                      /* Add to result */
//       }
//    }
//    return Neighbors
// }