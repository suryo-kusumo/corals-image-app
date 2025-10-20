const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const progressSection = document.getElementById('progressSection');
const resultSection = document.getElementById('resultSection');
const originalImage = document.getElementById('originalImage');
const correctedImage = document.getElementById('correctedImage');
const downloadBtn = document.getElementById('downloadBtn');

let currentOutputFilename = '';

// File input change handler
fileInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Drag and drop handlers
uploadBox.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

// Handle file upload and processing
function handleFile(file) {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, GIF, or BMP)');
        return;
    }
    
    // Validate file size (16MB max)
    if (file.size > 16 * 1024 * 1024) {
        alert('File size must be less than 16MB');
        return;
    }
    
    // Show progress section
    document.querySelector('.upload-section').style.display = 'none';
    progressSection.style.display = 'block';
    resultSection.style.display = 'none';
    
    // Create FormData and upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Show original image preview
    const reader = new FileReader();
    reader.onload = function(e) {
        originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Upload and process
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error: ' + data.error);
            resetApp();
            return;
        }
        
        if (data.success) {
            currentOutputFilename = data.output_filename;
            
            // Load corrected image
            correctedImage.src = '/view/' + data.output_filename;
            
            // Show results
            progressSection.style.display = 'none';
            resultSection.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing your image. Please try again.');
        resetApp();
    });
}

// Download button handler
downloadBtn.addEventListener('click', function() {
    if (currentOutputFilename) {
        window.location.href = '/download/' + currentOutputFilename;
    }
});

// Reset app to initial state
function resetApp() {
    document.querySelector('.upload-section').style.display = 'block';
    progressSection.style.display = 'none';
    resultSection.style.display = 'none';
    fileInput.value = '';
    currentOutputFilename = '';
}
