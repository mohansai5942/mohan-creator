import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureStrip: React.FC = () => {
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.getElementsByClassName('flashlight-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const features = [
    {
      title: "Men Prompts",
      desc: "Bold, stylish, and hyper-detailed ideas.",
      icon: "👔",
      color: "from-blue-500 to-cyan-500",
      category: "Men"
    },
    {
      title: "Women Prompts",
      desc: "Elegant, artistic & trendy creations.",
      icon: "👗",
      color: "from-pink-500 to-rose-500",
      category: "Women"
    },
    {
      title: "Couple Prompts",
      desc: "Romantic, cinematic & story-driven.",
      icon: "💑",
      color: "from-purple-500 to-indigo-500",
      category: "Couple"
    }
  ];

  return (
    <section 
      className="relative py-10 px-6 lg:px-10 w-full max-w-[1500px] mx-auto"
      onMouseMove={handleMouseMove}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div 
            key={idx}
            onClick={() => {
              navigate(`/?category=${feature.category}`);
              document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flashlight-card relative bg-white dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Hover Border Glow */}
            <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon with Pop-in */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-6 transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-75 shadow-lg`}>
                {feature.icon}
              </div>

              {/* Title with Neon Underline */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 neon-underline inline-block">
                {feature.title}
              </h3>

              {/* Description Fade Up */}
              <p className="text-gray-600 dark:text-gray-400 transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                {feature.desc}
              </p>
            </div>
            
            {/* Background Accent */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.color} blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureStrip;