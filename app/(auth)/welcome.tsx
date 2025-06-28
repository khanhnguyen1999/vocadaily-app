import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/lib/store/userStore';
import { router } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const { isOnboarded, setIsOnboarded } = useUserStore();

  React.useEffect(() => {
    // If user is already onboarded, redirect to main app
    if (isOnboarded) {
      router.replace('/(tabs)');
    }
  }, [isOnboarded]);

  const handleGetStarted = () => {
    router.push('/language-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop' }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Expand Your Vocabulary</Text>
          <Text style={styles.subtitle}>
            Learn new words every day and improve your language skills with our personalized approach
          </Text>
        </View>
        
        <Button 
          title="Get Started" 
          onPress={handleGetStarted}
          size="large"
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
    justifyContent: 'space-between',
    padding: 24,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    width: '100%',
  },
});