(function webRtcCam(){

	'use strict';

	main();

	return;

	function main() {

		var constraints = {
			audio: false,
			video: {
				width: 640,
				height: 480,
				facingMode: 'user'
			}
		};

		try {
			getUserMedia(constraints, setVideoSource, onError);
		} catch(e) {
			onError(e);
		}
	}

	function getUserMedia(constraints, onLoad, onError) {
		if(navigator.getUserMedia) {
			return navigator.getUserMedia(constraints, onLoad, onError);
		}
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			return navigator.mediaDevices.getUserMedia(constraints).then(onLoad).catch(onError);
		}
		throw 'Unable to determine how to get user media';
	}

	function setVideoSource(stream) {

		var container = document.getElementById('content'),
			video = document.createElement('video');

		video.autoplay	= true;
		video.srcObject = stream;

		clear(container);

		container.appendChild(video);
	}

	function clear(node) {
		var child;
		while(child = node.firstChild) {
			node.removeChild(child);
		}
	}

	function onError(error) {

		var message = getErrorMessage(error);
		var container = document.getElementById('content');

		if (container === null) {
			console.error(error);
			alert(error);
			return;
		}

		clear(container);

		container.innerText = 'Error: ' + message;

	}

	function getErrorMessage(error) {

		if(error.message) {
			return error.message;
		}

		switch(error.name) {
			case 'PermissionDeniedError':
				return 'Permission to use a media device was denied by the user or the system.';
			case 'NotFoundError':
				return 'No media tracks of the type specified were found that satify the constraints specified.';
			default:
				return name;
		}

	}

})();
