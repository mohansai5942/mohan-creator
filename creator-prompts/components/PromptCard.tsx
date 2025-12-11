import React, { useState, useRef } from 'react';
import { PromptItem } from '../types';

interface PromptCardProps {
  prompt: PromptItem;
  onClick: () => void;
  onCopy: (text: string, id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick, onCopy }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(prompt.promptText, prompt.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg tilt
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="tilt-card group relative h-full cursor-pointer animate-fade-in"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50">
        
        {/* Shine Overlay */}
        <div className="shine-overlay z-20"></div>

        {/* Image Container */}
        <div className="aspect-square w-full overflow-hidden bg-gray-200 dark:bg-gray-900 relative">
          <img 
            src={prompt.imageUrl} 
            alt={prompt.title} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Floating Category Badge */}
          <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-bold rounded-full text-white shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
            {prompt.category}
          </span>
        </div>

        {/* Content (Tilt Layer) */}
        <div className="tilt-content p-5 flex flex-col relative z-10 bg-white/5 dark:bg-gray-900/5 backdrop-blur-none">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2 group-hover:text-primary transition-colors duration-300" title={prompt.title}>
              {prompt.title}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 h-10">
            {prompt.promptText}
          </p>

          {/* Tags (Marquee style hint) */}
          <div className="flex gap-2 overflow-hidden mb-4 opacity-70 group-hover:opacity-100 transition-opacity">
              {prompt.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider text-primary border border-primary/30 px-2 py-0.5 rounded-sm">
                      #{tag}
                  </span>
              ))}
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
             <div className="flex items-center text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    {prompt.views}
                  </span>
             </div>

             <button
               onClick={handleCopy}
               className={`relative overflow-hidden flex items-center px-4 py-2 rounded-lg text-xs font-bold transition-all transform active:scale-95 ${
                 copied 
                 ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                 : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white'
               }`}
             >
               <span className="relative z-10 flex items-center gap-1">
                 {copied ? (
                   <>Copied!</>
                 ) : (
                   <>
                    <svg className="w-3 h-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                    Copy
                   </>
                 )}
               </span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;