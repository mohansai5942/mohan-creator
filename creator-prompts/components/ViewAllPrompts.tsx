import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PromptCard from './PromptCard';
import PromptModal from './PromptModal';
import WebDevBanner from './WebDevBanner';
import { PromptItem, GenderCategory } from '../types';
import { getPrompts, incrementCopyCount } from '../services/storageService';

const ViewAllPrompts: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GenderCategory>(GenderCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(30);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        const data = await getPrompts();
        setPrompts(data);
        setIsLoading(false);
    };
    fetchData();
  }, []);

  // Handle URL query parameters for category filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      const matchedCategory = Object.values(GenderCategory).find(
        c => c.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
      }
    }
  }, [location.search]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(30);
  }, [selectedCategory, searchQuery]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesCategory = selectedCategory === GenderCategory.ALL || prompt.category === selectedCategory;
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [prompts, selectedCategory, searchQuery]);

  const displayedPrompts = filteredPrompts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPrompts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network delay for UX
    setTimeout(() => {
        setVisibleCount(prev => prev + 30);
        setIsLoadingMore(false);
    }, 500);
  };

  const handleCardClick = (prompt: PromptItem) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    incrementCopyCount(id);
  };

  return (
    <div className="pb-12 min-h-screen">
      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Prompts</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Browse our complete collection of creative AI inputs</p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-xl mx-auto mb-10">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm shadow-sm transition-all hover:shadow-md"
                    placeholder="Search all prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar mb-10 pb-2">
          {[GenderCategory.ALL, GenderCategory.MEN, GenderCategory.WOMEN, GenderCategory.COUPLE].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative overflow-hidden px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
               {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-12">
          {displayedPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onClick={() => handleCardClick(prompt)}
              onCopy={handleCopy}
            />
          ))}
        </div>
        
        {/* Loading State */}
        {isLoading && (
           <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
           </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredPrompts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="text-6xl mb-4 opacity-20">🎨</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">No prompts found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your filters.</p>
          </div>
        )}

        {/* View More Button */}
        {hasMore && (
            <div className="flex justify-center pt-8">
                <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center gap-2"
                >
                    {isLoadingMore ? (
                        <>
                           <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Loading...
                        </>
                    ) : (
                        <>View More Prompts ↓</>
                    )}
                </button>
            </div>
        )}
      </div>

      {/* WEB DEVELOPMENT BANNER */}
      <WebDevBanner />

      <PromptModal
        prompt={selectedPrompt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCopy={handleCopy}
      />
    </div>
  );
};

export default ViewAllPrompts;