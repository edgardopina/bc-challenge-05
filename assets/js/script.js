var startPlanner = function () {

};

var updateCurrentDay = function () {
	var currentDate = document.querySelector("#currentDay");
	currentDate.innerHTML = moment().format("dddd, MMMM Do");
};

var headerIntervalCtrl = setInterval(updateCurrentDay, 1000);

startPlanner();
