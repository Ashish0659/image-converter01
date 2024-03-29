// Function to handle drag-and-drop event
function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    
    if (files.length > 0) {
        handleFiles(event);
    }
}

// Function to handle file input change event
function handleFiles(event) {
    const fileList = event.target.files || event.dataTransfer.files;
    const preview = document.getElementById('preview');
    const uploadSection = document.getElementById('uploadSection');

    // Display uploaded image preview
    if (fileList.length > 0) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const image = new Image();
            image.src = e.target.result;

            image.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const webpImage = document.createElement('img');
                    webpImage.src = url;

                    preview.innerHTML = '';
                    preview.appendChild(webpImage);
                }, 'image/webp');
            }
        }

        reader.readAsDataURL(fileList[0]);
        uploadSection.classList.add('file-uploaded');
    }
}

// Function to handle drag-and-drop events
function init() {
    const dropArea = document.getElementById('uploadSection');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);
}

function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
}

function highlight() {
    this.classList.add('highlight');
}

function unhighlight() {
    this.classList.remove('highlight');
}

// Initialize drag-and-drop functionality
init();
