# TNM048 -Information visualization Project
## About
This is a project from the course *TNM048 - information visualization* were our task was to find a dataset and visualizing it in the best way possible. The project is written in HTML, CSS and Javascript with the help of the D3 library and leaflet. The project could use some polishing especially in aiding the user to use the application and giving the user a choice over which food group that is going to be displayed.

The project group consist of Erik Nilsson, Daniel Olsson and Lucas Palnèn-Rung.

### Data
The data is about how much of a certain food item is avaible in different countries. The current implementation shows how many kilogram beer that is avaible per person in each country.


### Images 
The image below shows the first you see when entering the website. The top graph show some clustered made by DBSCAN which make it easier to distinguish amongs the lines. The graph in the bottom shows all countries were each line represent a countries avaibility over 50 years.
![Test](https://github.com/Isprinsessan/TNM048-Projekt/blob/master/Images/First_apparence.png?raw=true "Title")

If a line in the cluster graph is clicked the lower graph will only show that cluster such in the image below. If the line in the lower graph is clicked the information box to the right will remember that value and then by hovering over other lines the user can compare values.

![Test](https://github.com/Isprinsessan/TNM048-Projekt/blob/master/Images/Clicked.png?raw=true "Title")


If a cluster or line is selected those countries are displayed on a map where a slider shows each year and the avaibility for that year as seen in the image below.

![Test](https://github.com/Isprinsessan/TNM048-Projekt/blob/master/Images/map.png?raw=true "Title")