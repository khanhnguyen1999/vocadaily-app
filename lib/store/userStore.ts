import { Language } from '@/constants/languages';
import { Level } from '@/constants/levels';
import { User } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isOnboarded: boolean;
  setUser: (user: User) => void;
  setLanguage: (language: Language) => void;
  setLevel: (level: Level) => void;
  setIsOnboarded: (isOnboarded: boolean) => void;
  reset: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isOnboarded: false,
      setUser: (user) => set({ user }),
      setLanguage: (language) => set((state) => ({
        user: state.user ? { ...state.user, language } : { language, level: 'A1' }
      })),
      setLevel: (level) => set((state) => ({
        user: state.user ? { ...state.user, level } : { language: 'english', level }
      })),
      setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
      reset: () => set({ user: null, isOnboarded: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);