export type Group = 
  | 'business' 
  | 'family' 
  | 'food' 
  | 'travel' 
  | 'technology' 
  | 'health' 
  | 'education' 
  | 'entertainment';

export const groups: { id: Group; name: string; icon: string }[] = [
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
  },
  {
    id: 'family',
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍽️',
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: '✈️',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🏥',
  },
  {
    id: 'education',
    name: 'Education',
    icon: '🎓',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
  },
];