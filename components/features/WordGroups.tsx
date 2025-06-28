import { GroupCard } from '@/components/ui/GroupCard';
import { colors } from '@/constants/colors';
import { groups } from '@/constants/groups';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface WordGroupsProps {
  onGroupPress: (groupId: string) => void;
}

export const WordGroups: React.FC<WordGroupsProps> = ({ onGroupPress }) => {
  const { words } = useVocabularyStore();

  // Calculate word counts per group
  const groupCounts = groups.map(group => {
    const wordsInGroup = words.filter(word => word.group === group.id);
    return {
      ...group,
      count: wordsInGroup.length,
      // Mock progress for now
      progress: Math.floor(Math.random() * 100)
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Groups</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {groupCounts.map((group) => (
          <GroupCard
            key={group.id}
            title={group.name}
            icon={group.icon}
            count={group.count}
            progress={group.progress}
            onPress={() => onGroupPress(group.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
});