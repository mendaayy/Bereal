// Set constraints for the video stream
const frontCamera = { video: { facingMode: { exact: "user" } }, audio: false };
const backCamera = { video: { facingMode: { exact: "environment" } }, audio: false };
let currentCamera = frontCamera;
let downloadButton = document.getElementById('download--button');

// Define constants
const camera = document.querySelector("#camera"),
    cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(currentCamera)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Camera not accessible", error);
    });

    // Sets up a horizontal flip for mirroring if the frontCamera is used
    if (currentCamera === backCamera){
        cameraView.style.transform = "scaleX(1)";
    } else {
        cameraView.style.transform = "scaleX(-1)";
    }
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraView.style.display = "block";

    let count = 3; // Set the countdown time
    const countdown = document.createElement('div');
    countdown.setAttribute('id', 'countdown');
    countdown.innerHTML = count;
    document.body.appendChild(countdown);

    // Starts a countdown when cameraTrigger is clicked
    const countdownInterval = setInterval(function() {
        console.log(count)
        count--;
        countdown.innerHTML = count;

        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;

        // Countdown finishes then toggle camera
        if (count === 0) {
            clearInterval(countdownInterval);
            document.body.removeChild(countdown);

            toggleCamera();
              
            // Call the takeScreenshot() function when the download button is clicked
            downloadButton.addEventListener('click', function() {
                takeScreenshot();
            });
              
            restartCamera();
        }
    }, 1000);
};

/* Toggle between front and back cameras 
   and display the image
* @function
*/
function toggleCamera() {
    if (currentCamera === frontCamera) {
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/png");
        cameraOutput.classList.add("taken");
        currentCamera = backCamera;
    } else {
        cameraView.style.display = "none";
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0, cameraView.videoWidth, cameraView.videoHeight);
        cameraSensor.lineWidth = 60;
        cameraView.style.display = "none";
        cameraSensor.style.display = "block";
        currentCamera = frontCamera;
        downloadButton.style.display = "block";
    }
}

/* Takes a screenshot of the camera element using html2canvas library,
* and downloads it as a PNG image file.
* @function
*/
function takeScreenshot() {
    html2canvas(camera).then(function(canvas) {
      const link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    });
}

// Restarting the camera
function restartCamera() {
    cameraView.srcObject.getTracks().forEach(function(track) {
        track.stop();
    });

    cameraStart();
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);