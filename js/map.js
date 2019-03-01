
var FAODATA;
var GEODATA;
var MYMAP;
var LAYERCOLORS;
function worldMap(data,worldData) {

FAODATA = splitOnAttribute(data[0],'Item Code', 2511);
GEODATA = worldData;

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

MYMAP = L.map('mapid').setView([51.505, -0.09], 1);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    noWrap: true
}).addTo(MYMAP);
//  var worldData = new L.geoJSON.AJAX("/Data/custom.geo.json");
//L.geoJson(GEODATA).addTo(MYMAP);
//split up data to one category
addValueGeo(GEODATA,FAODATA,"Y1987");
LAYERCOLORS = L.geoJson(GEODATA, {style: styleColor}).addTo(MYMAP);
//updateMap(1987);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(MYMAP);




}
function highlightFeature(e) {
    var layer = e.target;
  console.log("hej");
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function addValueGeo(worldData,splitData,year){
  var count = 0;
  var tempdata = splitData.slice();
  for (var j = 0; j < Object.keys(worldData.features).length; j++) {
      worldData.features[j].properties.value = -1;
      for(var i = 0; i<tempdata.length; i++){

        if(worldData.features[j].properties.adm0_a3 == tempdata[i]['Area Abbreviation'])
        {

            worldData.features[j].properties.value = tempdata[i][year];
            //console.log(  worldData.features[j].properties.value);
            tempdata.splice(i,1);
            break;
        }
        count++;
    }

  }
  console.log(count);

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
function updateMap(year_in) {


  //add values to geojson
  var year = "Y" + year_in;
  addValueGeo(GEODATA,FAODATA,year);
  MYMAP.removeLayer(LAYERCOLORS);
  LAYERCOLORS = L.geoJson(GEODATA, {style: styleColor}).addTo(MYMAP);
}

function styleColor(feature) {
    return {
        fillColor: getColor(feature.properties.value),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
