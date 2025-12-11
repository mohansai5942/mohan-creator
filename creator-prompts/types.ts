export enum GenderCategory {
  MEN = 'Men',
  WOMEN = 'Women',
  COUPLE = 'Couple',
  ALL = 'All'
}

export interface PromptItem {
  id: string;
  title: string;
  promptText: string;
  imageUrl: string;
  category: GenderCategory;
  tags: string[];
  createdAt: number;
  views: number;
  copies: number;
  isFeaturedImage?: boolean;
  source: 'admin' | 'client'; // New field to distinguish origin
  authorName?: string; // Optional: to track which client uploaded it
}

export interface ClientUser {
  id: string;
  fullName: string;
  email: string;
  instagramId: string;
  joinedAt: number;
}

export interface AdminConfig {
  userId: string;
  password: string; // In a real app, this should be hashed
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}

export type SortOption = 'newest' | 'popular';