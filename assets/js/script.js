const START_OF_DAY_TIME = 9;
const END_OF_DAY_TIME = 18;
var tempArray = [];
var tasks = [];
const LOC_STG_APP_KEY = "scheduler";
var dayGroup;
var taskObj = {
	timeBlock: 0,
	taskEl: "",
};

var saveTasks = function () {
	localStorage.setItem(LOC_STG_APP_KEY, JSON.stringify(tasks));
};

var createDay = function () {
	tasks = JSON.parse(localStorage.getItem(LOC_STG_APP_KEY));
	for (var hour = START_OF_DAY_TIME; hour < END_OF_DAY_TIME; ++hour) {
		var liElement = document.createElement("li");
		liElement.className = "row day-item";

		var timeBlock = document.createElement("span");
		timeBlock.className = "col";
		timeBlock.innerHTML = moment(hour, "HH").format("h : mm a");

		var taskElement = document.createElement("p");

		var saveIcon = document.createElement("span");
		saveIcon.className = "col oi oi-task";

		if (!tasks) {
			taskElement.innerHTML = "dummy task " + hour;
		} else {
			taskElement.innerHTML = tasks[hour - START_OF_DAY_TIME].taskDescription;
		}

		if (hour > moment().hour(11).format("H")) {
			taskElement.className = "col future";
		} else if (hour == moment().hour(11).format("H")) {
			taskElement.className = "col present";
		} else {
			taskElement.className = "col past";
		} // "this" is the current element in the loop

		liElement.appendChild(timeBlock);
		liElement.appendChild(taskElement);
		liElement.appendChild(saveIcon);
		dayGroup.appendChild(liElement);

		taskObj.timeBlock = hour;
		taskObj.taskEl = taskElement;
		tempArray.push(taskObj);
	}
	tasks = tempArray;
	saveTasks();
};

var createUl = function () {
	dayGroup = document.createElement("ul");
	dayGroup.className = "day-group";
	document.querySelector(".container").appendChild(dayGroup);
};

var updateCurrentDay = function () {
	var currentDate = document.querySelector("#currentDay");
	currentDate.innerHTML = moment().format("dddd, MMMM Do");
	if (moment().minute() == "00") {
		for (var hour = START_OF_DAY_TIME; hour < END_OF_DAY_TIME; ++hour) {}
	}
};

var startScheduler = function () {
	var headerIntervalCtrl = setInterval(updateCurrentDay, 1000);
	createUl();
	createDay();
};

startScheduler();

$(".day-group").on("click", "p", function () {
	// gets task description into var text
	var text = $(this).text().trim();
	// console.log("in listener: ", text);

	// creates <textarea> element, adds class name, and value
	var textInput = $("<textarea>").addClass("form-control").val(text);

	// Swap old text description with updated description; <textarea>
	$(this).replaceWith(textInput);

	// programatically "triggers" the event "focus" on textInput to avoid the need
	// to click on <textarea> to start the text descr update
	textInput.trigger("focus");
});

$(".day-group").on("blur", "textarea", function () {
	// get the textarea's current value/text
	var text = $(this).val().trim();

	// get the parent ul's id attribute by transversing-up to the closest
	// var status = $(this).closest(".day-group").attr("id").replace("list-", "");
	var index = $(this).closest(".day-item").index();

	tasks[index].taskEl.textContent = text;

	// persists updated task description
	// saveTasks(); ******************************************

	// recreate <p> element with updated text
	var taskP = $("<p>").addClass("col").text(text);

	// replace textarea with <p> element
	$(this).replaceWith(taskP);
});

// console.log(document.querySelector(".day-group"));
