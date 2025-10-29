const API_URLS = {
  games: 'https://functions.poehali.dev/01139e2b-28bb-4f79-8ff4-3b9fe93267ff',
  achievements: 'https://functions.poehali.dev/838bbce7-490d-4e54-a708-1b8bc363695b',
  auth: 'https://functions.poehali.dev/60309325-0775-48a2-9b54-21a523496e4b',
  mods: 'https://functions.poehali.dev/e0be7e73-ba04-46dc-a1f8-cce5b9871d41',
};

export interface User {
  id: number;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  mods_count: number;
}

export interface Mod {
  id: number;
  title: string;
  slug: string;
  description: string;
  game_id: number;
  game_title: string;
  user_id: number;
  author_username: string;
  category: string;
  image_url: string;
  download_url: string;
  downloads_count: number;
  rating: number;
  version: string;
  created_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned?: boolean;
  earned_at?: string;
}

export const api = {
  auth: {
    register: async (username: string, email: string, password: string) => {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'register', username, email, password }),
      });
      return response.json();
    },
    
    login: async (email: string, password: string) => {
      const response = await fetch(API_URLS.auth, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      return response.json();
    },
  },

  games: {
    getAll: async (): Promise<{ games: Game[] }> => {
      const response = await fetch(API_URLS.games);
      return response.json();
    },
  },

  mods: {
    getAll: async (params?: { game_id?: number; category?: string; sort?: string; limit?: number }): Promise<{ mods: Mod[] }> => {
      const searchParams = new URLSearchParams();
      if (params?.game_id) searchParams.append('game_id', params.game_id.toString());
      if (params?.category) searchParams.append('category', params.category);
      if (params?.sort) searchParams.append('sort', params.sort);
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      
      const url = `${API_URLS.mods}${searchParams.toString() ? `?${searchParams}` : ''}`;
      const response = await fetch(url);
      return response.json();
    },

    create: async (modData: Partial<Mod>) => {
      const response = await fetch(API_URLS.mods, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modData),
      });
      return response.json();
    },

    incrementDownloads: async (modId: number) => {
      const response = await fetch(API_URLS.mods, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.dumps({ action: 'increment_downloads', mod_id: modId }),
      });
      return response.json();
    },
  },

  achievements: {
    getAll: async (userId?: number): Promise<{ achievements: Achievement[] }> => {
      const url = userId ? `${API_URLS.achievements}?user_id=${userId}` : API_URLS.achievements;
      const response = await fetch(url);
      return response.json();
    },

    award: async (userId: number, achievementId: number) => {
      const response = await fetch(API_URLS.achievements, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, achievement_id: achievementId }),
      });
      return response.json();
    },
  },
};
