//Global variables
var FAODATA;
var GEODATA;
var MYMAP;
var LAYERCOLORS;
var MAXYEAR;
var GEOJSON;
var LEGEND;
var COUNTRYDISPLAY;
function worldMap(data,worldData) {
//set data values
FAODATA =data;
GEODATA = worldData;
MAXYEAR = 250;




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
//token for Leaflet
var mapboxAccessToken = 'pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ';

//Creating map, and setting setView
MYMAP = L.map('mapid').setView([51.505, -0.09], 1);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    noWrap: true
}).addTo(MYMAP);

//split up data to one category
addValueGeo(GEODATA,FAODATA,"Y1987");
//add jalyer for color on each country with interaction
LAYERCOLORS = L.geoJson(GEODATA,
   {
     style: styleColor,
     onEachFeature: onEachFeature
  }).addTo(MYMAP);


//LEGEND
LEGEND = L.control({position: 'bottomright'});
//Adding right values to legend
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
//Add legend to map
LEGEND.addTo(MYMAP);


}

//declare hoover states
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
}

// adding data to geojson from Fatodata
function addValueGeo(worldData,splitData,year){
  var count = 0;
  var tempdata = splitData.slice();
  //loop each country in geojson
  for (var j = 0; j < Object.keys(worldData.features).length; j++) {
      worldData.features[j].properties.value = -1;
      //loop in data file
      for(var i = 0; i<tempdata.length; i++){
        //if data same country add to geojson and break
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
}

//get right colour for map values
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
//update data, gets data in and updates global variable
function updateData(data_in){
  //adds food data
  FAODATA = data_in;
  //add maxyear for legend
  MAXYEAR = Math.ceil(maxAllYears(data_in));

}
//Update map from interactions
function updateMap(year_in) {

  //Create information tooltip
  var information = new Information();
  //add values to geojson
  var year = "Y" + year_in;
  addValueGeo(GEODATA,FAODATA,year);

  //take away layers
  MYMAP.removeLayer(LAYERCOLORS);

  ////add layer for color on each country with interaction
  LAYERCOLORS = L.geoJson(GEODATA,
     {
       style: styleColor,
       onEachFeature: onEachFeature
    }).addTo(MYMAP);
  updateLegend();
  //if country have been hovered add to infobox
  if(COUNTRYDISPLAY){
  information.tooltipMap(COUNTRYDISPLAY, FAODATA[0].Item);
  }
}

//update info box
function updateInfo(country){
  //Create information tooltip

information = new Information();
//loog each country in geoJson
  for (var j = 0; j < Object.keys(GEODATA.features).length; j++) {


        //if same country as in
        if(GEODATA.features[j].properties.adm0_a3 == country)
        {
            //save country
            COUNTRYDISPLAY = GEODATA.features[j].properties
            //send to infobox and break
            information.tooltipMap(COUNTRYDISPLAY, FAODATA[0].Item);
            break;
        }

    }
}


//Add right style to countries
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
//Updates the legend
function updateLegend(){
  //remove old legend
  MYMAP.removeControl(LEGEND);
  LEGEND = L.control({position: 'bottomright'});
  //create new updated legend
  LEGEND.onAdd = function (MYMAP) {
    //set values for legend
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
///add legend tp mymap
  LEGEND.addTo(MYMAP);

}

//mouse
//function to handle hoover
function highlightFeature(e) {

    var layer = e.target;
    //highligt country
    if(layer.feature.properties.value >= 0){
    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    //update ingormation
    information = new Information();
    COUNTRYDISPLAY = layer.feature.properties;
    information.tooltipMap(layer.feature.properties, FAODATA[0].Item);
    //set it to the fron in map in firefox
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }
}
//reset color when not hoovered anymore
function resetHighlight(e) {
    LAYERCOLORS.resetStyle(e.target);
}
