import React, { useState, useEffect } from 'react';

const WebDevelopment: React.FC = () => {
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 0 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 }; // Reset loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      title: "Business Websites",
      originalPrice: "₹20,000",
      price: "₹9,000",
      desc: "Complete website package",
      features: [
        "Responsive Mobile-First Design",
        "Contact Forms & Map Integration",
        "SEO Optimization Setup",
        "Fast Loading Speed Optimization",
        "Social Media Integration"
      ],
      samples: [
        { name: "Corporate Dashboard", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" }, // Analytics Dashboard
        { name: "Consulting Agency", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" }, // Data Graphs
        { name: "Business Hub", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" } // Modern Office
      ],
      color: "from-blue-500 to-cyan-500",
      borderGradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Personal Websites",
      originalPrice: "₹18,000",
      price: "₹9,000",
      desc: "Build your personal brand",
      features: [
        "Personal Brand Showcase",
        "Blog/News Section",
        "Resume/CV Integration",
        "Custom Domain Setup",
        "Clean Minimalist Layout"
      ],
      samples: [
        { name: "Personal Blog", img: "https://images.unsplash.com/photo-1499750310159-52f0f837ce1c?w=600&q=80" }, // Laptop & Coffee
        { name: "Digital Resume", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80" }, // Coding/Workspace
        { name: "Creator Profile", img: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=80" } // Portrait/People
      ],
      color: "from-purple-500 to-pink-500",
      borderGradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Portfolio Websites",
      originalPrice: "₹18,000+",
      price: "₹11,000",
      desc: "Showcase your work",
      features: [
        "High-Quality Gallery Grid",
        "Project Case Studies",
        "Client Testimonials",
        "Video Background Support",
        "Smooth Animations"
      ],
      samples: [
        { name: "Photography Grid", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80" }, // Photo Editing
        { name: "Design Portfolio", img: "https://images.unsplash.com/photo-1626785774573-4b799314346d?w=600&q=80" }, // Graphic Design UI
        { name: "Art Showcase", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80" } // Art Gallery
      ],
      color: "from-orange-400 to-red-500",
      borderGradient: "from-orange-400 to-red-500"
    },
    {
      title: "E-commerce Websites",
      originalPrice: "₹40,000+",
      price: "₹25,000",
      desc: "Start selling online",
      features: [
        "Product Management System",
        "Secure Payment Gateway",
        "Shopping Cart & Checkout",
        "Order Tracking Dashboard",
        "Customer Accounts"
      ],
      samples: [
        { name: "Online Store", img: "https://images.unsplash.com/photo-1472851294608-4155f2118c67?w=600&q=80" }, // Retail Vibe
        { name: "Product Page", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80" }, // Product Shot
        { name: "Checkout UI", img: "https://images.unsplash.com/photo-1556742046-806e8ac21c6c?w=600&q=80" } // Payment Terminal
      ],
      color: "from-green-400 to-emerald-600",
      borderGradient: "from-green-400 to-emerald-600"
    }
  ];

  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-12 animate-fade-in">
      
      {/* Hero Section with Urgency */}
      <div className="text-center mb-16 space-y-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
        
        <div className="inline-flex flex-col items-center animate-bounce-slow">
            <div className="px-6 py-2 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-sm uppercase tracking-wider mb-4 shadow-sm">
                Limited Slots Available — Book Before Offer Ends!
            </div>
            <div className="flex gap-2 text-2xl md:text-3xl font-mono font-bold text-gray-900 dark:text-white mb-2">
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="self-center">:</span>
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="self-center">:</span>
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm text-primary">
                    {String(timeLeft.seconds).padStart(2, '0')}
                </span>
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Web Development</span>
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
          Premium websites at unbeatable prices. Secure your digital presence today.
        </h2>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mb-20">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            className={`group relative rounded-2xl p-[1px] bg-gradient-to-br ${cat.borderGradient} hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2`}
          >
            {/* Inner Content Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl h-full w-full overflow-hidden flex flex-col relative">
                
                {/* Special Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-red-600 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-md z-10">
                    Special Deal
                </div>

                <div className="p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex text-yellow-400 mb-2 text-sm gap-0.5">
                            {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                        </div>
                        <h3 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${cat.color} mb-3`}>
                            {cat.title}
                        </h3>
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-gray-400 line-through text-lg">{cat.originalPrice}</span>
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{cat.price}</span>
                        </div>
                        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-md">
                            Save 55% Today
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                            {cat.desc}
                        </p>
                    </div>

                    {/* Buy Button */}
                    <a 
                        href="https://wa.me/917093320572?text=Hi%20I%20am%20looking%20for%20a%20website!" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full text-center py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r ${cat.color} hover:brightness-110 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20 mb-8 relative overflow-hidden group/btn`}
                    >
                        <span className="relative z-10">Buy Now & Start</span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-shimmer"></div>
                    </a>

                    {/* Trust & Features */}
                    <div className="space-y-6 mb-8 flex-grow">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                             <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                             <span className="font-semibold">Secure Payment: UPI / Cards / Razorpay</span>
                        </div>

                        <ul className="space-y-3">
                            {cat.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm">
                                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                {feature}
                            </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visual Samples (Image Previews) */}
                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Live Preview Examples</h4>
                        <div className="grid grid-cols-3 gap-3">
                            {cat.samples.map((sample, sIdx) => (
                                <div key={sIdx} className="group/sample cursor-pointer">
                                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 relative mb-2 shadow-sm group-hover/sample:shadow-md group-hover/sample:border-primary transition-all">
                                        <img src={sample.img} alt={sample.name} className="w-full h-full object-cover group-hover/sample:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover/sample:bg-black/10 transition-colors"></div>
                                    </div>
                                    <p className="text-[10px] font-bold text-center text-gray-600 dark:text-gray-400 group-hover/sample:text-primary transition-colors truncate">
                                        {sample.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="flex flex-wrap justify-center gap-8 mb-20 text-center opacity-80">
          <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="font-bold text-gray-700 dark:text-gray-300">100% Delivery Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span className="font-bold text-gray-700 dark:text-gray-300">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <span className="font-bold text-gray-700 dark:text-gray-300">24/7 Support</span>
          </div>
      </div>

      {/* Bottom CTA Footer */}
      <div className="bg-gradient-to-b from-gray-900 to-black rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-gray-800 text-center">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
         
         <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
               Start Your Website Today
             </h2>
             <p className="text-xl text-primary font-semibold mb-6">
                Special Prices Ending Soon!
             </p>
             <p className="text-gray-400 mb-8">
                Don't miss out on this limited offer. Get professional guidance and a stunning website to grow your business.
             </p>
             
             <a 
               href="https://wa.me/917093320572?text=Hi%20I%20am%20looking%20for%20a%20website!" 
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1ebd59] text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-green-900/50 mb-8"
             >
               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.672-.272-.989-.472-1.488-.172-.372-.322.272.545.272.893.371.223.099.372.497.595.743.223.248.57.248.719.149.223-.198.347.025.595-.149-.074.817.347 1.487.644 1.834.347.347.744.595.892.669.149.074.322.074.52.074.198 0 .422-.025.644-.025.223 0 .446.049.52.321.074.273.496 2.975.57 3.248.074.272.124.52.025.793-.099.272-.372.421-.768.62-.397.198-.867.372-1.289.421-.421.05-.817-.025-1.164-.124-.347-.099-1.511-.557-2.903-1.809-1.066-.96-1.953-2.227-2.176-2.599-.223-.372-.025-.57.198-.793.198-.198.421-.421.62-.644.198-.223.272-.372.396-.619.124-.248.074-.471-.025-.669-.099-.198-.891-2.157-1.214-2.924-.322-.768-.644-.891-.644-.223 0-.496.025-.768.025-.272 0-.719.099-1.115.52-.396.421-1.511 1.487-1.511 3.614 0 2.132 1.561 4.183 1.785 4.481.223.297 3.05 4.654 7.421 6.541 2.898 1.251 4.016 1.017 4.783.943.768-.074 2.454-1.016 2.798-1.983.346-.967.346-1.809.248-1.983-.099-.174-.372-.272-.768-.471z"/></svg>
               Chat on WhatsApp
             </a>
         </div>
      </div>
    </div>
  );
};

export default WebDevelopment;