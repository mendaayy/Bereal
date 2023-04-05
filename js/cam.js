function capture() {
  const screen = {
    webcam: document.getElementById('webcam'),
    picture: document.getElementById('picture'),
    capture: document.getElementById('capture')
  };
  
  var webcam = screen.webcam;
  var picture = screen.picture;
  var capture = screen.capture;
  
  var setStream = function(mediaStream) {
    webcam.srcObject = mediaStream;
    webcam.style.display = "block";
  };
  
  capture.addEventListener('click', function() {
    var context = picture.getContext('2d');
    context.drawImage(webcam, 0, 0, 300, 300);
    context.lineWidth = 60;
  
    webcam.style.display = "none";
    picture.style.display = "block";
  });
  
  navigator.mediaDevices.getUserMedia({video: true}).then(setStream);
}