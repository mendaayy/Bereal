// Define a Camera class to handle camera related functionalities
class Camera {
  // Create Camera object
	constructor() {
  // Initialize DOM elements
  this.videoElement = document.getElementById('webcam');
  this.canvasElement = document.getElementById('picture');
  this.captureButton = document.getElementById('capture');
  }


  /*
    Function to get media stream from camera.
    @async
  */
  async getMediaStream() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.setVideoStream(mediaStream);
    } catch (error) {
        // Handle Errors
        console.error('Unable to get media stream:', error);
        alert('Unable to access camera, please check camera permission.');
    }
  }


  /**
    Function to set video stream to video element.
    @param {MediaStream} mediaStream - The media stream from camera.
  */
  setVideoStream(mediaStream) {
    this.videoElement.srcObject = mediaStream;
    this.videoElement.style.display = "block";
  }


  /**
    Function to take a picture and display it on canvas.
  */
    takePicture() {
      const context = this.canvasElement.getContext('2d');
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasElement.height = this.videoElement.videoHeight;
      context.drawImage(this.videoElement, 0, 0, this.videoElement.videoWidth, this.videoElement.videoHeight);
      context.lineWidth = 60;
      this.videoElement.style.display = "none";
      this.canvasElement.style.display = "block";
  }
  
}

// Initialize the camera object and attach event listener
const camera = new Camera();

// Add click event listener to the capture button
camera.captureButton.addEventListener('click', () => {
  camera.takePicture();
});

// Get the media stream from camera when page is loaded
window.addEventListener('load', () => {
  camera.getMediaStream();
});