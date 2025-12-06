🌍 Universal AI Document Translator

Universal Translator is a full-stack application that allows users to translate text, PDFs, images, CSV, Excel and other documents into any supported language using Hugging Face translation models or Gemini, integrated with OCR (Tesseract) and FastAPI backend, and a React + Tailwind CSS frontend.

🚀 Features
Feature	Status
Translate text	✅
Translate files (PDF, Images, CSV, XLSX)	✅
OCR extraction for images	✅
Maintains document formatting where possible	🔄 (partial for PDF/Excel)
Hugging Face multilingual model	✅ (Helsinki-NLP/opus-mt-en-mul)
Gemini optional translation	🔄
Modern UI (React + Tailwind)	✅
Loading animations / success alerts	✅
🏗️ Tech Stack
Backend

FastAPI

Pydantic

Hugging Face Transformers

Tesseract OCR

pdfplumber / pandas / python-docx / PyMuPDF

Uvicorn

Frontend

React (Vite)

Tailwind CSS

Axios

lucide-react icons