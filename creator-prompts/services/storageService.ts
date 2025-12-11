import { PromptItem, GenderCategory, ClientUser, AdminConfig } from '../types';

// ==========================================
// 🔥 FIREBASE CONFIGURATION
// ==========================================
// Firebase imports have been removed to resolve build errors.
// The app will function using LocalStorage (Async Mode).

let db: any = null;

const DB_KEY = 'creator_prompts_persistent_db';
const CLIENTS_DB_KEY = 'creator_prompts_clients_db';
const ADMIN_CONFIG_KEY = 'creator_prompts_admin_config';

// Default Seed Data
const INITIAL_DATA: PromptItem[] = [
  {
    id: '1',
    title: 'Prompt #1',
    promptText: 'A Man with messy hair, swag expression, head slightly tilted. He is wearing a crisp, elegant sage black suit and open button black silk shirt(blazer and fit trouser) with one hand casually in his pocket. Solid, vibrant red background. Clean, minimal, soft aesthetic. Smooth, well-lit skin. Subtle, moody lighting and gentle shadows for a cinematic color tone',
    imageUrl: 'https://image2url.com/images/1765389791239-157ad408-1e1c-473b-a578-db964ce61920.jpeg',
    category: GenderCategory.MEN,
    tags: [],
    createdAt: Date.now(),
    views: 120,
    copies: 45,
    isFeaturedImage: true,
    source: 'admin'
  },
  {
    id: '2',
    title: 'Prompt #2',
    promptText: 'Using this picture, create in a men in a black silk shirt and black trousers posing against a dramatic circular spotlight backdrop. He wears a ring, gold watch sleave roll showing his face with slightly tilted chin gracefully. The image is in black and white, with cinematic lighting and deep shadows, creating a timeless, vintage-inspired fashion editorial look 100% accurate same face with same be',
    imageUrl: 'https://files.catbox.moe/qm33y9.jpg',
    category: GenderCategory.MEN,
    tags: [],
    createdAt: Date.now(),
    views: 85,
    copies: 30,
    source: 'admin'
  },
  {
    id: '3',
    title: 'Prompt #3',
    promptText: 'Create a retro vintage grainy but bright image of the reference picture but draped in a perfect red wine color Pinteresty aesthetic retro shirt with white pant and holding a rose flower in hands. It must feel like a 90s movie and romanticising windy environment. The boy is standing against a solid wall deep shadows and contrast drama, creating a mysterious and artistic atmosphere where the lighting is warm with a golden tones of evoking a sunset or golden hour glow. The background is minimalist and slightly textured. The expression on her face is moody, calm yet happy and introspective. Use the face from the uploaded reference image and preserve the same facial features do not alter the face.',
    imageUrl: 'https://files.catbox.moe/ezju5l.jpg',
    category: GenderCategory.MEN,
    tags: [],
    createdAt: Date.now(),
    views: 200,
    copies: 90,
    source: 'admin'
  },
  {
    id: '4',
    title: 'Prompt #4',
    promptText: 'Take the face from the attached reference photo exactly 100% the same (do not alter his facial features, keep his identity intact). A cinematic, moody photograph of a young man standing in a lush green field of tall grass under a cloudy, overcast sky. He is wearing a loose, white button-up shirt and white trousers. His posture is expressive and dramatic, leaning slightly backward with one arm outstretched and palm open, as if embracing the wind or the moment. His head is tilted back, eyes closed, and he is wearing large, over-ear silver headphones, giving a sense of calm and emotional release. The perspective is slightly low-angle, enhancing the dramatic, immersive atmosphere.',
    imageUrl: 'https://files.catbox.moe/fv8adw.jpg',
    category: GenderCategory.MEN,
    tags: [],
    createdAt: Date.now(),
    views: 200,
    copies: 90,
    source: 'admin'
  },
  {
    id: '5',
    title: 'Prompt #5',
    promptText: 'Dreamy cinematic editorial photography of a young man based from refference photo, medium shot (half body). Subject placed on the right side of the frame, his body facing away from the camera but his face turning back looking directly into the lens. Outfit: sage green linen shirt, subtle botanical tone. Foreground: from the center to the left side of the frame fully covered by soft blurred aesthetic sage Dusty Miller flower, creating an artistic natural frame.',
    imageUrl: 'https://files.catbox.moe/lj97qm.jpg',
    category: GenderCategory.MEN,
    tags: [],
    createdAt: Date.now(),
    views: 200,
    copies: 90,
    source: 'admin'
  },
  {
    id: '6',
    title: 'Prompt #6',
    promptText: 'Create a retro vintage rainy, grainy but white image of the reference picture-it must feel like a 90s curly wet hair baddie with a small flower tuck visible into her curls and romanticizing windy and rainy environment. The girl is standing with eyes closed and sassy look creating a mysterious and artistic atmosphere where the lighting is warm with golden tones of evoking a sunset. The background is minimalist and slightly textured; the expression on her face is moody, calm yet happy and introspective. Use the face from the uploaded reference image and preserve the same facial features - do not alter the face.',
    imageUrl: 'https://files.catbox.moe/p6pzop.jpg',
    category: GenderCategory.MEN,
    tags: [],
    createdAt: Date.now(),
    views: 200,
    copies: 90,
    source: 'admin'
  }
];

