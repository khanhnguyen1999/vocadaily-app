import { UserWord, Word, WordStatus } from '@/types/vocabulary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface VocabularyState {
  userWords: UserWord[];
  words: Word[];
  addUserWord: (wordId: string, status: WordStatus) => void;
  updateWordStatus: (wordId: string, status: WordStatus) => void;
  getUserWordStatus: (wordId: string) => WordStatus | null;
  getWordsByStatus: (status: WordStatus) => string[];
  fetchWords: () => Promise<void>;
  reset: () => void;
}

export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set, get) => ({
      userWords: [],
      words: [],
      addUserWord: (wordId, status) => set((state) => {
        // Check if word already exists
        const existingWordIndex = state.userWords.findIndex(w => w.wordId === wordId);
        if (existingWordIndex !== -1) {
          // Update existing word
          const updatedWords = [...state.userWords];
          updatedWords[existingWordIndex] = {
            ...updatedWords[existingWordIndex],
            status,
            updatedAt: new Date().toISOString(),
          };
          return { userWords: updatedWords };
        }
        // Add new word
        return {
          userWords: [
            ...state.userWords,
            {
              wordId,
              status,
              updatedAt: new Date().toISOString(),
            },
          ],
        };
      }),
      updateWordStatus: (wordId, status) => set((state) => {
        const existingWordIndex = state.userWords.findIndex(w => w.wordId === wordId);
        if (existingWordIndex !== -1) {
          const updatedWords = [...state.userWords];
          updatedWords[existingWordIndex] = {
            ...updatedWords[existingWordIndex],
            status,
            updatedAt: new Date().toISOString(),
          };
          return { userWords: updatedWords };
        }
        return state;
      }),
      getUserWordStatus: (wordId) => {
        const userWord = get().userWords.find(w => w.wordId === wordId);
        return userWord ? userWord.status : null;
      },
      getWordsByStatus: (status) => {
        return get().userWords
          .filter(w => w.status === status)
          .map(w => w.wordId);
      },
      fetchWords: async () => {
        const { data, error } = await supabase.from('words').select('*');
        if (error) {
          console.error('Error fetching words:', error);
        } else {
          set({ words: data });
        }
      },
      reset: () => set({ userWords: [], words: [] }),
    }),
    {
      name: 'vocabulary-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);