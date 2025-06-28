import { colors } from '@/constants/colors';
import { playAudio } from '@/utils/audio';
import { Pause, Play } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AudioPlayerProps {
  audioUrl?: string;
  label: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioUrl,
  label
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    if (!audioUrl) return;
    
    if (!isPlaying) {
      setIsPlaying(true);
      await playAudio(audioUrl);
      // In a real implementation, we would track when audio finishes
      // For now, simulate audio duration
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
    } else {
      // In a real implementation, we would stop the audio
      setIsPlaying(false);
    }
  };

  if (!audioUrl) {
    return null;
  }

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePlayPause}
      disabled={!audioUrl}
    >
      <View style={styles.iconContainer}>
        {isPlaying ? (
          <Pause size={16} color={colors.text.inverse} />
        ) : (
          <Play size={16} color={colors.text.inverse} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});