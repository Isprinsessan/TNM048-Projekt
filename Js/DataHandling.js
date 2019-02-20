

function ParseData()
{

  	data =d3.csvParseRows("/Data/FAO.csv");
  	console.log(data);

    return data;
}
