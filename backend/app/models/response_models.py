from pydantic import BaseModel

class TranslationResponse(BaseModel):
    text: str
