import { colors } from '@/constants/colors';
import { Word, WordStatus } from '@/types/vocabulary';
import { playAudio } from '@/utils/audio';
import { Info, Play, ThumbsDown, ThumbsUp } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface FlashCardProps {
  word: Word;
  onStatusChange: (wordId: string, status: WordStatus) => void;
  onDetails: (wordId: string) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export const FlashCard: React.FC<FlashCardProps> = ({ 
  word, 
  onStatusChange,
  onDetails
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    if (Platform.OS === 'web') {
      setIsFlipped(!isFlipped);
      return;
    }
    
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = Platform.OS !== 'web' ? {
    transform: [{ rotateY: frontInterpolate }],
  } : {};

  const backAnimatedStyle = Platform.OS !== 'web' ? {
    transform: [{ rotateY: backInterpolate }],
  } : {};

  const handlePlayAudio = (url?: string) => {
    if (url) {
      playAudio(url);
    }
  };

  const renderFront = () => (
    <View style={styles.cardContent}>
      <Text style={styles.definitionTitle}>Definition</Text>
      <Text style={styles.definition}>{word.definition}</Text>
      <Text style={styles.tapToFlip}>Tap to reveal the word</Text>
    </View>
  );

  const renderBack = () => (
    <View style={styles.cardContent}>
      <Text style={styles.word}>{word.word}</Text>
      <View style={styles.typeContainer}>
        <Text style={styles.type}>{word.type}</Text>
      </View>
      
      <View style={styles.phoneticContainer}>
        <View style={styles.phoneticRow}>
          <Text style={styles.phoneticLabel}>US</Text>
          <Text style={styles.phonetic}>{word.phoneticUS}</Text>
          {word.audioUSUrl && (
            <TouchableOpacity 
              onPress={() => handlePlayAudio(word.audioUSUrl)}
              style={styles.audioButton}
            >
              <Play size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.phoneticRow}>
          <Text style={styles.phoneticLabel}>UK</Text>
          <Text style={styles.phonetic}>{word.phoneticUK}</Text>
          {word.audioUKUrl && (
            <TouchableOpacity 
              onPress={() => handlePlayAudio(word.audioUKUrl)}
              style={styles.audioButton}
            >
              <Play size={18} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {word.examples.length > 0 && (
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesTitle}>Example:</Text>
          <Text style={styles.example}>{word.examples[0]}</Text>
        </View>
      )}
    </View>
  );

  // For web, use simple conditional rendering
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={[styles.card, styles.cardShadow]} 
          onPress={flipCard}
          activeOpacity={0.9}
        >
          {isFlipped ? renderBack() : renderFront()}
        </TouchableOpacity>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.hardButton]}
            onPress={() => onStatusChange(word.id, 'hard')}
          >
            <ThumbsDown size={24} color={colors.error} />
            <Text style={styles.actionText}>Review</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.detailsButton]}
            onPress={() => onDetails(word.id)}
          >
            <Info size={24} color={colors.primary} />
            <Text style={styles.actionText}>Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.knownButton]}
            onPress={() => onStatusChange(word.id, 'known')}
          >
            <ThumbsUp size={24} color={colors.success} />
            <Text style={styles.actionText}>I Know</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // For native platforms, use animated flip
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={flipCard}
      >
        <Animated.View style={[styles.card, styles.cardShadow, frontAnimatedStyle, { opacity: isFlipped ? 0 : 1, zIndex: isFlipped ? 0 : 1 }]}>
          {renderFront()}
        </Animated.View>
        
        <Animated.View style={[styles.card, styles.cardShadow, styles.cardBack, backAnimatedStyle, { opacity: isFlipped ? 1 : 0, zIndex: isFlipped ? 1 : 0 }]}>
          {renderBack()}
        </Animated.View>
      </TouchableOpacity>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.hardButton]}
          onPress={() => onStatusChange(word.id, 'hard')}
        >
          <ThumbsDown size={24} color={colors.error} />
          <Text style={styles.actionText}>Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.detailsButton]}
          onPress={() => onDetails(word.id)}
        >
          <Info size={24} color={colors.primary} />
          <Text style={styles.actionText}>Details</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.knownButton]}
          onPress={() => onStatusChange(word.id, 'known')}
        >
          <ThumbsUp size={24} color={colors.success} />
          <Text style={styles.actionText}>I Know</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 350,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    backfaceVisibility: 'hidden',
  },
  cardShadow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  definitionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  definition: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 32,
  },
  tapToFlip: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
  word: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  typeContainer: {
    alignSelf: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 24,
  },
  type: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  phoneticContainer: {
    marginBottom: 24,
  },
  phoneticRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  phoneticLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 8,
    fontWeight: '600',
  },
  phonetic: {
    fontSize: 16,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  audioButton: {
    marginLeft: 8,
    padding: 4,
  },
  examplesContainer: {
    marginTop: 8,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  example: {
    fontSize: 16,
    color: colors.text.primary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CARD_WIDTH,
    marginTop: 24,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
  },
  hardButton: {
    backgroundColor: '#FEE2E2',
  },
  knownButton: {
    backgroundColor: '#DCFCE7',
  },
  detailsButton: {
    backgroundColor: '#E0F2FE',
  },
  actionText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});