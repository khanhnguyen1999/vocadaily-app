import { Language } from '@/constants/languages';
import { Level } from '@/constants/levels';

export interface User {
  id?: string;
  email?: string;
  language: Language;
  level: Level;
  name?: string;
}