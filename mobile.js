if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("/service-worker.js").then(function(registration) {
		console.log("Service worker has been registered for scope: " + registration.scope);
	});
}