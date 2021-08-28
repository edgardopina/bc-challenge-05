var tasks = [];
const LOC_STG_APP_KEY = "scheduler";

var timetest = 8;
var timeAndDate = moment().hour(timetest).format("DD/MM/YYYY hh:mm:ss A");
console.log("set time and date: ", timeAndDate);

var saveTasks = function () {
	localStorage.setItem(LOC_STG_APP_KEY, JSON.stringify(tasks));
};

var startPlanner = function () {
	const START_OF_DAY_TIME = 9;
	const END_OF_DAY_TIME = 18;
	var tempArray = [];

	var dayGroup = document.querySelector(".day-group");
	tasks = JSON.parse(localStorage.getItem(LOC_STG_APP_KEY));

	for (var hour = START_OF_DAY_TIME; hour < END_OF_DAY_TIME; ++hour) {
		var liElement = document.createElement("li");
		liElement.className = "row";

		var timeBlock = document.createElement("span");
		timeBlock.className = "day-item col";
		timeBlock.innerHTML = moment(hour, "HH").format("hh A");
		var temp = moment(hour, "HH").format("HH");

		var task = document.createElement("p");
		task.className = "day-item col";
		// console.log(temp, moment().format("HH"));
	
		if (temp > moment().format("HH")) {
			task.classList.add("future");
		} else if (temp == moment().hour()) {
			task.classList.add("present");
		} else {
			task.classList.add("past");
		}
		
		// console.log(timeBlock.innerHTML, moment().hour(), "task: ", task);
		
		var saveIcon = document.createElement("span");
		saveIcon.className = "day-item col oi oi-task";

		if (!tasks) {
			task.innerHTML = "dummy task";
		} else {
			task.innerHTML = tasks[hour - START_OF_DAY_TIME];
		}
		liElement.appendChild(timeBlock);
		liElement.appendChild(task);
		liElement.appendChild(saveIcon);
		dayGroup.appendChild(liElement);

		tempArray.push(task.innerHTML);
	}
	tasks = tempArray;
	saveTasks();
};

var updateCurrentDay = function () {
	var currentDate = document.querySelector("#currentDay");
	// currentDate.innerHTML = moment().format("dddd, MMMM Do");
	currentDate.innerHTML = moment().format("dddd, MMMM Do");
};

var headerIntervalCtrl = setInterval(updateCurrentDay, 1000);

startPlanner();
