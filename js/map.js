function worldMap(data,worldData) {



   //Food/Feed, Item Code,Area



/*
//egen karta
  var mymap = L.map('mapid').setView([51.505, -0.09], 3);


  L.tileLayer('https://api.mapbox.com/styles/v1/bapiro/cjsa71uai36xq1fqt84vt1bcs/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      noWrap: true,
      bounds:TileLayer,
      accessToken: 'pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ'
  }).addTo(mymap);

*/
var mapboxAccessToken = 'pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ';

var mymap = L.map('mapid').setView([51.505, -0.09], 1);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    noWrap: true
}).addTo(mymap);
//  var worldData = new L.geoJSON.AJAX("/Data/custom.geo.json");

L.geoJson(worldData).addTo(mymap);
//split up data to one category
var split = splitOnAttribute(data[0],'Item Code', 2511);

//add values to geojson
var year = "Y2009";
addValueGeo(worldData,split,year);

L.geoJson(worldData, {style: style}).addTo(mymap);

}


function addValueGeo(worldData,splitData,year){

  for (var j = 0; j < Object.keys(worldData.features).length; j++) {
      worldData.features[j].properties.value = -1;
      for(var i = 0; i<splitData.length; i++){
        if(worldData.features[j].properties.adm0_a3 == splitData[i]['Area Abbreviation'])
        {

            worldData.features[j].properties.value = splitData[i][year];
            //console.log(  worldData.features[j].properties.value);
            break;
        }
    }
  }

}
function getColor(d) {
    return d > 5000 ? '#800026' :
           d > 2500  ? '#BD0026' :
           d > 1000  ? '#E31A1C' :
           d > 500  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
           d < 0   ? '#D3D3D3' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.value),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
