import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { levels } from '@/constants/levels';
import { useUserStore } from '@/lib/store/userStore';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { user, setLevel, reset: resetUser } = useUserStore();
  const { reset: resetVocabulary } = useVocabularyStore();
  
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  
  const handleLevelChange = (level: string) => {
    setLevel(level as any);
  };
  
  const handleResetProgress = () => {
    Alert.alert(
      "Reset Progress",
      "Are you sure you want to reset all your progress? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Reset", 
          style: "destructive",
          onPress: () => {
            resetVocabulary();
            Alert.alert("Success", "Your progress has been reset.");
          }
        }
      ]
    );
  };
  
  const handleSubscription = () => {
    router.push('/subscription');
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => {
            resetUser();
            resetVocabulary();
            router.replace('/welcome');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User</Text>
          <Text style={styles.cardText}>Learner</Text>
        </View>
        
        <Text style={styles.sectionTitle}>Learning Preferences</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Language</Text>
          <Text style={styles.cardText}>English</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Level</Text>
          <View style={styles.levelContainer}>
            {levels.map((level) => (
              <Button
                key={level.id}
                title={level.id}
                variant={user?.level === level.id ? 'primary' : 'outline'}
                size="small"
                style={styles.levelButton}
                onPress={() => handleLevelChange(level.id)}
              />
            ))}
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
          
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Daily Reminder</Text>
            <Switch
              value={dailyReminder}
              onValueChange={setDailyReminder}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Plan</Text>
          <Text style={styles.cardText}>Free</Text>
          <Button
            title="Upgrade to Premium"
            variant="outline"
            style={styles.upgradeButton}
            onPress={handleSubscription}
          />
        </View>
        
        <View style={styles.actionsContainer}>
          <Button
            title="Reset Progress"
            variant="outline"
            style={styles.actionButton}
            onPress={handleResetProgress}
          />
          
          <Button
            title="Log Out"
            variant="primary"
            style={styles.actionButton}
            onPress={handleLogout}
          />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  levelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  levelButton: {
    marginRight: 8,
    marginBottom: 8,
    minWidth: 50,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text.primary,
  },
  upgradeButton: {
    marginTop: 16,
  },
  actionsContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  actionButton: {
    marginBottom: 12,
  },
});