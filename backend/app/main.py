from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import translate
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Debug: Print Tesseract path to verify it's loaded
print(f"Tesseract Path: {os.getenv('TESSERACT_PATH', 'NOT SET')}")  # ← Changed from app.routes.translator

# Create FastAPI app
app = FastAPI(
    title="Translation API",
    description="AI-powered translation service",
    version="1.0.0"
)

# ⚠️ CRITICAL: Add CORS middleware BEFORE including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router with /api prefix
app.include_router(translate.router, prefix="/api")  # ← Changed

# Health check
@app.get("/")
async def root():
    return {"message": "Translation API is running", "status": "healthy"}

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)