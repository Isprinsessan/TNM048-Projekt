//function to handle range slider
function updateTextInput(year) {
          //add value to range sliders infobox
          document.getElementById("rangeText").innerHTML = "Year: " + year;
          //update map with the value
          updateMap(year);
}
