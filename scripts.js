/**
 * @author
 */

console.log("JavaScript Loaded");

//UNEMPDATA is the local name of the JSON file I just loaded

function dataLoaded(UNEMPDATA) {

	console.log(UNEMPDATA);

	var myObsData = UNEMPDATA.observations;
	//I am trying to construct an array of arrays
	var myDataArray = [];

	var headerArray = ["Date", "Value"];
	myDataArray.push(headerArray);

	//Define start point, end point and number of data points (how many loops)
	for (var i = 0; i < myObsData.length; i++) {

		var currObj = myObsData[i];

		var currArray = [currObj.date, Number(currObj.value)];

		myDataArray.push(currArray);

	}//end of for loop

	console.log(myDataArray);

	//feed data to visualization library
	var myDataTable = google.visualization.arrayToDataTable(myDataArray);

	//Tell it to create a line chart, and give it the location
	var myChart = new google.visualization.LineChart(document.getElementById("myChartDiv"));

	var options = {
          title: "Unemployment Trends"
        };

	myChart.draw(myDataTable, options);

}

function googleLoaded() {

	console.log("Loaded Google Viz");

	//Inside of the get, we see the filename, the function name and the file type
	$.get("UEMP270V_data.json", dataLoaded, "json");

}

function pageLoaded() {

	console.log("Document is ready");

	//load the Google visualization library
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"
	});

}


$(document).ready(pageLoaded);

