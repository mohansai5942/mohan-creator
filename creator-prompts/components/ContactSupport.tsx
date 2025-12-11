import React, { useState } from 'react';

const ContactSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/creatorpromptss@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Creator Prompts: New Message from ${formData.name}`,
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("There was an issue sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      alert("There was an issue sending your message. Please check your internet connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-8 md:py-12 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Support</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have a question, suggestion, or need help with a prompt? We're here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info Side */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/917093320572?text=Hi%20I%20am%20looking%20for%20a%20website!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.672-.272-.989-.472-1.488-.172-.372-.322.272.545.272.893.371.223.099.372.497.595.743.223.248.57.248.719.149.223-.198.347.025.595-.149-.074.817.347 1.487.644 1.834.347.347.744.595.892.669.149.074.322.074.52.074.198 0 .422-.025.644-.025.223 0 .446.049.52.321.074.273.496 2.975.57 3.248.074.272.124.52.025.793-.099.272-.372.421-.768.62-.397.198-.867.372-1.289.421-.421.05-.817-.025-1.164-.124-.347-.099-1.511-.557-2.903-1.809-1.066-.96-1.953-2.227-2.176-2.599-.223-.372-.025-.57.198-.793.198-.198.421-.421.62-.644.198-.223.272-.372.396-.619.124-.248.074-.471-.025-.669-.099-.198-.891-2.157-1.214-2.924-.322-.768-.644-.891-.644-.223 0-.496.025-.768.025-.272 0-.719.099-1.115.52-.396.421-1.511 1.487-1.511 3.614 0 2.132 1.561 4.183 1.785 4.481.223.297 3.05 4.654 7.421 6.541 2.898 1.251 4.016 1.017 4.783.943.768-.074 2.454-1.016 2.798-1.983.346-.967.346-1.809.248-1.983-.099-.174-.372-.272-.768-.471z"/></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">WhatsApp Support</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">+91 7093320572</p>
                  <span className="text-xs text-primary font-medium mt-1 inline-block">Chat now &rarr;</span>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:creatorpromptss@gmail.com"
                className="flex items-center gap-4 group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Email Us</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">creatorpromptss@gmail.com</p>
                  <span className="text-xs text-primary font-medium mt-1 inline-block">Send email &rarr;</span>
                </div>
              </a>

               {/* Portfolio */}
              <a 
                href="https://mohanwebdeveloperr.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Developer Portfolio</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mohan Creator</p>
                  <span className="text-xs text-primary font-medium mt-1 inline-block">Visit website &rarr;</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value="">Select a topic</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback / Suggestion</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              disabled={submitted || isSending}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all transform active:scale-95 flex justify-center items-center ${
                submitted 
                ? 'bg-green-500 cursor-default' 
                : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/30'
              }`}
            >
              {isSending ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : submitted ? (
                'Message Sent!'
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;