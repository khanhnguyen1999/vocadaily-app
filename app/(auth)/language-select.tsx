import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { Language, languages } from '@/constants/languages';
import { useUserStore } from '@/lib/store/userStore';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageSelectScreen() {
  const { user, setLanguage } = useUserStore();
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language | null>(
    user?.language || null
  );

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      router.push('/level-select');
    }
  };

  const renderLanguageItem = ({ item }: { item: typeof languages[0] }) => (
    <TouchableOpacity
      style={[
        styles.languageCard,
        selectedLanguage === item.id && styles.selectedLanguageCard,
      ]}
      onPress={() => handleLanguageSelect(item.id)}
    >
      <Text style={styles.languageFlag}>{item.flag}</Text>
      <Text style={styles.languageName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Language</Text>
          <Text style={styles.subtitle}>
            Select the language you want to learn vocabulary for
          </Text>
        </View>
        
        <FlatList
          data={languages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.languageList}
        />
        
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedLanguage}
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
  languageList: {
    flexGrow: 1,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedLanguageCard: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  languageFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  button: {
    marginTop: 24,
  },
});