import PyPDF2
import docx
from fastapi import UploadFile
import io

def convert_to_text(file: UploadFile) -> str:
    filename = file.filename.lower()
    try:
        if filename.endswith(".pdf"):
            return extract_pdf_text(file)
        elif filename.endswith(".docx"):
            return extract_docx_text(file)
        elif filename.endswith(".doc"):
            return extract_docx_text(file)
        else:
            content = file.file.read()
            return content.decode('utf-8', errors='ignore')
    except Exception as e:
        raise ValueError(f"Error converting file to text: {str(e)}")
def extract_pdf_text(file: UploadFile) -> str:
    try:
        pdf_content = file.file.read()
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
        
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error extracting PDF text: {str(e)}")
def extract_docx_text(file: UploadFile) -> str:
    """Extract text from DOCX file"""
    try:
        docx_content = file.file.read()
        doc = docx.Document(io.BytesIO(docx_content))
        
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        
        return text.strip()
    except Exception as e:
        raise ValueError(f"Error extracting DOCX text: {str(e)}")