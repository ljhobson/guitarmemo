/*
if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("/app/service-worker.js").then(function(registration) {
		console.log("Service worker has been registered for scope: " + registration.scope);
	});
}

// Prevent double-tap zoom on buttons
document.addEventListener('touchstart', function (event) {
	if (event.touches.length > 1) {
		event.preventDefault();
	}
});

var recording = false;

window.onload = function(event) {
	var recordButton = document.getElementsByClassName("record-button")[0]
	recordButton.addEventListener('touchstart', function(event) {
		this.style.backgroundColor = "#ee5522";
		event.preventDefault();
	});
	recordButton.addEventListener('touchend', function(event) {
		if (recording) {
			recording = false;
			this.style.backgroundColor = "#cccccc";
		} else {
			recording = true;
			this.style.backgroundColor = "#ee5522";
			document.getElementsByClassName("record-feedback")[0].innerHTML = "";
		}
		event.preventDefault();
	});
}
*/
window.onload = function(event) {
	alert("I have been loaded!");
}