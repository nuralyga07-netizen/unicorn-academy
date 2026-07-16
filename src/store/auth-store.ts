import { create } from 'zustand';
import type { User } from '@/types';

interface AuthState {
  /** Currently authenticated user, or null if not logged in */
  user: User | null;
  /** Whether auth state is being loaded (e.g., initial session check) */
  isLoading: boolean;
  /** Whether authentication has been checked at least once */
  isInitialized: boolean;

  /** Set the authenticated user */
  setUser: (user: User | null) => void;
  /** Login: set user and mark as initialized */
  login: (user: User) => void;
  /** Logout: clear user state */
  logout: () => void;
  /** Set loading state */
  setLoading: (loading: boolean) => void;
  /** Reset store to defaults */
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isInitialized: false,

  setUser: (user) =>
    set({
      user,
      isLoading: false,
      isInitialized: true,
    }),

  login: (user) =>
    set({
      user,
      isLoading: false,
      isInitialized: true,
    }),

  logout: () =>
    set({
      user: null,
      isLoading: false,
      isInitialized: true,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () =>
    set({
      user: null,
      isLoading: true,
      isInitialized: false,
    }),
}));
