export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const levels: { id: Level; name: string; description: string }[] = [
  {
    id: 'A1',
    name: 'Beginner',
    description: 'Basic phrases and expressions for everyday situations',
  },
  {
    id: 'A2',
    name: 'Elementary',
    description: 'Simple sentences and frequent expressions related to areas of immediate relevance',
  },
  {
    id: 'B1',
    name: 'Intermediate',
    description: 'Main points of clear standard input on familiar matters regularly encountered',
  },
  {
    id: 'B2',
    name: 'Upper Intermediate',
    description: 'Complex text on both concrete and abstract topics',
  },
  {
    id: 'C1',
    name: 'Advanced',
    description: 'Understand a wide range of demanding, longer texts',
  },
  {
    id: 'C2',
    name: 'Proficient',
    description: 'Understand with ease virtually everything heard or read',
  },
];