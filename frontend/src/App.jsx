import React, { useState } from 'react';
import { FileText, Upload, Globe, Copy, Check, AlertCircle, Sparkles } from 'lucide-react';
import TextTranslation from './components/TextTranslation';
import FileTranslation from './components/FileTranslation';
import LanguageSelector from './components/LanguageSelector';
import LoadingPage from './components/LoadingPage';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [copied, setCopied] = useState(false);
  {loading && <LoadingPage />}

  const handleTextTranslation = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedText('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          target_language: targetLanguage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Translation failed');
      }
      
      const data = await response.json();
      setTranslatedText(data.text);
    } catch (err) {
      setError(err.message || 'Failed to translate text. Please check your API connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileTranslation = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedText('');
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('target_language', targetLanguage);

      const response = await fetch(`${API_BASE_URL}/file`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Translation failed');
      }
      
      const data = await response.json();
      setTranslatedText(data.text);
    } catch (err) {
      setError(err.message || 'Failed to translate file. Please check your API connection.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInputText('');
    setSelectedFile(null);
    setTranslatedText('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Globe className="w-12 h-12 text-blue-600 mr-3" />
              <Sparkles className="w-5 h-5 text-purple-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Universal Translator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Translate text and documents instantly with AI</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              PDF and Image Translator
            </span>
            <span>20+ Languages</span>
            <span>Multiple Formats</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('text');
                setError('');
              }}
              className={`flex-1 py-4 px-6 font-semibold transition-all relative ${
                activeTab === 'text'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Text Translation
              {activeTab === 'text' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('file');
                setError('');
              }}
              className={`flex-1 py-4 px-6 font-semibold transition-all relative ${
                activeTab === 'file'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              File Translation
              {activeTab === 'file' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          <div className="p-8">
            {/* Language Selector */}
            <div className="mb-6">
              <LanguageSelector
                value={targetLanguage}
                onChange={setTargetLanguage}
                disabled={loading}
              />
            </div>

            {/* Translation Components */}
            {activeTab === 'text' ? (
              <TextTranslation
                inputText={inputText}
                setInputText={setInputText}
                onTranslate={handleTextTranslation}
                loading={loading}
              />
            ) : (
              <FileTranslation
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                onTranslate={handleFileTranslation}
                loading={loading}
              />
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm font-medium">Translation Error</p>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Translation Result */}
            {translatedText && (
              <div className="mt-6 animate-fade-in">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                    Translation Result
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg blur opacity-50"></div>
                  <div className="relative p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {translatedText}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            Built with React, Tailwind CSS, and FastAPI
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;