const START_OF_DAY_TIME = 9;
const END_OF_DAY_TIME = 18;
const LOC_STG_APP_KEY = "scheduler";
const TIME_TICK = 1000;
var tasks = {};
var dayGroup;
var flagLocStg = true;

var saveTasks = function () {
	localStorage.setItem(LOC_STG_APP_KEY, JSON.stringify(tasks));
};

function setTaskStatusColor(hour) {
	if (hour > moment().hour(11).format("H")) {
		return "col-8 description future";
	} else if (hour == moment().hour(11).format("H")) {
		return "col-8 description present";
	} else {
		return "col-8 description past";
	}
}

var createDay = function () {
	for (var hour = START_OF_DAY_TIME; hour < END_OF_DAY_TIME; ++hour) {
		var liElement = document.createElement("li");
		liElement.className = "row day-item";

		var timeBlock = document.createElement("span");
		timeBlock.className = "col-2 hour time-block";
		timeBlock.textContent = moment(hour, "HH").format("h a");

		var taskElement = document.createElement("p");
		taskElement.className = setTaskStatusColor(hour);
		var tempDescr = {};
		if (flagLocStg) {
			tempDescr = tasks[hour - START_OF_DAY_TIME];
		} else {
			tempDescr = "";
		}
		taskElement.textContent = tempDescr;

		var saveIcon = document.createElement("i");
		saveIcon.className = "col-2 oi oi-task saveBtn";

		liElement.appendChild(timeBlock);
		liElement.appendChild(taskElement);
		liElement.appendChild(saveIcon);
		dayGroup.appendChild(liElement);
	}
};

var createUl = function () {
	dayGroup = document.createElement("ul");
	dayGroup.className = "day-group";
	document.querySelector(".container").appendChild(dayGroup);
};

var updateCurrentDay = function () {
	var currentDate = document.querySelector("#currentDay");
	currentDate.innerHTML = moment().format("dddd, MMMM Do");
};

var startScheduler = function () {
	var headerIntervalCtrl = setInterval(updateCurrentDay, TIME_TICK);
	tasks = JSON.parse(localStorage.getItem("scheduler"));
	console.log(tasks);
	if (!tasks) {
		tasks = [];
		flagLocStg = false;
	}
	console.log(tasks);
	createUl();
	createDay();
};

startScheduler();

$(".day-group").on("click", "p", function () {
	var text = $(this).text().trim(); // gets task description into var text
	var textInput = $("<textarea>").addClass("col-8").val(text); // creates <textarea> element, adds class name, and value
	$(this).replaceWith(textInput); // Swap old text description with updated description; <textarea>
	textInput.trigger("focus");
});

$(".day-group").on("blur", "textarea", function () {
	var text = $(this).val().trim(); // get the textarea's current value/text
	var index = $(this).closest(".day-item").index(); // transversing-up to the closest (itself)
	tasks[index] = text; // updates tasks array
	// recreate <p> element with updated text and update status color
	var taskP = $("<p>")
		.addClass(setTaskStatusColor(index + START_OF_DAY_TIME))
		.text(text);
	$(this).replaceWith(taskP); // replace textarea with <p> element
});

$(".day-group").on("click", "i", function () {
	localStorage.setItem("scheduler", JSON.stringify(tasks));
});
