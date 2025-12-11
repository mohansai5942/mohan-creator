import React, { useEffect, useState } from 'react';
import { PromptItem } from '../types';

interface PromptModalProps {
  prompt: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: (text: string, id: string) => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, isOpen, onClose, onCopy }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !prompt) return null;

  const handleCopy = () => {
    onCopy(prompt.promptText, prompt.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
     // Create a temporary anchor to trigger download
     const link = document.createElement('a');
     link.href = prompt.imageUrl;
     link.download = `creator-prompts-${prompt.id}.jpg`;
     link.target = '_blank';
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-900 flex items-center justify-center">
          <img 
            src={prompt.imageUrl} 
            alt={prompt.title} 
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Details Side */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
               <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300">
                {prompt.category}
               </span>
               <span className="text-gray-400 text-xs">• {new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{prompt.title}</h2>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-6 relative group">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm">
              {prompt.promptText}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {prompt.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-4">
             <button
               onClick={handleCopy}
               className={`flex justify-center items-center py-3 px-4 rounded-xl font-semibold transition-all shadow-sm ${
                 copied
                 ? 'bg-green-600 text-white shadow-green-200'
                 : 'bg-primary text-white hover:bg-indigo-600 shadow-indigo-200'
               }`}
             >
               {copied ? (
                 <>Copied!</>
               ) : (
                 <>
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                   Copy Prompt
                 </>
               )}
             </button>
             
             <button
               onClick={handleDownload}
               className="flex justify-center items-center py-3 px-4 rounded-xl font-semibold bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
             >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Image
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;