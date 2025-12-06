
# Universal PDF&Image Translator
Upload your PDF or Image and get instant translation of the content
# Universal Translator

Universal Translator is an AI-powered web application that allows you to **translate text and documents** instantly. It supports multiple languages and file formats, including PDFs and images, providing a seamless translation experience.

---

## Features

- **Text Translation**: Translate any text into your desired language.  
- **File Translation**: Upload PDFs or images and get translations directly.  
- **Multiple Languages**: Supports 20+ languages for translation.  
- **Copy & Clear Options**: Easily copy translated text or reset the input.  
- **Beautiful UI**: Responsive interface with Tailwind CSS and smooth animations.  
- **Loading Animations**: Eye-catching animated loader while processing translations.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Vite  
- **Backend**: FastAPI, Python  
- **OCR**: PyTesseract for image text extraction  
- **PDF Handling**: PyMuPDF, pdf2image  
- **Translation APIs**:HuggingFace-based translation services  
- **Utilities**: Axios, fpdf2, pandas  

---
## Screenshots

![App Screenshot](https://github.com/NITHIN-2006/pdf_translator/blob/main/Screenshot%202025-12-06%20153022.png)
![App Screenshot](https://github.com/NITHIN-2006/pdf_translator/blob/c25d406a489fe3269db5f64b011c05204e85aa6f/Screenshot%202025-12-06%20153105.png)

## File structure
```
pdf_translator/
├── backend/ # FastAPI backend
│ ├── main.py # FastAPI app entrypoint
│ ├── core/
│ │ └── config.py # Configuration settings
│ ├── api/
│ │ ├── routes.py # API routes
│ │ ├── request_models.py # Request models
│ │ └── response_models.py # Response models
│ ├── services/
│ │ ├── translator_hf.py
│ │ ├── translator_gemini.py
│ │ ├── extractor_text.py
│ │ ├── extractor_image.py
│ │ └── file_converter.py
│ ├── utils/
│ │ ├── logger.py
│ │ ├── rate_limiter.py
│ │ └── common.py
│ └── requirements.txt
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── App.jsx
│ │ ├── index.jsx
│ │ └── components/
│ │ ├── TextTranslation.jsx
│ │ ├── FileTranslation.jsx
│ │ ├── LanguageSelector.jsx
│ │ └── LoadingPage.jsx
│ ├── vite.config.js
│ └── package.json
│
└── README.md
```



