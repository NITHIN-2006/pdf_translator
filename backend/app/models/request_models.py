from pydantic import BaseModel

class TextRequest(BaseModel):
    text: str
    target_language: str

class FileRequest(BaseModel):
    file_name: str
    target_language: str
