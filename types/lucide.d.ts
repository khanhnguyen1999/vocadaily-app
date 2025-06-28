// types/lucide.d.ts
import 'lucide-react-native';

declare module 'lucide-react-native' {
  interface LucideProps {
    color?: string; // Add color as an accepted prop
    style?: React.CSSProperties;
  }
}
