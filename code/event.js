events = document.getElementsByClassName("event");
exits = document.getElementsByClassName("exit_button");
buttons = document.getElementsByClassName("schedule_button");
function toggle(a) {
	events[a].classList.toggle("hidden");
}
function initialize_toggles() {
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function() {
			events[i].classList.toggle("hidden");
		});
		exits[i].addEventListener('click', function() {
			events[i].classList.toggle("hidden");
		});
		console.log(i);
	}
}

initialize_toggles();
