import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import PromptCard from './components/PromptCard';
import PromptModal from './components/PromptModal';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import AboutAdmin from './components/AboutAdmin';
import Legal from './components/Legal';
import ContactSupport from './components/ContactSupport';
import WebDevelopment from './components/WebDevelopment';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import FeatureStrip from './components/FeatureStrip';
import HowItWorks from './components/HowItWorks';
import ViewAllPrompts from './components/ViewAllPrompts';
import CustomCursor from './components/CustomCursor';
import WebDevBanner from './components/WebDevBanner';
import { PromptItem, GenderCategory } from './types';
import { getPrompts, incrementCopyCount } from './services/storageService';

// Home Page Component
const Home: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GenderCategory>(GenderCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for Category Bar visibility
  const [showCategoryBar, setShowCategoryBar] = useState(true);
  const webDevRef = useRef<HTMLDivElement>(null);

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

  // Handle URL query parameters for category filtering (e.g. /?category=Men)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      // Check if the param matches our enum values
      const matchedCategory = Object.values(GenderCategory).find(
        c => c.toLowerCase() === categoryParam.toLowerCase()
      );
      
      if (matchedCategory) {
        setSelectedCategory(matchedCategory);
      }
    }
  }, [location.search]);

  // Scroll Listener for Category Bar Toggle
  useEffect(() => {
    const handleScroll = () => {
      if (webDevRef.current) {
        const rect = webDevRef.current.getBoundingClientRect();
        // Check if Web Development section has entered the viewport (or is above it)
        // We use window.innerHeight to detect when it comes up from the bottom
        const isWebDevVisible = rect.top < window.innerHeight;
        
        // If visible (scrolled down to it), hide category bar.
        // If not visible (scrolled up away from it), show category bar.
        setShowCategoryBar(!isWebDevVisible);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesCategory = selectedCategory === GenderCategory.ALL || prompt.category === selectedCategory;
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [prompts, selectedCategory, searchQuery]);

  const handleCardClick = (prompt: PromptItem) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    incrementCopyCount(id);
  };

  // Logic for Home Gallery Limit (3 Rows)
  // Assuming XL breakpoint (5 columns) * 3 rows = 15 slots.
  // We show 14 cards, and the 15th slot is the "View All" card.
  const MAX_HOME_ITEMS = 14;
  const showViewAllCard = filteredPrompts.length > MAX_HOME_ITEMS;
  const displayPrompts = showViewAllCard ? filteredPrompts.slice(0, MAX_HOME_ITEMS) : filteredPrompts;

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <Hero />

      {/* Feature Strip (Flashlight Effect) */}
      <FeatureStrip />

      {/* How It Works (Steps) */}
      <HowItWorks />

      {/* ID for scrolling */}
      <div id="browse-section" className="pt-6"></div>

      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-6">
            <div className="w-full md:w-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Prompt Gallery</h2>
                <p className="text-gray-500 dark:text-gray-400">Explore the latest AI generation styles</p>
            </div>

             {/* Search Bar */}
            <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm shadow-sm transition-all hover:shadow-md"
                    placeholder="Search keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
      </div>

      {/* Neon Ripple Filter Bar */}
      <section 
        className={`sticky top-16 z-40 bg-gray-50/95 dark:bg-[#050911]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-4 mb-6 transition-opacity duration-500 ease-in-out ${
          showCategoryBar ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 flex justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {[GenderCategory.ALL, GenderCategory.MEN, GenderCategory.WOMEN, GenderCategory.COUPLE].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative overflow-hidden px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
               <span className="relative z-10">{cat}</span>
               {selectedCategory === cat && (
                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
               )}
            </button>
          ))}
        </div>
      </section>

      {/* High Motion Grid */}
      <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 min-h-[600px] mb-24">
        {isLoading ? (
           <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
           </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {displayPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onClick={() => handleCardClick(prompt)}
                  onCopy={handleCopy}
                />
              ))}
              
              {/* View All Card */}
              {showViewAllCard && (
                <Link 
                  to={`/prompts?category=${selectedCategory}`}
                  className="group relative h-full min-h-[300px] bg-gray-100 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
                >
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">View All Prompts</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Explore the full collection</p>
                </Link>
              )}
            </div>
            
            {filteredPrompts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="text-8xl mb-6 opacity-20">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No prompts found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or category filters.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* PROMOTIONAL WEB DEVELOPMENT BANNER */}
      <div ref={webDevRef}>
        <WebDevBanner />
      </div>

      <PromptModal
        prompt={selectedPrompt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCopy={handleCopy}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <CustomCursor />
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompts" element={<ViewAllPrompts />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/about-admin" element={<AboutAdmin />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/contact" element={<ContactSupport />} />
          <Route path="/web-development" element={<WebDevelopment />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;