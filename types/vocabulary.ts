import { Group } from '@/constants/groups';
import { Level } from '@/constants/levels';

export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'interjection';

export interface Word {
  id: string;
  word: string;
  level: Level;
  type: WordType;
  definition: string;
  phoneticUS: string;
  phoneticUK: string;
  audioUSUrl?: string;
  audioUKUrl?: string;
  examples: string[];
  synonyms?: string[];
  group: Group;
}

export type WordStatus = 'new' | 'known' | 'hard' | 'saved';

export interface UserWord {
  wordId: string;
  status: WordStatus;
  updatedAt: string;
}