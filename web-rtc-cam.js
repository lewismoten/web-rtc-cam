(function webRtcCam(){

	'use strict';

	window.addEventListener("load", onWindowLoaded);

	function onWindowLoaded() {
		document.getElementById("readyButton").addEventListener('click', onReadyClick);
	}

	function onReadyClick() {
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
		if(navigator.webkitGetUserMedia) {
			// Chrome
			return navigator.webkitGetUserMedia(constraints, onLoad, onError);
		}
		if(navigator.mozGetUserMedia) {
			// Mozilla
			return navigator.mozGetUserMedia(constraints, onLoad, onError);
		}
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// Edge
			return navigator.mediaDevices.getUserMedia(constraints).then(onLoad).catch(onError);
		}
		console.error('getUserMedia', navigator.getUserMedia);
		console.error('webkitGetUserMedia', navigator.webkitGetUserMedia);
		console.error('mozGetUserMedia', navigator.mozGetUserMedia);
		console.error('mediaDevices', navigator.mediaDevices);
		throw 'Unable to determine how to get user media. Is your camera blocked from using this site?';
	}

	function setVideoSource(stream) {
		var video = document.getElementById('videoCamera');
		video.srcObject = stream;
	}

	function onError(error) {

		var message = getErrorMessage(error);
		var content = document.getElementById('content');

		if (content === null) {
			console.error(error);
			alert(error);
			return;
		}

		content.innerText = 'Error: ' + message;

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
