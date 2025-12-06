import os
from fastapi import HTTPException, Header
from typing import Optional

def get_huggingface_key(
    authorization: Optional[str] = Header(None),
    x_api_key: Optional[str] = Header(None)
) -> str:
    """
    Get HuggingFace API key from various sources
    
    Priority:
    1. Authorization header (Bearer token)
    2. X-API-Key header
    3. Environment variable
    
    Args:
        authorization: Authorization header
        x_api_key: X-API-Key header
        
    Returns:
        API key string
        
    Raises:
        HTTPException: If no API key is found
    """
    # Try to get from Authorization header
    if authorization:
        if authorization.startswith("Bearer "):
            return authorization.replace("Bearer ", "")
        return authorization
    
    # Try to get from X-API-Key header
    if x_api_key:
        return x_api_key
    
    # Try to get from environment variable
    api_key = os.getenv("HUGGINGFACE_API_KEY") or os.getenv("HF_API_KEY")
    if api_key:
        return api_key
    
    # If no key found, raise error
    raise HTTPException(
        status_code=401,
        detail="HuggingFace API key is required. Please set HUGGINGFACE_API_KEY environment variable or pass it in headers."
    )