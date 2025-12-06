import pytesseract
from PIL import Image
import io
import os

# Set Tesseract path from environment variable
tesseract_path = os.getenv('TESSERACT_PATH', r'C:\Program Files\Tesseract-OCR\tesseract.exe')
if os.path.exists(tesseract_path):
    pytesseract.pytesseract.tesseract_cmd = tesseract_path
    print(f"Tesseract configured at: {tesseract_path}")
else:
    print(f"Warning: Tesseract not found at {tesseract_path}")

def extract_text_from_image(image_file) -> str:
    """
    Extract text from image using Tesseract OCR
    
    Args:
        image_file: File-like object (BytesIO or UploadFile.file)
        
    Returns:
        Extracted text as string
    """
    try:
        # Read image from file object
        image_bytes = image_file.read()
        
        # Open image with PIL
        image = Image.open(io.BytesIO(image_bytes))
        
        # Configure Tesseract for better OCR
        # Use multiple languages if needed: lang='eng+tel' for English and Telugu
        custom_config = r'--oem 3 --psm 6'
        
        # Extract text
        text = pytesseract.image_to_string(
            image, 
            config=custom_config,
            lang='eng+tel'  # English and Telugu support
        )
        
        print(f"Extracted {len(text)} characters from image")
        return text.strip()
        
    except pytesseract.TesseractNotFoundError:
        raise Exception(
            "Tesseract is not installed or not found. "
            "Please install Tesseract OCR and set TESSERACT_PATH in .env file. "
            f"Current path: {tesseract_path}"
        )
    except Exception as e:
        raise Exception(f"Error extracting text from image: {str(e)}")