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