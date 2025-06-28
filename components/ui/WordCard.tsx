import { colors } from '@/constants/colors';
import { Word } from '@/types/vocabulary';
import { playAudio } from '@/utils/audio';
import { Play } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface WordCardProps {
  word: Word;
  onPress?: () => void;
  showDefinition?: boolean;
}

export const WordCard: React.FC<WordCardProps> = ({ 
  word, 
  onPress,
  showDefinition = true
}) => {
  const handlePlayAudio = (url?: string) => {
    if (url) {
      playAudio(url);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.word}>{word.word}</Text>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{word.type}</Text>
        </View>
      </View>
      
      <View style={styles.phoneticContainer}>
        <View style={styles.phoneticItem}>
          <Text style={styles.phoneticLabel}>US</Text>
          <Text style={styles.phonetic}>{word.phoneticUS}</Text>
          {word.audioUSUrl && (
            <TouchableOpacity 
              onPress={() => handlePlayAudio(word.audioUSUrl)}
              style={styles.audioButton}
            >
              <Play size={16} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.phoneticItem}>
          <Text style={styles.phoneticLabel}>UK</Text>
          <Text style={styles.phonetic}>{word.phoneticUK}</Text>
          {word.audioUKUrl && (
            <TouchableOpacity 
              onPress={() => handlePlayAudio(word.audioUKUrl)}
              style={styles.audioButton}
            >
              <Play size={16} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {showDefinition && (
        <View style={styles.definitionContainer}>
          <Text style={styles.definition}>{word.definition}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  word: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  typeContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  type: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  phoneticContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  phoneticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  phoneticLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginRight: 4,
  },
  phonetic: {
    fontSize: 14,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  audioButton: {
    marginLeft: 4,
  },
  definitionContainer: {
    marginTop: 8,
  },
  definition: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
  },
});