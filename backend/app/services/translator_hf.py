from googletrans import Translator
import time

class HuggingFaceTranslator:
    """Translator using Google Translate (free)"""
    
    def __init__(self, api_key: str = None):
        """
        Initialize translator
        
        Args:
            api_key: Not needed for Google Translate, kept for compatibility
        """
        self.translator = Translator()
        self.api_key = api_key
        
    async def translate(self, text: str, target_language: str) -> str:
        """
        Translate text to target language
        
        Args:
            text: Text to translate
            target_language: Target language code (e.g., 'en', 'es', 'fr')
            
        Returns:
            Translated text
        """
        if not text or not text.strip():
            return ""
        
        try:
            max_length = 4500
            
            if len(text) > max_length:
                chunks = self._split_text(text, max_length)
                translated_chunks = []
                
                for i, chunk in enumerate(chunks):
                    print(f"Translating chunk {i+1}/{len(chunks)}...")
                    translated_chunk = self._translate_chunk(chunk, target_language)
                    translated_chunks.append(translated_chunk)
                    if i < len(chunks) - 1:
                        time.sleep(0.5)
                
                return " ".join(translated_chunks)
            else:
                return self._translate_chunk(text, target_language)
                
        except Exception as e:
            print(f"Translation error: {str(e)}")
            raise Exception(f"Translation failed: {str(e)}")
    
    def _translate_chunk(self, text: str, target_language: str, retries=3) -> str:
        """Translate a single chunk of text with retry logic"""
        
        for attempt in range(retries):
            try:
                result = self.translator.translate(text, dest=target_language)
                return result.text
                
            except Exception as e:
                print(f"Translation attempt {attempt + 1} failed: {str(e)}")
                
                if attempt < retries - 1:
                    time.sleep(2 * (attempt + 1))
                    self.translator = Translator()
                else:
                    print(f"All translation attempts failed, returning original text")
                    return text
        
        return text
    
    def _split_text(self, text: str, max_length: int) -> list:
        """Split text into chunks at sentence boundaries"""
        sentences = []
        current_sentence = ""
        for char in text:
            current_sentence += char
            if char in '.!?' and len(current_sentence) > 10:
                sentences.append(current_sentence.strip())
                current_sentence = ""
        if current_sentence.strip():
            sentences.append(current_sentence.strip())
        chunks = []
        current_chunk = []
        current_length = 0
        
        for sentence in sentences:
            sentence_length = len(sentence)
            
            if current_length + sentence_length > max_length:
                if current_chunk:
                    chunks.append(" ".join(current_chunk))
                    current_chunk = [sentence]
                    current_length = sentence_length
                else:
                    chunks.append(sentence[:max_length])
                    remaining = sentence[max_length:]
                    if remaining:
                        current_chunk = [remaining]
                        current_length = len(remaining)
            else:
                current_chunk.append(sentence)
                current_length += sentence_length + 1
        
        if current_chunk:
            chunks.append(" ".join(current_chunk))
        
        return chunks