// ==========================================
// 🛠️ INTERNAL HELPERS (LOCAL FALLBACK)
// ==========================================

const loadFromLocal = (key: string): any | null => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) { return null; }
};

const saveToLocal = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) { console.error("LocalStorage Save Error", error); }
};

// ==========================================
// 🔐 AUTHENTICATION
// ==========================================

export const initAdminConfig = (): void => {
  const existingConfig = loadFromLocal(ADMIN_CONFIG_KEY);
  if (!existingConfig) {
    const defaultConfig: AdminConfig = { userId: 'Mohan5942', password: 'Mohan@20452' };
    saveToLocal(ADMIN_CONFIG_KEY, defaultConfig);
  }
};

export const verifyAdminCredentials = (userId: string, password: string): boolean => {
  initAdminConfig();
  const config = loadFromLocal(ADMIN_CONFIG_KEY) as AdminConfig;
  return config.userId === userId && config.password === password;
};

export const updateAdminCredentials = (newConfig: AdminConfig): void => {
  saveToLocal(ADMIN_CONFIG_KEY, newConfig);
};

// Helper: Check if user is admin (client-side guard)
const isAdmin = (): boolean => {
  return sessionStorage.getItem('isAdminAuthenticated') === 'true';
};

// ==========================================
// 🌍 PUBLIC API (ASYNC)
// ==========================================

/**
 * Fetch all prompts.
 * Priority: Firebase -> LocalStorage -> Seed
 */
export const getPrompts = async (): Promise<PromptItem[]> => {
  // 1. Try Firebase (Disabled)
  if (db) {
    return [];
  }

  // 2. Fallback to LocalStorage (Simulated Async)
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedData = loadFromLocal(DB_KEY);
      if (storedData === null) {
        saveToLocal(DB_KEY, INITIAL_DATA);
        resolve(INITIAL_DATA);
      } else {
        // Migration logic
        const migrated = (storedData as PromptItem[]).map(item => ({
          ...item,
          isFeaturedImage: item.isFeaturedImage ?? false,
          source: item.source ?? 'admin',
          views: item.views ?? 0,
          copies: item.copies ?? 0,
          tags: Array.isArray(item.tags) ? item.tags : []
        }));
        resolve(migrated);
      }
    }, 300); // Simulate network delay
  });
};

export const getFeaturedPrompt = async (): Promise<PromptItem | undefined> => {
  const prompts = await getPrompts();
  return prompts.find(p => p.isFeaturedImage === true);
};

// ==========================================
// 🔒 PROTECTED API (WRITE Ops)
// ==========================================

export const savePrompt = async (prompt: PromptItem): Promise<void> => {
  // Access Control check
  if (prompt.source === 'admin' && !isAdmin()) {
    throw new Error("Unauthorized: Admin access required.");
  }

  // 1. Firebase Save (Disabled)
  if (db) {
    return;
  }

  // 2. LocalStorage Save
  return new Promise((resolve) => {
    setTimeout(() => {
      let prompts = loadFromLocal(DB_KEY) || INITIAL_DATA;
      
      // Feature Exclusivity
      if (prompt.isFeaturedImage) {
        prompts = prompts.map((p: PromptItem) => ({
          ...p,
          isFeaturedImage: p.id === prompt.id ? true : false
        }));
      }

      const index = prompts.findIndex((p: PromptItem) => p.id === prompt.id);
      if (index >= 0) prompts[index] = prompt;
      else prompts.unshift(prompt); // Add new

      saveToLocal(DB_KEY, prompts);
      resolve();
    }, 400);
  });
};

export const deletePrompt = async (id: string): Promise<void> => {
  if (!isAdmin()) throw new Error("Unauthorized");

  if (db) {
    return;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const prompts = loadFromLocal(DB_KEY) || [];
      const updated = prompts.filter((p: PromptItem) => p.id !== id);
      saveToLocal(DB_KEY, updated);
      resolve();
    }, 400);
  });
};

export const incrementCopyCount = async (id: string): Promise<void> => {
  // Public write operation (increment view/copy)
  if (db) {
    return;
  }

  const prompts = loadFromLocal(DB_KEY) || [];
  const index = prompts.findIndex((p: PromptItem) => p.id === id);
  if (index >= 0) {
    prompts[index].copies = (prompts[index].copies || 0) + 1;
    saveToLocal(DB_KEY, prompts);
  }
};

// ==========================================
// 👥 CLIENTS API
// ==========================================

export const saveClientUser = async (user: ClientUser): Promise<void> => {
  if (db) {
    return;
  }
  
  const clients = loadFromLocal(CLIENTS_DB_KEY) || [];
  clients.push(user);
  saveToLocal(CLIENTS_DB_KEY, clients);
};

export const getClientUserByEmail = async (email: string): Promise<ClientUser | undefined> => {
  if (db) {
    // Implement query logic
    return undefined; // Mock return
  }
  const clients = loadFromLocal(CLIENTS_DB_KEY) || [];
  return clients.find((c: ClientUser) => c.email === email);
};