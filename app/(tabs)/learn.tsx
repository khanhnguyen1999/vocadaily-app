import { Button } from '@/components/ui/Button';
import { FlashCard } from '@/components/ui/FlashCard';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/lib/store/userStore';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { Word, WordStatus } from '@/types/vocabulary';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function LearnScreen() {
  const { group } = useLocalSearchParams<{ group: string }>();
  const { user } = useUserStore();
  const { addUserWord, words, fetchWords } = useVocabularyStore();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      let wordsToLearn = words;
      if (group) {
        wordsToLearn = words.filter(word => word.group === group);
      } else if (user?.level) {
        wordsToLearn = words.filter(word => word.level === user.level);
      }
      setFilteredWords(wordsToLearn);
      setLoading(false);
    }
  }, [words, group, user?.level]);

  const handleStatusChange = (wordId: string, status: WordStatus) => {
    addUserWord(wordId, status);
    
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of words
      router.push('/');
    }
  };

  const handleViewDetails = (wordId: string) => {
    router.push(`/word/${wordId}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (words.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No words available for this selection.</Text>
        <Button 
          title="Go Back" 
          onPress={() => router.back()} 
          style={styles.emptyButton}
        />
      </SafeAreaView>
    );
  }

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {group ? `${group.charAt(0).toUpperCase() + group.slice(1)} Words` : 'Learn New Words'}
        </Text>
        <Text style={styles.subtitle}>
          {currentIndex + 1} of {words.length}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      
      <View style={styles.cardContainer}>
        <FlashCard 
          word={currentWord}
          onStatusChange={handleStatusChange}
          onDetails={handleViewDetails}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    width: 200,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.card,
    borderRadius: 2,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});