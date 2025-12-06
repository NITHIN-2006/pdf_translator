import { useState, useCallback } from 'react';
import { translateText as apiTranslateText, translateFile as apiTranslateFile } from '../services/api';

/**
 * Custom hook for handling translations
 * @returns {Object} Translation state and methods
 */
export const useTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const translateText = useCallback(async (text, targetLanguage) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await apiTranslateText(text, targetLanguage);
      setResult(response.text);
      return response.text;
    } catch (err) {
      const errorMessage = err.message || 'Failed to translate text';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const translateFile = useCallback(async (file, targetLanguage) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiTranslateFile(file, targetLanguage);
      setResult(response.text);
      return response.text;
    } catch (err) {
      const errorMessage = err.message || 'Failed to translate file';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setResult(null);
  }, []);
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    result,
    translateText,
    translateFile,
    reset,
    clearError,
  };
};

export default useTranslation;