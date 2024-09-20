if (!navigator.serviceWorker.controller) {
	navigator.serviceWorker.register("/app/service-worker.js").then(function(registration) {
		console.log("Service worker has been registered for scope: " + registration.scope);
	});
}