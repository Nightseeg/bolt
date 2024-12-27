import React, { useState } from 'react';
import { FileSpreadsheet, Upload, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GoogleSheetUpload() {
  const [sheetUrl, setSheetUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setSheetUrl('');
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Une erreur est survenue lors de l'importation");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <FileSpreadsheet className="w-8 h-8 text-[#1a237e]" />
        <h3 className="text-2xl font-bold text-gray-900">Import Google Sheets</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="sheet" className="block text-sm font-medium text-gray-700 mb-2">
            URL du Google Sheet
          </label>
          <input
            type="url"
            id="sheet"
            value={sheetUrl}
            onChange={(e) => {
              setSheetUrl(e.target.value);
              setError(null);
            }}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e] transition-colors ${
              error ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={isUploading || success}
          className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl text-white transition-all ${
            success
              ? 'bg-green-500'
              : isUploading
              ? 'bg-[#1a237e]/70 cursor-not-allowed'
              : 'bg-[#1a237e] hover:bg-[#0d47a1]'
          }`}
        >
          {success ? (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>Importé avec succès</span>
            </motion.div>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>{isUploading ? 'Importation...' : 'Importer'}</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}