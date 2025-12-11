import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPrompt } from '../services/storageService';

const Hero: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [heroImage, setHeroImage] = useState<string>('https://image2url.com/images/1765389791239-157ad408-1e1c-473b-a578-db964ce61920.jpeg');

  const messages = [
    "Choose a category: Men / Women / Couple",
    "Tap to copy high-quality prompts instantly ⚡",
    "Create stunning AI art in seconds 🎨"
  ];

  useEffect(() => {
    // Load featured image asynchronously
    const loadFeatured = async () => {
        const featuredPrompt = await getFeaturedPrompt();
        if (featuredPrompt && featuredPrompt.imageUrl) {
            setHeroImage(featuredPrompt.imageUrl);
        }
    };
    loadFeatured();
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = messages[messageIndex];
      
      if (isDeleting) {
        setCurrentMessage(fullText.substring(0, currentMessage.length - 1));
      } else {
        setCurrentMessage(fullText.substring(0, currentMessage.length + 1));
      }

      if (!isDeleting && currentMessage === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentMessage === '') {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 30 : 50);
    return () => clearTimeout(timer);
  }, [currentMessage, isDeleting, messageIndex, messages]);

  const handlePreviewCopy = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCopiedPreview(true);
    setTimeout(() => setCopiedPreview(false), 2000);
  };

  const subheadline = "Perfect prompts for Men, Women & Couple images — ready to copy with one click.";

  return (
    <section className="relative w-full overflow-hidden bg-gray-50 dark:bg-[#050911] border-b border-gray-200 dark:border-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 animate-float-delayed"></div>

      <div className="relative w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN */}
        <div className="max-w-3xl z-10">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 backdrop-blur-sm animate-fade-in">
             <span className="text-xs font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent uppercase tracking-wider">
               Welcome to Creator Prompts by Mohan
             </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            <div className="reveal-text-container">
              <span className="reveal-text" style={{ animationDelay: '0ms' }}>Copy Creative</span>
            </div>
            <div className="reveal-text-container">
              <span className="reveal-text" style={{ animationDelay: '100ms' }}>Prompts for</span>
            </div>
            <div className="reveal-text-container pb-2">
              <span className="reveal-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary" style={{ animationDelay: '200ms' }}>
                Stunning AI Images
              </span>
            </div>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-xl leading-relaxed h-14 lg:h-auto">
            {subheadline.split("").map((char, index) => (
              <span 
                key={index} 
                className="letter-fade inline-block min-w-[4px]"
                style={{ animationDelay: `${500 + (index * 15)}ms` }}
              >
                {char}
              </span>
            ))}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '1200ms', opacity: 0, animationFillMode: 'forwards' }}>
            <button 
                onClick={() => document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg overflow-hidden shadow-lg shadow-primary/25 hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">Browse Prompts</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </button>
          
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium animate-fade-in" style={{ animationDelay: '1400ms', opacity: 0, animationFillMode: 'forwards' }}>
            <span className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Fast Copy
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              High-Quality Prompts
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Free to Use
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN (Interactive Preview) */}
        <div className="relative z-10 lg:h-[600px] flex items-center justify-center animate-fade-in" style={{ animationDelay: '800ms', opacity: 0, animationFillMode: 'forwards' }}>
            
            {/* Floating Glass Shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 glass-card rounded-2xl -rotate-12 animate-float shadow-lg z-0"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 glass-card rounded-full animate-float-delayed shadow-lg z-0"></div>

            {/* Main Interactive Card */}
            <div className="card-3d-wrap w-full max-w-md relative z-10">
                <div className="card-3d-inner relative bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    
                    {/* Header simulating app */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-400">Preview</div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Chat Bubble */}
                        <div className="mb-4">
                             <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none text-sm text-gray-600 dark:text-gray-300 typing-cursor shadow-sm">
                                {currentMessage}
                             </div>
                        </div>

                        {/* Prompt Card Preview - Interactive */}
                        <div 
                            onClick={() => handlePreviewCopy()}
                            className="group/card relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 active:scale-[0.98] cursor-pointer"
                        >
                            <div className="aspect-video w-full overflow-hidden relative">
                                <img 
                                    src={heroImage} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors"></div>
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-xs text-white font-medium">Men</div>
                            </div>
                            <div className="p-4">
                                <div className="h-2 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                                    A futuristic portrait of a young man with neon cybernetic enhancements, raining city background...
                                </p>
                                <button 
                                    onClick={handlePreviewCopy}
                                    className={`w-full py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                                        copiedPreview 
                                        ? 'bg-green-500 text-white scale-105 shadow-green-500/20' 
                                        : 'bg-primary text-white hover:bg-indigo-600 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 hover:ring-4 hover:ring-primary/10 hover:scale-105 active:scale-95'
                                    }`}
                                >
                                    {copiedPreview ? (
                                        <>Copied! ✨</>
                                    ) : (
                                        <>Copy Prompt <span className="opacity-70 text-[10px] ml-1">⌘C</span></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decoration */}
            <div className="absolute -z-10 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
