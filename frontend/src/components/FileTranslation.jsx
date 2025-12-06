import React from 'react';
import { Upload, Globe, Loader2, X, FileText, Image } from 'lucide-react';

function FileTranslation({ 
  selectedFile, 
  setSelectedFile, 
  onTranslate, 
  loading 
}) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const getFileIcon = (file) => {
    if (!file) return <Upload className="w-12 h-12 text-gray-400" />;
    
    const type = file.type;
    if (type.includes('image')) {
      return <Image className="w-8 h-8 text-blue-600" />;
    }
    return <FileText className="w-8 h-8 text-blue-600" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload File
        </label>
        
        {!selectedFile ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".txt,.pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="hidden"
              id="file-upload"
              disabled={loading}
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
            >
              <Upload className="w-12 h-12 text-gray-400 mb-3" />
              <span className="text-sm text-gray-600 font-medium mb-1">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500">
                PDF, DOC, DOCX, TXT, PNG, JPG (Max 10MB)
              </span>
            </label>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getFileIcon(selectedFile)}
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                disabled={loading}
                className="p-2 hover:bg-white rounded-full transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onTranslate}
        disabled={loading || !selectedFile}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Translating File...
          </>
        ) : (
          <>
            <Globe className="w-5 h-5 mr-2" />
            Translate File
          </>
        )}
      </button>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-800">
          <strong>Supported formats:</strong> Text files (.txt), PDFs (.pdf), 
          Word documents (.doc, .docx), and images with text (.png, .jpg, .jpeg)
        </p>
      </div>
    </div>
  );
}

export default FileTranslation;