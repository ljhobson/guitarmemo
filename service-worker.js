self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('offline').then(cache => {
			return cache.addAll([
				'/',
				'/index.html',
				'/styles.css',
				'/app.js',
				'/favicon.ico'
			]);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});