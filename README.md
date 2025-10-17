# Corals Image Correction Web App

A web-based application to enhance coral photographs using advanced color correction algorithms.

## Features

- 🪸 **Advanced Color Correction**: Gray World white balance algorithm
- 🎨 **Automatic Enhancement**: Auto contrast, sharpness, and color saturation
- 📤 **Easy Upload**: Drag & drop or click to upload
- 💾 **Download Results**: Save corrected images instantly
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Installation

1. Install Python 3.13.5 or higher
2. Install required packages:
```bash
pip install -r requirements.txt
```

## Usage

### Running the Web Application

1. Start the server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Upload your underwater image and see the results!

### Running the Command Line Version

```bash
python underwater_fix.py <input_image> [output_image]
```

## Project Structure

```
imageGPT/
├── app.py                  # Flask web application
├── underwater_fix.py       # Core image processing logic
├── requirements.txt        # Python dependencies
├── templates/
│   └── index.html         # Web interface
├── static/
│   ├── style.css          # Styling
│   └── script.js          # Client-side logic
├── uploads/               # Temporary upload folder
└── outputs/               # Processed images folder
```

## How It Works

The application applies the following corrections:

1. **Gray World White Balance** - Corrects underwater color cast
2. **Color Channel Adjustment** - Fine-tunes RGB channels
3. **Auto Contrast** - Improves brightness and contrast
4. **Sharpness Enhancement** - Makes details clearer
5. **Color Saturation Boost** - Enhances color vibrancy

## Supported Formats

- JPG/JPEG
- PNG
- GIF
- BMP

Maximum file size: 16MB

## Credits

Developed by Suryo Kusumo
Powered by Python, Flask, Pillow, and NumPy
