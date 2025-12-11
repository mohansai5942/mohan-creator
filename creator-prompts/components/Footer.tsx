import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#050911] border-t border-gray-200 dark:border-gray-800 pt-8 pb-12 transition-colors duration-200">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
                <img 
                  src="https://files.catbox.moe/hpdxlg.png" 
                  alt="Creator Prompts Logo" 
                  className="h-10 w-10 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Creator Prompts
                </span>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm leading-relaxed">
                The premium creative prompt gallery for modern AI artists. Discover, copy, and craft elite visual experiences in seconds.
              </p>
              <div className="flex gap-4">
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/mohan_creator/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(225,48,108,0.5)]"
                  style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
                >
                   {/* Gradient Hover Background */}
                   <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#f09433] to-[#bc1888] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                   
                   <svg className="w-5 h-5 group-hover:text-white z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                   <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Follow on Instagram</span>
                </a>

                {/* Telegram */}
                <a 
                  href="https://t.me/mohancreator" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,136,204,0.5)]"
                >
                   <div className="absolute inset-0 rounded-xl bg-[#0088cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                   <svg className="w-5 h-5 z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                   <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Join on Telegram</span>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/917093320572?text=Hi%20I%20am%20looking%20for%20a%20website!" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,211,102,0.5)]"
                >
                    {/* Green Hover Background */}
                    <div className="absolute inset-0 rounded-xl bg-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    
                    <svg className="w-5 h-5 z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.672-.272-.989-.472-1.488-.172-.372-.322.272.545.272.893.371.223.099.372.497.595.743.223.248.57.248.719.149.223-.198.347.025.595-.149-.074.817.347 1.487.644 1.834.347.347.744.595.892.669.149.074.322.074.52.074.198 0 .422-.025.644-.025.223 0 .446.049.52.321.074.273.496 2.975.57 3.248.074.272.124.52.025.793-.099.272-.372.421-.768.62-.397.198-.867.372-1.289.421-.421.05-.817-.025-1.164-.124-.347-.099-1.511-.557-2.903-1.809-1.066-.96-1.953-2.227-2.176-2.599-.223-.372-.025-.57.198-.793.198-.198.421-.421.62-.644.198-.223.272-.372.396-.619.124-.248.074-.471-.025-.669-.099-.198-.891-2.157-1.214-2.924-.322-.768-.644-.891-.644-.223 0-.496.025-.768.025-.272 0-.719.099-1.115.52-.396.421-1.511 1.487-1.511 3.614 0 2.132 1.561 4.183 1.785 4.481.223.297 3.05 4.654 7.421 6.541 2.898 1.251 4.016 1.017 4.783.943.768-.074 2.454-1.016 2.798-1.983.346-.967.346-1.809.248-1.983-.099-.174-.372-.272-.768-.471z"/></svg>
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat on WhatsApp</span>
                </a>

                {/* Portfolio */}
                <a href="https://mohanwebdeveloperr.netlify.app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#1DA1F2] hover:text-white dark:hover:bg-[#1DA1F2] dark:hover:text-white transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                </a>
              </div>
            </div>

            {/* Explore (Categories) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Explore</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">All Prompts</Link></li>
                <li><Link to="/?category=Men" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Men's Fashion</Link></li>
                <li><Link to="/?category=Women" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Women's Style</Link></li>
                <li><Link to="/?category=Couple" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Couple Goals</Link></li>
              </ul>
            </div>

            {/* Company (App Pages) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/web-development" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Web Development</Link></li>
                <li><Link to="/about-admin" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">About Admin</Link></li>
                <li><Link to="/admin" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Admin Panel</Link></li>
                <li><a href="https://mohanwebdeveloperr.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Portfolio</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-6 uppercase text-sm tracking-wider">Legal</h4>
              <ul className="space-y-4">
                <li><Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">Contact Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Creator Prompts Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
               <Link 
                 to="/about-admin" 
                 className="hover:text-primary dark:hover:text-primary transition-colors font-medium flex items-center gap-1"
               >
                 Created by Mohan Creator
               </Link>
            </div>
          </div>
        </div>
    </footer>
  );
};

export default Footer;