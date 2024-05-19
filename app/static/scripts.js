let gptFeedback = {
    status: "",
    classification: "",
    chat_response: ""
}

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('imageUploader');
    const fileInput = document.getElementById('select');
    const fileNameSpan = document.getElementById('file-name');
    const submitButton = document.getElementsByClassName("file-submit-label")[0];
    fileInput.addEventListener('change', function() {
        var file = this.files[0];
        var fileName = file.name;
        fileNameSpan.innerText = fileName;
        submitButton.disabled = false;
        submitButton.innerHTML = "Upload image";
        var label = document.getElementsByClassName("file-input-label")[0];

        // Remove existing images if any
        while (label.firstChild) {
            label.removeChild(label.firstChild);
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            var image = document.createElement("img");
            image.src = e.target.result;
            image.style.objectFit ='contain';
            image.style.overflow = 'hidden';
            label.appendChild(image);
            //label.style.objectFit ='contain';
        };

        reader.readAsDataURL(file);
    });

    // Handle the form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData();
        const file = event.target[0].files[0];
        formData.append('file', file);
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        // Send the POST request
        fetch('/send', {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                submitButton.innerHTML = "Submitted!";
                return response.json();
            } else if (response.status == 400) { 
                submitButton.innerHTML = "Upload image";
                throw new Error('Invalid Input, please try again');
            }
        })
        .then(data => {
            let imageFeedbackBlock = document.getElementsByClassName("result")[0];
            if (!imageFeedbackBlock) {
                console.error("Result block not found");
                return;
            }
            submitButton.disabled = false;
            // Clear previous results
            imageFeedbackBlock.innerHTML = '';

            let infoBlock = document.getElementsByClassName('infoForm');
            // Display classification
            let classification = document.createElement("h2");
            classification.innerText = "Classification:";
            classification.style.fontFamily = '"Lucida Console", "Courier New", monospace';
            classification.style.textAlign = 'center';
            classification.style.fontSize = '40px';
            classification.style.color = 'green';
            imageFeedbackBlock.appendChild(classification);

            let classificationText = document.createElement("p");
            classificationText.innerText = data.classification;
            classificationText.style.fontWeight = 'bold';
            classificationText.style.textAlign = 'center';  
            classificationText.style.fontFamily = '"Lucida Console", "Courier New", monospace';
            imageFeedbackBlock.appendChild(classificationText); 

            // Display chat response
            let responseTitle = document.getElementById('responseHeader');
            let chatResponseElement = document.getElementById('chat-response-content');
            if(responseTitle && chatResponseElement){
                responseTitle.innerHTML = "Which container it goes into:";
                responseTitle.style.fontFamily = '"Lucida Console", "Courier New", monospace';
                responseTitle.style.textAlign = 'center';
                responseTitle.style.color = 'green'
                responseTitle.style.fontWeight = 'bold';
                chatResponseElement.innerText = data.chat_response;
                chatResponseElement.style.fontFamily = '"Lucida Console", "Courier New", monospace';
                chatResponseElement.style.textAlign = 'center';
                chatResponseElement.style.fontWeight = 'bold';
            } else {
                console.error("Chat response element not found");
            }
        })
        .catch(error => {
            console.error(error);
            let imageFeedbackBlock = document.getElementsByClassName("result")[0];
            if (imageFeedbackBlock) {
                imageFeedbackBlock.innerText = error;
                imageFeedbackBlock.style.fon;
            }
        });
    });
});