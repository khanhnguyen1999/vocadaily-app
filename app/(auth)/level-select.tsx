import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { Level, levels } from '@/constants/levels';
import { useUserStore } from '@/lib/store/userStore';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LevelSelectScreen() {
  const { user, setLevel, setIsOnboarded } = useUserStore();
  const [selectedLevel, setSelectedLevel] = React.useState<Level | null>(
    user?.level || null
  );

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      setLevel(selectedLevel);
      setIsOnboarded(true);
      router.replace('/(tabs)');
    }
  };

  const renderLevelItem = ({ item }: { item: typeof levels[0] }) => (
    <TouchableOpacity
      style={[
        styles.levelCard,
        selectedLevel === item.id && styles.selectedLevelCard,
      ]}
      onPress={() => handleLevelSelect(item.id)}
    >
      <View style={styles.levelHeader}>
        <Text style={styles.levelId}>{item.id}</Text>
        <Text style={styles.levelName}>{item.name}</Text>
      </View>
      <Text style={styles.levelDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What&apos;s your English level?</Text>
          <Text style={styles.subtitle}>
            Well personalize your vocabulary based on your current level
          </Text>
        </View>
        
        <FlatList
          data={levels}
          renderItem={renderLevelItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.levelList}
        />
        
        <Button
          title="Start Learning"
          onPress={handleContinue}
          disabled={!selectedLevel}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  levelList: {
    flexGrow: 1,
  },
  levelCard: {
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedLevelCard: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelId: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginRight: 8,
  },
  levelName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  levelDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
  },
});