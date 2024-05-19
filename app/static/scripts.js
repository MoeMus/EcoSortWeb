let gptFeedback = {
    status: "",
    classification: "",
    chat_response: ""
}


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
        fetch('/send', { 
            method: "POST",
            body: formData
        })
        .then(response => {if(response.ok){
            response.json();
            let imageFeedbackBlock = document.getElementsByClassName("result");
            let feedback = Object.assign(new gptFeedback(), response);
            let classification = document.createElement("h2");
            classification.innerText = "Classification:";
            classification.style.fontFamily = '"Lucida Console", "Courier New", monospace';
            classification.style.textAlign ='center';
            classification.style.fontSize = '40px';
            imageFeedbackBlock.appendChild(classification);
            imageFeedbackBlock.innerText = feedback.classification;
        }})
        .catch(error=>{
            console.error("invalid image");
        });
        
    });

});