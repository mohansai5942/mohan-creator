import React from 'react';

const AboutAdmin: React.FC = () => {
  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8 md:py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Mohan Creator</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          The visionary mind and developer behind Creator Prompts.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row min-h-[500px]">
        {/* Image Section - Full Portrait */}
        <div className="md:w-5/12 relative h-96 md:h-auto bg-gray-200 dark:bg-gray-700">
           <img 
             src="https://image2url.com/images/1765383325681-6ed8090b-cbbe-4689-af6c-e08c359b2671.jpg" 
             alt="Mohan Creator" 
             className="absolute inset-0 w-full h-full object-cover"
           />
           {/* Mobile overlay text */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden flex items-end p-6">
           </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vision & Craft</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Mohan Creator is a dedicated <span className="text-gray-900 dark:text-white font-semibold">Full Stack Developer</span> and AI Enthusiast passionate about building tools that empower the creative community. 
            <span className="text-primary font-medium"> Creator Prompts</span> was built to bridge the gap between imagination and generative AI, offering a curated space for high-quality artistic inputs.
          </p>
          
          <blockquote className="relative p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-primary mb-8">
            <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed font-serif">
              "My goal is to simplify the creative process. Whether you're a designer, storyteller, or hobbyist, this platform ensures you have the best starting point for your next masterpiece."
            </p>
          </blockquote>
          
          <div className="flex flex-wrap gap-4 mt-auto">
              <a 
                href="https://wa.me/917093320572?text=Hi%20I%20am%20looking%20for%20a%20website!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none justify-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-indigo-600 transition-all hover:-translate-y-1 shadow-lg shadow-primary/30 font-semibold flex items-center gap-2 group"
              >
                  <svg className="w-5 h-5 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.672-.272-.989-.472-1.488-.172-.372-.322.272.545.272.893.371.223.099.372.497.595.743.223.248.57.248.719.149.223-.198.347.025.595-.149-.074.817.347 1.487.644 1.834.347.347.744.595.892.669.149.074.322.074.52.074.198 0 .422-.025.644-.025.223 0 .446.049.52.321.074.273.496 2.975.57 3.248.074.272.124.52.025.793-.099.272-.372.421-.768.62-.397.198-.867.372-1.289.421-.421.05-.817-.025-1.164-.124-.347-.099-1.511-.557-2.903-1.809-1.066-.96-1.953-2.227-2.176-2.599-.223-.372-.025-.57.198-.793.198-.198.421-.421.62-.644.198-.223.272-.372.396-.619.124-.248.074-.471-.025-.669-.099-.198-.891-2.157-1.214-2.924-.322-.768-.644-.891-.644-.223 0-.496.025-.768.025-.272 0-.719.099-1.115.52-.396.421-1.511 1.487-1.511 3.614 0 2.132 1.561 4.183 1.785 4.481.223.297 3.05 4.654 7.421 6.541 2.898 1.251 4.016 1.017 4.783.943.768-.074 2.454-1.016 2.798-1.983.346-.967.346-1.809.248-1.983-.099-.174-.372-.272-.768-.471z"/></svg>
                  Contact Mohan
              </a>
               <a 
                href="https://mohanwebdeveloperr.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-2"
              >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  View Portfolio
              </a>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Constantly pushing the boundaries of what's possible with Web technologies and AI integration.
              </p>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-4">
                🎨
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Creativity</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Curating aesthetics and interfaces that inspire users and elevate digital art forms.
              </p>
          </div>
          <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center text-2xl mb-4">
                🤝
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Community</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Building for the creators, by a creator. Focused on adding real value to your workflow.
              </p>
          </div>
      </div>
    </div>
  );
};

export default AboutAdmin;