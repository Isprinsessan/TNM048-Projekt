function worldMap(data,worldData) {


    wData = {};
    wData.name=[];
    wData.value=[];


   lat= [];
   long= [];
   value= [];
   //Food/Feed, Item Code,Area

   var itemCode = 2511;
   for(var i = 0; i < data.length; i++){
     if( data[i]['Item Code'] == itemCode ){
       wData.name.push(data[i]['Area']);
       wData.value.push(data[i]['Y1961']);

     }
   };

  console.log("worldData: " +wData.value);

  /*
//egen karta
  var mymap = L.map('mapid').setView([51.505, -0.09], 3);


  L.tileLayer('https://api.mapbox.com/styles/v1/bapiro/cjsa71uai36xq1fqt84vt1bcs/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ'
  }).addTo(mymap);
*/

var mapboxAccessToken = 'pk.eyJ1IjoiYmFwaXJvIiwiYSI6ImNqc2E0cmRieTAwdmI0NHAzZHV3bzRrbWsifQ.dsocBgqTK1ePHlkx_SQcYQ';

var mymap = L.map('mapid').setView([37.8, -96], 4);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
}).addTo(mymap);
//  var worldData = new L.geoJSON.AJAX("/Data/custom.geo.json");


L.geoJson(worldData).addTo(mymap);







  L.geoJson(worldData, {style: style}).addTo(mymap);

}
function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(wData),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
