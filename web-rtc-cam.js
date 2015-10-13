(function webRtcCam(){

	'use strict';

	main();

	return;

	function main() {

		var constraints = {
			audio: false,
			video: true
		};

		setupUserMedia();

		navigator.getUserMedia(constraints, onLoad, onError);
	}

	function setupUserMedia() {

		navigator.getUserMedia = 
			navigator.getUserMedia 			||
			navigator.webkitGetUserMedia 	||
			navigator.mozGetuserMedia;

	}

	function setVideoSource(stream) {

		var container = document.getElementById('content'),
			video = document.createElement('video');

		video.autoplay	= true;
		video.src 		= stream;

		clear(container);

		container.appendChild(video);
	}

	function clear(node) {
		var child;
		while(child = node.firstChild) {
			node.removeChild(child);
		}
	}

	function onLoad(mediaStream) {
		var stream = mapStream(mediaStream);

		setVideoSource(stream);
	}

	function mapStream(mediaStream) {
		var url = window.URL;

		return url ? url.createObjectURL(mediaStream) : mediaStream;
	}

	function onError(error) {

		var message = getErrorMessage(error),
			container = document.getElementById('content');

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