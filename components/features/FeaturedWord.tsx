import { colors } from '@/constants/colors';
import { Word } from '@/types/vocabulary';
import { playAudio } from '@/utils/audio';
import { ArrowRight, Play } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FeaturedWordProps {
  word: Word;
  onViewDetails: (wordId: string) => void;
}

export const FeaturedWord: React.FC<FeaturedWordProps> = ({ 
  word,
  onViewDetails
}) => {
  const handlePlayAudio = (url?: string) => {
    if (url) {
      playAudio(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Word</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{word.level}</Text>
        </View>
      </View>
      
      <Text style={styles.word}>{word.word}</Text>
      
      <View style={styles.typeContainer}>
        <Text style={styles.type}>{word.type}</Text>
      </View>
      
      <Text style={styles.definition}>{word.definition}</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.audioButton}
          onPress={() => handlePlayAudio(word.audioUSUrl)}
        >
          <Play size={20} color={colors.text.primary} />
          <Text style={styles.audioText}>Listen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.detailsButton}
          onPress={() => onViewDetails(word.id)}
        >
          <Text style={styles.detailsText}>View Details</Text>
          <ArrowRight size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  levelBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelText: {
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 12,
  },
  word: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  typeContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  type: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  definition: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  audioText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 4,
  },
});