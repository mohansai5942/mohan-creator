import React from 'react';

interface LegalProps {
  type: 'privacy' | 'terms';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const date = new Date().toLocaleDateString();

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10 py-8 md:py-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">Last updated: {date}</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        {isPrivacy ? (
          <>
            <p>
              At <strong>Creator Prompts</strong>, accessible from our website, one of our main priorities is the privacy of our visitors. 
              This Privacy Policy document contains types of information that is collected and recorded by Creator Prompts and how we use it.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We act as a gallery and prompt management tool. Currently, we do not require user registration or collect personal data 
              such as names, emails, or phone numbers for general viewing.
            </p>

            <h3>2. Local Storage</h3>
            <p>
              This application uses your browser's Local Storage to save your theme preferences (Light/Dark mode) and to simulate 
              a database for the Admin Panel functionality in this demo environment.
            </p>

            <h3>3. Third Party Services</h3>
            <p>
              We may use third-party services for image hosting or AI processing. These services have their own privacy policies 
              addressing how they use such information.
            </p>

            <h3>4. Consent</h3>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </>
        ) : (
          <>
            <p>
              Welcome to <strong>Creator Prompts</strong>! These terms and conditions outline the rules and regulations for the use of our Website.
            </p>

            <h3>1. Intellectual Property</h3>
            <p>
              Unless otherwise stated, Creator Prompts and/or its licensors own the intellectual property rights for all material on Creator Prompts. 
              All intellectual property rights are reserved. You may access this from Creator Prompts for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <h3>2. User Content</h3>
            <p>
              "Prompts" displayed on this site are for creative inspiration. You are free to use, copy, and modify these prompts for your own 
              AI generation workflows in tools like Midjourney, DALL-E, or Stable Diffusion.
            </p>

            <h3>3. License</h3>
            <p>
              You must not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Republish material from Creator Prompts as your own strictly for resale.</li>
              <li>Sell, rent or sub-license material from Creator Prompts.</li>
              <li>Reproduce, duplicate or copy material from Creator Prompts for a competing directory.</li>
            </ul>

            <h3>4. Disclaimer</h3>
            <p>
              The materials on Creator Prompts' website are provided on an 'as is' basis. Creator Prompts makes no warranties, expressed or implied, 
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Legal;