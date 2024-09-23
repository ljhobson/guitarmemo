if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        if (registrations.length === 0) {
            navigator.serviceWorker.register("/app/service-worker.js").then(function(registration) {
                console.log("Service worker has been registered for scope: " + registration.scope);
            });
        }
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
		//this.style.backgroundColor = "#ee5522";
		event.preventDefault();
	});
	recordButton.addEventListener('touchend', function(event) {
		if (recording) {
			recording = false;
			this.style.backgroundColor = "#cccccc";
			document.getElementsByClassName("record-canvas")[0].style = "display:none;";
		} else {
			recording = true;
			this.style.backgroundColor = "#ee5522";
			document.getElementsByClassName("record-feedback")[0].innerHTML = "";
			document.getElementsByClassName("record-canvas")[0].style = "display:block;";
			startRecording();
		}
		event.preventDefault();
	});
	canvas = document.getElementsByClassName("record-canvas")[0];
	canvas.width = 300;
	canvas.height = 50;
	
	promptRecordingPermissions();
}

var canvas;
var recordFrame;

var mediaRecorder;
var audioChunks;

function startRecording() {
	
	recordFrame = 0;
	var recordAnimation = setInterval(recordRender, 30);

	// Start recording
	mediaRecorder.start();

	// Example: stop recording after 3 seconds
	setTimeout(() => {
		mediaRecorder.stop();
	}, 3000);
	
}

function recordRender() {
	var barWidth = 10;
	var ctx = canvas.getContext("2d");
	ctx.fillRect(0, 0, barWidth+recordFrame, canvas.height);
	recordFrame++;
}

function promptRecordingPermissions() {
	if (navigator.permissions) {
		navigator.permissions.query({ name: 'microphone' }).then(function(permissionStatus) {
			alert(permissionStatus.state);
			// Prompt for permission
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				console.log('Microphone access granted:', stream);
				// You can now use the stream
			} catch (error) {
				console.error('Microphone access denied:', error);
				// Handle error (e.g., inform the user)
			}
		});
	}
}















