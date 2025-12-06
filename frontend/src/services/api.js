const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';0
/**
 * Translate text to target language
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language code
 * @returns {Promise<Object>} Translation response
 */
export const translateText = async (text, targetLanguage) => {
  try {
    const response = await fetch(`${API_BASE_URL}/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        target_language: targetLanguage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

/**
 * Translate file content to target language
 * @param {File} file - File to translate
 * @param {string} targetLanguage - Target language code
 * @returns {Promise<Object>} Translation response
 */
export const translateFile = async (file, targetLanguage) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_language', targetLanguage);

    const response = await fetch(`${API_BASE_URL}/file`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('File translation error:', error);
    throw error;
  }
};

/**
 * Check API health/connectivity
 * @returns {Promise<boolean>} API status
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export default {
  translateText,
  translateFile,
  checkApiHealth,
};