
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('imageUploader');
    const fileInput = document.getElementById('select');
    const fileNameSpan = document.getElementById('file-name');

    fileInput.addEventListener('change', function() {
        var file = this.files[0];
        var fileName = file.name;
        fileNameSpan.innerText = fileName;

        var label = document.getElementsByClassName("file-input-label")[0];

        // Remove existing images if any
        while (label.firstChild) {
            label.removeChild(label.firstChild);
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            var image = document.createElement("img");
            image.src = e.target.result;
            image.style.width = '600px';
            image.style.height = 'auto';
            image.style.border = '2px solid black';
            label.appendChild(image);
        };

        reader.readAsDataURL(file);
        
    });
     // Handle the form submission
     form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        
        // Send the POST request
        fetch('/upload', { // Change '/upload' to your server endpoint
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle success, maybe show a success message
            console.log('Success:', data);
        })
        .catch(error => {
            // Handle error, maybe show an error message
            console.error('Error:', error);
        });
    });

});