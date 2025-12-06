import React from 'react';
import { Globe, Loader2 } from 'lucide-react';

const TextTranslation = ({ 
  inputText, 
  setInputText, 
  onTranslate, 
  loading 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onTranslate();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Enter Text
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full h-40 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          disabled={loading}
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {inputText.length} characters
          </span>
          {inputText.length > 0 && (
            <button
              onClick={() => setInputText('')}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              disabled={loading}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !inputText.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Translating...
          </>
        ) : (
          <>
            <Globe className="w-5 h-5 mr-2" />
            Translate Text
          </>
        )}
      </button>
    </div>
  );
};

export default TextTranslation;