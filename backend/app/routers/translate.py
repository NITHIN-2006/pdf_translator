from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from app.models.request_models import TextRequest
from app.models.response_models import TranslationResponse
from app.services.translator_hf import HuggingFaceTranslator
from app.services.extractor_text import extract_text_from_file
from app.services.extractor_image import extract_text_from_image
from app.services.file_converter import convert_to_text
from app.dependencies import get_huggingface_key

# Create router (no prefix here - added in main.py)
router = APIRouter()

@router.post("/text", response_model=TranslationResponse)
async def translate_text(
    payload: TextRequest, 
    api_key: str = Depends(get_huggingface_key)
):
    """Translate text to target language"""
    try:
        translator = HuggingFaceTranslator(api_key)
        translated = await translator.translate(payload.text, payload.target_language)
        return TranslationResponse(text=translated)
    except Exception as e:
        print(f"Error in translate_text: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/file", response_model=TranslationResponse)
async def translate_file(
    file: UploadFile = File(...),
    target_language: str = Form("en"),
    api_key: str = Depends(get_huggingface_key)
):
    """Translate file content to target language"""
    try:
        print(f"Received file: {file.filename}, content_type: {file.content_type}")
        content_type = file.content_type or ""

        # Extract text based on file type
        if "image" in content_type:
            print("Extracting text from image...")
            extracted = extract_text_from_image(file.file)
        elif "pdf" in content_type or "msword" in content_type or "officedocument" in content_type:
            print("Converting document to text...")
            extracted = convert_to_text(file)
        else:
            print("Extracting text from text file...")
            extracted = extract_text_from_file(file.file)

        print(f"Extracted text length: {len(extracted)}")
        
        # Translate
        translator = HuggingFaceTranslator(api_key)
        translated = await translator.translate(extracted, target_language)
        
        return TranslationResponse(text=translated)
    except Exception as e:
        print(f"Error in translate_file: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))