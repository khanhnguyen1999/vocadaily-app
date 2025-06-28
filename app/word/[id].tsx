import { AudioPlayer } from '@/components/features/AudioPlayer';
import { Button } from '@/components/ui/Button';
import { WordCard } from '@/components/ui/WordCard';
import { colors } from '@/constants/colors';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function WordDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { words, addUserWord, getUserWordStatus } = useVocabularyStore();
  const word = words.find(w => w.id === id);
  
  const wordStatus = getUserWordStatus(id);
  
  const handleSaveWord = () => {
    addUserWord(id, 'saved');
  };

  const handleRemoveWord = () => {
    addUserWord(id, 'new');
  };

  if (!word) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Word not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: word.word }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WordCard word={word} showDefinition={false} />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Definition</Text>
          <Text style={styles.definition}>{word.definition}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pronunciation</Text>
          <AudioPlayer audioUrl={word.audioUSUrl} label="US Pronunciation" />
          <AudioPlayer audioUrl={word.audioUKUrl} label="UK Pronunciation" />
        </View>
        
        {word.examples.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examples</Text>
            {word.examples.map((example, index) => (
              <Text key={index} style={styles.example}>• {example}</Text>
            ))}
          </View>
        )}
        
        {word.synonyms && word.synonyms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Synonyms</Text>
            <View style={styles.synonymsContainer}>
              {word.synonyms.map((synonym, index) => (
                <View key={index} style={styles.synonymBadge}>
                  <Text style={styles.synonymText}>{synonym}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {wordStatus === 'saved' ? (
          <Button
            title="Remove from Favorites"
            variant="outline"
            onPress={handleRemoveWord}
            style={styles.saveButton}
          />
        ) : (
          <Button
            title="Save to Favorites"
            variant="primary"
            onPress={handleSaveWord}
            style={styles.saveButton}
          />
        )}
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
  notFoundText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  definition: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
  },
  example: {
    fontSize: 16,
    color: colors.text.primary,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 24,
  },
  synonymsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  synonymBadge: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  synonymText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 32,
  },
});