import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Pick a Category",
      desc: "Men / Women / Couple",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
      )
    },
    {
      id: 2,
      title: "Preview Prompt",
      desc: "See sample images instantly",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
      )
    },
    {
      id: 3,
      title: "Copy in One Click",
      desc: "Paste into AI & generate",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
      )
    }
  ];

  return (
    <section className="py-10 px-6 lg:px-10 w-full max-w-[1500px] mx-auto border-b border-gray-200 dark:border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Works</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400">Three simple steps to your next masterpiece.</p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        {/* Connecting Lines (Desktop only) */}
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-200 dark:bg-gray-800 z-0">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary w-full animate-border-beam opacity-50"></div>
        </div>

        {steps.map((step, idx) => (
          <div 
            key={step.id} 
            className="relative z-10 flex flex-col items-center text-center animate-fade-in"
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            <div className="group relative w-24 h-24 mb-6">
               <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-lg group-hover:border-primary group-hover:shadow-primary/30 transition-all duration-300 transform group-hover:rotate-6 flex items-center justify-center">
                 <div className="text-primary group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">
                    {step.icon}
                 </div>
               </div>
               {/* Step Number Badge */}
               <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold flex items-center justify-center shadow-md">
                 {step.id}
               </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[200px]">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;