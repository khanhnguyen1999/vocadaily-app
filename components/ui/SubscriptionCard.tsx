import { colors } from '@/constants/colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SubscriptionCardProps {
  title: string;
  price: string;
  duration: string;
  features: string[];
  isPopular?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  duration,
  features,
  isPopular = false,
  isSelected = false,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isPopular && styles.popularContainer,
        isSelected && styles.selectedContainer,
      ]}
      onPress={onSelect}
      activeOpacity={0.8}
    >
      {isPopular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.duration}>/{duration}</Text>
      </View>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Text key={index} style={styles.feature}>• {feature}</Text>
        ))}
      </View>
      
      <View style={[styles.selectButton, isSelected && styles.selectedButton]}>
        <Text style={[styles.selectButtonText, isSelected && styles.selectedButtonText]}>
          {isSelected ? 'Selected' : 'Select'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
  },
  popularContainer: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  selectedContainer: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: colors.text.inverse,
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  duration: {
    fontSize: 16,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  selectButton: {
    backgroundColor: colors.card,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  selectedButtonText: {
    color: colors.text.inverse,
  },
});