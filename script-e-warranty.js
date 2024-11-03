let videoStream = null;

        // Handle the search button click
        document.getElementById('searchButton').addEventListener('click', function() {
            const serialNumber = document.getElementById('serialNumber').value;
            if (serialNumber) {
                alert("Serial Number Entered: " + serialNumber);
            } else {
                alert("Please enter a serial number.");
            }
        });

        // Handle the scan button click (open the modal and camera)
        document.getElementById('scanButton').addEventListener('click', function() {
            const modal = document.getElementById('qrModal');
            modal.style.display = "flex";  // Flex is used to center the modal
            startCamera();
        });

        // Close modal when user clicks on the close button
        document.getElementById('closeModal').addEventListener('click', function() {
            closeModal();
        });

        // Handle Cancel button click
        document.getElementById('cancelButton').addEventListener('click', function() {
            closeModal();
        });

        // Function to close modal and stop the camera
        function closeModal() {
            const modal = document.getElementById('qrModal');
            modal.style.display = "none";
            stopCamera();
        }

        // Start the camera
        function startCamera() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('cameraCanvas');
    const context = canvas.getContext('2d');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            videoStream = stream;

            // Processing the video frames
            video.addEventListener('loadeddata', function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                requestAnimationFrame(tick); // Start processing frames
            });
        })
        .catch(function (err) {
            console.error("Error accessing the camera: ", err);
            alert("Unable to access the camera.");
        });

    function tick() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
            alert("QR Code Scanned: " + code.data);
            stopCamera(); // Stop the camera after scanning
            document.getElementById('qrModal').style.display = "none"; // Close the modal
            return; // Exit tick function
        }

        requestAnimationFrame(tick); // Keep processing frames
    }
}


        // Stop the camera
        function stopCamera() {
            if (videoStream) {
                const tracks = videoStream.getTracks();
                tracks.forEach(function(track) {
                    track.stop();
                });
            }
            videoStream = null;
        }