import { Button } from '@/components/ui/Button';
import { SubscriptionCard } from '@/components/ui/SubscriptionCard';
import { colors } from '@/constants/colors';
import { supabase } from '@/lib/supabase';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

type SubscriptionPlan = 'monthly' | 'quarterly' | 'yearly' | null;

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(null);
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
  };
  
  const handleSubscribe = async () => {
    if (!selectedPlan) {
      Alert.alert("Error", "Please select a subscription plan");
      return;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Error", "You must be logged in to subscribe.");
      return;
    }

    // Here you would typically call a Supabase Edge Function
    // to create a checkout session with a payment provider like Stripe.
    // For this example, we'll just simulate the process.
    Alert.alert(
      "Subscription",
      `You have subscribed to the ${selectedPlan} plan.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Premium Subscription" }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Upgrade to Premium</Text>
          <Text style={styles.subtitle}>
            Get unlimited access to all vocabulary and features
          </Text>
        </View>
        
        <SubscriptionCard
          title="Monthly"
          price="$4.99"
          duration="month"
          features={[
            "Unlimited words and definitions",
            "Audio pronunciation",
            "Personalized learning path",
            "No ads"
          ]}
          isSelected={selectedPlan === 'monthly'}
          onSelect={() => handleSelectPlan('monthly')}
        />
        
        <SubscriptionCard
          title="Quarterly"
          price="$11.99"
          duration="3 months"
          features={[
            "All monthly features",
            "Save 20% compared to monthly",
            "Offline mode",
            "Priority support"
          ]}
          isPopular={true}
          isSelected={selectedPlan === 'quarterly'}
          onSelect={() => handleSelectPlan('quarterly')}
        />
        
        <SubscriptionCard
          title="Yearly"
          price="$39.99"
          duration="year"
          features={[
            "All quarterly features",
            "Save 33% compared to monthly",
            "Advanced statistics",
            "Export progress reports"
          ]}
          isSelected={selectedPlan === 'yearly'}
          onSelect={() => handleSelectPlan('yearly')}
        />
        
        <Button
          title="Subscribe Now"
          onPress={handleSubscribe}
          disabled={!selectedPlan}
          style={styles.subscribeButton}
        />
        
        <Text style={styles.termsText}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          You can cancel your subscription anytime.
        </Text>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  subscribeButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  termsText: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 18,
  },
});