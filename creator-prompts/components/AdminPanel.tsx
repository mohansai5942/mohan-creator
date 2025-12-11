
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenderCategory, PromptItem } from '../types';
import { savePrompt, deletePrompt, getPrompts, verifyAdminCredentials, updateAdminCredentials } from '../services/storageService';
import { enhancePrompt, generateTags } from '../services/geminiService';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [activeTab, setActiveTab] = useState<'admin' | 'client' | 'settings'>('admin');
  const [view, setView] = useState<'list' | 'create'>('list');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // 3️⃣ Route Protection & Validate Auth
  const checkAuth = () => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin-login');
      return false;
    }
    return true;
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Prompt Form State
  const [formData, setFormData] = useState({
    title: '',
    promptText: '',
    imageUrl: '',
    category: GenderCategory.MEN,
    tags: '',
    isFeaturedImage: false
  });

  // Settings Form State
  const [settingsData, setSettingsData] = useState({
    currentUserId: '',
    currentPassword: '',
    newUserId: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    setIsProcessing(true);
    try {
      const data = await getPrompts();
      setPrompts(data);
    } catch (e) {
      showToast("Failed to load prompts", 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter prompts based on active tab
  const displayedPrompts = prompts.filter(p => p.source === activeTab);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhancePrompt = async () => {
    if (!formData.promptText) return;
    setIsLoadingAi(true);
    const enhanced = await enhancePrompt(formData.promptText);
    setFormData(prev => ({ ...prev, promptText: enhanced }));
    setIsLoadingAi(false);
  };

  const handleAutoTag = async () => {
      if(!formData.promptText) return;
      setIsLoadingAi(true);
      const tags = await generateTags(formData.promptText);
      setFormData(prev => ({ ...prev, tags: tags.join(', ') }));
      setIsLoadingAi(false);
  };

  // 2️⃣ ADD Prompt - Protected
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAuth()) return; // Defense in depth
    setIsProcessing(true);

    try {
      const newPrompt: PromptItem = {
        id: Date.now().toString(),
        title: formData.title,
        promptText: formData.promptText,
        imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/800`,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        createdAt: Date.now(),
        views: 0,
        copies: 0,
        isFeaturedImage: formData.isFeaturedImage,
        source: 'admin'
      };
      await savePrompt(newPrompt);
      await refreshList();
      setView('list');
      setFormData({ title: '', promptText: '', imageUrl: '', category: GenderCategory.MEN, tags: '', isFeaturedImage: false });
      showToast("Prompt Created Successfully!");
    } catch (e) {
      showToast("Failed to save prompt", 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // Open Edit Modal
  const handleEditClick = (prompt: PromptItem) => {
    if (!checkAuth()) return;
    setEditingId(prompt.id);
    setFormData({
      title: prompt.title,
      promptText: prompt.promptText,
      imageUrl: prompt.imageUrl,
      category: prompt.category,
      tags: prompt.tags.join(', '),
      isFeaturedImage: prompt.isFeaturedImage || false
    });
    setIsEditModalOpen(true);
  };

  // 2️⃣ EDIT Prompt - Protected
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAuth()) return;
    if (!editingId) return;
    setIsProcessing(true);

    try {
      const originalPrompt = prompts.find(p => p.id === editingId);
      if (!originalPrompt) return;

      const updatedPrompt: PromptItem = {
        ...originalPrompt,
        title: formData.title,
        promptText: formData.promptText,
        imageUrl: formData.imageUrl,
        category: formData.category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        isFeaturedImage: formData.isFeaturedImage
      };

      await savePrompt(updatedPrompt);
      await refreshList();
      setIsEditModalOpen(false);
      setEditingId(null);
      setFormData({ title: '', promptText: '', imageUrl: '', category: GenderCategory.MEN, tags: '', isFeaturedImage: false });
      showToast("Changes Saved Successfully!");
    } catch (e) {
      showToast("Failed to update prompt", 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', promptText: '', imageUrl: '', category: GenderCategory.MEN, tags: '', isFeaturedImage: false });
  };

  // Trigger Delete Modal
  const handleDeleteClick = (id: string) => {
    if (!checkAuth()) return;
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // 2️⃣ DELETE Prompt - Protected
  const executeDelete = async () => {
    if (!checkAuth()) return;
    if (!itemToDelete) return;
    
    setIsDeleting(true);

    try {
      await deletePrompt(itemToDelete);
      // Optimistic or real refresh
      setPrompts(prev => prev.filter(p => p.id !== itemToDelete));
      showToast("Prompt Deleted Successfully");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      showToast("Failed to delete prompt", 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Settings Update
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkAuth()) return;

    // Verify Current Credentials
    if (!verifyAdminCredentials(settingsData.currentUserId, settingsData.currentPassword)) {
      showToast("Current admin credentials are incorrect", 'error');
      return;
    }

    // Validate New Password
    if (settingsData.newPassword !== settingsData.confirmNewPassword) {
      showToast("New passwords do not match", 'error');
      return;
    }

    if (settingsData.newPassword.length < 6) {
        showToast("Password must be at least 6 characters", 'error');
        return;
    }

    // Update Credentials
    updateAdminCredentials({
        userId: settingsData.newUserId,
        password: settingsData.newPassword
    });

    setSettingsData({
        currentUserId: '',
        currentPassword: '',
        newUserId: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    showToast("Admin credentials updated successfully.");
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-10 py-6 relative">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 right-6 z-[60] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          ) : (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
           <p className="text-sm text-green-500 font-medium flex items-center gap-1 mt-1">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Logged in as Admin
           </p>
        </div>
        {activeTab !== 'settings' && view === 'list' && (
          <button
            onClick={() => setView('create')}
            disabled={isProcessing}
            className="bg-primary hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            + New Prompt
          </button>
        )}
        {view === 'create' && (
          <button
             onClick={() => setView('list')}
             className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium"
          >
             Back to List
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit overflow-x-auto">
           <button
             onClick={() => { setActiveTab('admin'); setView('list'); }}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
               activeTab === 'admin' 
               ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
               : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
             }`}
           >
             Admin Prompts
           </button>
           <button
             onClick={() => { setActiveTab('client'); setView('list'); }}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
               activeTab === 'client' 
               ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
               : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
             }`}
           >
             Client Prompts
           </button>
           <button
             onClick={() => { setActiveTab('settings'); setView('list'); }}
             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
               activeTab === 'settings' 
               ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
               : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
             }`}
           >
             Security Settings
           </button>
      </div>

      {/* SETTINGS CONTENT */}
      {activeTab === 'settings' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto animate-fade-in">
           <div className="mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Credentials</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Update your secure login details below.</p>
           </div>
           
           <form onSubmit={handleSettingsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current User ID</label>
                   <input
                     type="text"
                     name="currentUserId"
                     value={settingsData.currentUserId}
                     onChange={handleSettingsChange}
                     required
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                   <input
                     type="password"
                     name="currentPassword"
                     value={settingsData.currentPassword}
                     onChange={handleSettingsChange}
                     required
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                   />
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-700" />

              <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New User ID</label>
                   <input
                     type="text"
                     name="newUserId"
                     value={settingsData.newUserId}
                     onChange={handleSettingsChange}
                     required
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                   />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                   <input
                     type="password"
                     name="newPassword"
                     value={settingsData.newPassword}
                     onChange={handleSettingsChange}
                     required
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                   <input
                     type="password"
                     name="confirmNewPassword"
                     value={settingsData.confirmNewPassword}
                     onChange={handleSettingsChange}
                     required
                     className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                   />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 w-full md:w-auto"
                >
                  Update Credentials
                </button>
              </div>
           </form>
        </div>
      ) : null}

      {/* PROMPT CONTENT (List or Create) */}
      {activeTab !== 'settings' && view === 'create' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-2xl mx-auto animate-fade-in">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Create New Prompt</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
              <div className="flex items-center gap-4">
                 <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-dashed border-gray-400">
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400 text-xs">Preview</span>
                    )}
                 </div>
                 <div className="flex-1">
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary/10 file:text-primary
                        hover:file:bg-primary/20"
                    />
                    <p className="text-xs text-gray-500 mt-2">Or leave blank to generate a random placeholder.</p>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="E.g. Cyberpunk Warrior"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    >
                    <option value={GenderCategory.MEN}>Men</option>
                    <option value={GenderCategory.WOMEN}>Women</option>
                    <option value={GenderCategory.COUPLE}>Couple</option>
                    </select>
                </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prompt Text</label>
                 <button 
                    type="button" 
                    onClick={handleEnhancePrompt}
                    disabled={isLoadingAi || !formData.promptText}
                    className="text-xs flex items-center text-primary hover:text-indigo-600 disabled:opacity-50"
                 >
                    {isLoadingAi ? 'Thinking...' : '✨ AI Enhance'}
                 </button>
              </div>
              <textarea
                name="promptText"
                required
                rows={4}
                value={formData.promptText}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono text-sm"
                placeholder="Describe your image..."
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                 <button 
                    type="button" 
                    onClick={handleAutoTag}
                    disabled={isLoadingAi || !formData.promptText}
                    className="text-xs flex items-center text-primary hover:text-indigo-600 disabled:opacity-50"
                 >
                    {isLoadingAi ? 'Generating...' : '🏷️ Auto Tag'}
                 </button>
              </div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="portrait, neon, 8k..."
              />
            </div>

             {/* Featured Image Checkbox */}
            <div className="flex items-center gap-2 pt-2">
                <input
                    type="checkbox"
                    id="create-featured"
                    name="isFeaturedImage"
                    checked={formData.isFeaturedImage}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="create-featured" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                    Show this image on Home Preview
                </label>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={() => setView('list')}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isProcessing}
                className="bg-primary hover:bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium transition-transform active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? 'Creating...' : 'Create Prompt'}
              </button>
            </div>
          </form>
        </div>
      ) : activeTab !== 'settings' && view === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stats</th>
                  {activeTab === 'client' && <th className="p-4">Author</th>}
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {displayedPrompts.map(prompt => (
                  <tr key={prompt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 relative">
                      <img src={prompt.imageUrl} alt="" className="w-12 h-12 rounded-md object-cover bg-gray-100 border border-gray-200 dark:border-gray-600" />
                      {prompt.isFeaturedImage && (
                          <div className="absolute top-2 left-2 -mt-1 -ml-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-800" title="Home Preview Image"></span>
                          </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {prompt.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">{prompt.promptText}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {prompt.category}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                      <div>{prompt.views} views</div>
                      <div>{prompt.copies} copies</div>
                    </td>
                    {activeTab === 'client' && (
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                            {prompt.authorName || 'Unknown'}
                        </td>
                    )}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                         <button 
                           onClick={() => handleEditClick(prompt)}
                           className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-transform hover:scale-105"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                           Edit
                         </button>
                         <button 
                           onClick={() => handleDeleteClick(prompt.id)}
                           className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-transform hover:scale-105"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                           Delete
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {displayedPrompts.length === 0 && (
                  <tr>
                    <td colSpan={activeTab === 'client' ? 6 : 5} className="p-8 text-center text-gray-500">
                      {isProcessing ? "Loading..." : (activeTab === 'admin' ? "No admin prompts found." : "No client submissions yet.")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Edit Modal */}
      {isEditModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           {/* ... existing edit modal code ... */}
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
             onClick={handleCancelEdit}
           ></div>
           
           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Edit Prompt</h2>
                    <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                 </div>

                 <form onSubmit={handleEditSubmit} className="space-y-6">
                    {/* Reuse Form Logic for Edit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image</label>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-dashed border-gray-400">
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-gray-400 text-xs">Preview</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20"
                            />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                            >
                            <option value={GenderCategory.MEN}>Men</option>
                            <option value={GenderCategory.WOMEN}>Women</option>
                            <option value={GenderCategory.COUPLE}>Couple</option>
                            </select>
                        </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prompt Text</label>
                        <button 
                            type="button" 
                            onClick={handleEnhancePrompt}
                            disabled={isLoadingAi || !formData.promptText}
                            className="text-xs flex items-center text-primary hover:text-indigo-600 disabled:opacity-50"
                        >
                            {isLoadingAi ? 'Thinking...' : '✨ AI Enhance'}
                        </button>
                      </div>
                      <textarea
                        name="promptText"
                        required
                        rows={4}
                        value={formData.promptText}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-mono text-sm"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                        <button 
                            type="button" 
                            onClick={handleAutoTag}
                            disabled={isLoadingAi || !formData.promptText}
                            className="text-xs flex items-center text-primary hover:text-indigo-600 disabled:opacity-50"
                        >
                            {isLoadingAi ? 'Generating...' : '🏷️ Auto Tag'}
                        </button>
                      </div>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>

                     {/* Featured Image Checkbox */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="edit-featured"
                            name="isFeaturedImage"
                            checked={formData.isFeaturedImage}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="edit-featured" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                            Show this image on Home Preview
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 mt-6">
                      <button 
                        type="button" 
                        onClick={handleCancelEdit}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isProcessing}
                        className="bg-primary hover:bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium transition-transform active:scale-95 shadow-md shadow-primary/25 disabled:opacity-50"
                      >
                        {isProcessing ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                 </form>
              </div>
           </div>
         </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
          ></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in border border-gray-200 dark:border-gray-700">
             <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confirm Delete</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Are you sure you want to delete this prompt? This action cannot be undone.
                </p>
                <div className="flex gap-3 w-full">
                   <button 
                     onClick={() => setIsDeleteModalOpen(false)}
                     disabled={isDeleting}
                     className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                   >
                     Cancel
                   </button>
                   <button 
                     onClick={executeDelete}
                     disabled={isDeleting}
                     className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg shadow-red-500/30 flex justify-center items-center disabled:opacity-70"
                   >
                     {isDeleting ? (
                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                     ) : (
                       "Yes, Delete"
                     )}
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
