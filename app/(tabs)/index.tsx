import { FeaturedWord } from '@/components/features/FeaturedWord';
import { WordGroups } from '@/components/features/WordGroups';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/lib/store/userStore';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { user, isOnboarded } = useUserStore();
  const { getWordsByStatus, words, fetchWords } = useVocabularyStore();
  const [featuredWord, setFeaturedWord] = useState(null);
  const [stats, setStats] = useState({
    learned: 0,
    streak: 0,
    quizScore: 0
  });

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      setFeaturedWord(words[randomIndex]);
    }
  }, [words]);

  useEffect(() => {
    // If user is not onboarded, redirect to welcome screen
    if (!isOnboarded) {
      router.replace('/welcome');
    }
    
    // Calculate stats
    const knownWords = getWordsByStatus('known').length;
    // For demo purposes, we'll set some placeholder values
    setStats({
      learned: knownWords,
      streak: Math.floor(Math.random() * 7), // Random streak between 0-7
      quizScore: Math.floor(Math.random() * 100) // Random score between 0-100
    });
  }, [isOnboarded, getWordsByStatus]);

  const handleViewWordDetails = (wordId: string) => {
    router.push(`/word/${wordId}`);
  };

  const handleGroupPress = (groupId: string) => {
    router.push({
      pathname: '/learn',
      params: { group: groupId }
    });
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Learner</Text>
          <Text style={styles.levelInfo}>
            Level: <Text style={styles.levelBadge}>{user.level}</Text>
          </Text>
        </View>
        
        <FeaturedWord 
          word={featuredWord} 
          onViewDetails={handleViewWordDetails} 
        />
        
        <WordGroups onGroupPress={handleGroupPress} />
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.learned}</Text>
              <Text style={styles.statLabel}>Words Learned</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.streak}</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.quizScore}</Text>
              <Text style={styles.statLabel}>Quiz Score</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  levelInfo: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  levelBadge: {
    fontWeight: '600',
    color: colors.primary,
  },
  statsContainer: {
    marginVertical: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});