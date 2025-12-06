import os
import requests

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_ENDPOINT = os.environ.get("GEMINI_ENDPOINT", "https://api.example.com/gemini/translate")

def translate_gemini(text: str, target_lang: str, source_lang: str | None = None) -> str:
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY not set")
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}", "Content-Type": "application/json"}
    payload = {"prompt": f"Translate to {target_lang}: {text}", "max_output_tokens": 2048}
    response = requests.post(GEMINI_ENDPOINT, headers=headers, json=payload, timeout=60)
    result = response.json()
    if isinstance(result, dict) and "output" in result:
        return result["output"]
    if isinstance(result, dict) and "generated_text" in result:
        return result["generated_text"]
    return str(result)
