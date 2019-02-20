
function ParseData(data)
{
	data.forEach(function(d)
	{
		d["Area Code"] = +d["Area Code"];
		d["Item Code"] = +d["Item Code"];
		d["Element Code"] = +d["Element Code"];
		d["latitude"] = +d["latitude"];
		d["longitude"] = +d["longitude"];
		for(var i =1961; i<=2013;i++)
		{
			d["Y"+i] = +d["Y"+i]; 
		}
	})
	
	console.log(data);

	return data;
}