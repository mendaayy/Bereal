// Set constraints for the video stream
var frontCamera = { video: { facingMode: { exact: "user" } }, audio: false };
var backCamera = { video: { facingMode: { exact: "environment" } }, audio: false };
var currentCamera = frontCamera;

// Define constants
const cameraView = document.querySelector("#camera--view"),
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
        console.error("Oops. Something is broken.", error);
    });

    if (currentCamera === backCamera){
        cameraView.style.transform = "scaleX(1)";
    } else {
        cameraView.style.transform = "scaleX(-1)";
    }
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraView.style.display = "block";

    var count = 3; // Set the countdown time
    var countdown = document.createElement('div');
    countdown.setAttribute('id', 'countdown');
    countdown.innerHTML = count;
    document.body.appendChild(countdown);

    var countdownInterval = setInterval(function() {
        console.log(count)
        count--;
        countdown.innerHTML = count;

        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;

        if (count === 0) {
            clearInterval(countdownInterval);
            document.body.removeChild(countdown);

            // Toggle between front and back cameras
            if (currentCamera === frontCamera) {
                cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
                cameraOutput.src = cameraSensor.toDataURL("image/webp");
                cameraOutput.classList.add("taken");
                currentCamera = backCamera;
            } else {
                cameraView.style.display = "none";
                cameraSensor.getContext("2d").drawImage(cameraView, 0, 0, cameraView.videoWidth, cameraView.videoHeight);
                cameraSensor.lineWidth = 60;
                cameraView.style.display = "none";
                cameraSensor.style.display = "block";
                currentCamera = frontCamera;
            }
            // Restart the camera stream with the new camera
            cameraView.srcObject.getTracks().forEach(function(track) {
                track.stop();
            });
            cameraStart();
        }
    }, 1000);
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);