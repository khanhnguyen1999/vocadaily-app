import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { WordCard } from '@/components/ui/WordCard';
import { colors } from '@/constants/colors';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { Word } from '@/types/vocabulary';
import { router } from 'expo-router';
import { BookmarkCheck } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SavedWordsScreen() {
  const { getWordsByStatus, words, fetchWords } = useVocabularyStore();
  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const savedWordIds = getWordsByStatus('saved');
      const saved = words.filter(word => savedWordIds.includes(word.id));
      setSavedWords(saved);
      setFilteredWords(saved);
    }
  }, [words, getWordsByStatus]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredWords(savedWords);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = savedWords.filter(
        word => 
          word.word.toLowerCase().includes(query) || 
          word.definition.toLowerCase().includes(query)
      );
      setFilteredWords(filtered);
    }
  }, [searchQuery, savedWords]);

  const handleWordPress = (wordId: string) => {
    router.push(`/word/${wordId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredWords(savedWords);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <BookmarkCheck size={64} color={colors.text.tertiary} />
      <Text style={styles.emptyTitle}>No saved words yet</Text>
      <Text style={styles.emptyText}>
        Words you save will appear here for quick access
      </Text>
      <Button 
        title="Explore Words" 
        onPress={() => router.push('/')}
        style={styles.exploreButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Words</Text>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search saved words..."
          onClear={handleClearSearch}
        />
      </View>
      
      {savedWords.length > 0 ? (
        <FlatList
          data={filteredWords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WordCard 
              word={item} 
              onPress={() => handleWordPress(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.noResultsText}>
              No words match your search
            </Text>
          )}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  exploreButton: {
    width: 200,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 32,
  },
});