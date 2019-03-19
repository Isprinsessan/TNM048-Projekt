//function to handle range slider
function updateTextInput(year) {
          //update range sliders infobox with value
          document.getElementById("rangeText").innerHTML = "Year: " + year;
          //update map with the value
          updateMap(year);
}
