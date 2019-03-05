
var FAODATA;
var GEODATA;
var MYMAP;
var LAYERCOLORS;
var MAXYEAR;
var GEOJSON;
var LEGEND;
function worldMap(data,worldData) {

FAODATA =data;
GEODATA = worldData;
MAXYEAR = 250;

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


updateHoover();

//LEGEND
LEGEND = L.control({position: 'bottomright'});

LEGEND.onAdd = function (MYMAP) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, Math.ceil(((MAXYEAR/7)*1)), Math.ceil(((MAXYEAR/7)*2)), Math.ceil(((MAXYEAR/7)*3)), Math.ceil(((MAXYEAR/7)*4)), Math.ceil(((MAXYEAR/7)*5)), Math.ceil(((MAXYEAR/7)*6)), MAXYEAR],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

LEGEND.addTo(MYMAP);




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
    return d > (MAXYEAR) ? '#800026' :
           d > ((MAXYEAR/7)*6)  ? '#BD0026' :
           d > ((MAXYEAR/7)*5)  ? '#E31A1C' :
           d > ((MAXYEAR/7)*4)  ? '#FC4E2A' :
           d > ((MAXYEAR/7)*3)   ? '#FD8D3C' :
           d > ((MAXYEAR/7)*2)   ? '#FEB24C' :
           d > ((MAXYEAR/7)*1)   ? '#FED976' :
           d < 0   ? '#D3D3D3' :
                      '#FFEDA0';
}
function updateData(data_in){
  FAODATA = data_in;
  MAXYEAR = Math.ceil(maxAllYears(data_in));
  console.log("year: " + Math.ceil(MAXYEAR));



}
function updateMap(year_in) {


  //add values to geojson
  var year = "Y" + year_in;
  addValueGeo(GEODATA,FAODATA,year);
  MYMAP.removeLayer(LAYERCOLORS);
  LAYERCOLORS = L.geoJson(GEODATA, {style: styleColor}).addTo(MYMAP);
  updateLegend();
  updateHoover();
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
function updateLegend(){
  MYMAP.removeControl(LEGEND);
  LEGEND = L.control({position: 'bottomright'});

  LEGEND.onAdd = function (MYMAP) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, Math.ceil(((MAXYEAR/7)*1)), Math.ceil(((MAXYEAR/7)*2)), Math.ceil(((MAXYEAR/7)*3)), Math.ceil(((MAXYEAR/7)*4)), Math.ceil(((MAXYEAR/7)*5)), Math.ceil(((MAXYEAR/7)*6)), MAXYEAR],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  LEGEND.addTo(MYMAP);

}

//mouse
function updateHoover(){
  GEOJSON = L.geoJson(GEODATA, {
      style: styleColor,
      onEachFeature: onEachFeature
  }).addTo(MYMAP);
}
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    console.log(layer.feature.properties);
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    GEOJSON.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
}
