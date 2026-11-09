# web-rtc-cam

Display the end user's webcam stream on a web page.

A small demonstration from 2015. Open `index.html` in a browser, click **Ready**, and allow camera access. The page shows the video (640x480, front-facing camera, no audio) in a `<video>` element.

There is no build step. `getUserMedia` access needs a modern browser and, in most browsers, a secure (https or localhost) page. This is an old experiment and is not maintained.
