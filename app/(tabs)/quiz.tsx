import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/lib/store/userStore';
import { useVocabularyStore } from '@/lib/store/vocabularyStore';
import { playAudio } from '@/utils/audio';
import { router } from 'expo-router';
import { Play } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type QuizQuestion = {
  wordId: string;
  word: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: string;
};

export default function QuizScreen() {
  const { user } = useUserStore();
  const { words, fetchWords } = useVocabularyStore();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      const wordsForQuiz = user?.level
        ? words.filter(word => word.level === user.level).slice(0, 5)
        : words.slice(0, 5);

      const generatedQuestions = wordsForQuiz.map(word => {
        const otherDefinitions = words
          .filter(w => w.id !== word.id)
          .map(w => w.definition)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        const options = [word.definition, ...otherDefinitions].sort(() => 0.5 - Math.random());

        return {
          wordId: word.id,
          word: word.word,
          audioUrl: word.audioUSUrl,
          options,
          correctAnswer: word.definition,
        };
      });

      setQuestions(generatedQuestions);
      setLoading(false);
    }
  }, [words, user?.level]);

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const handlePlayAudio = (url?: string) => {
    if (url) {
      playAudio(url);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Preparing quiz questions...</Text>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noQuestionsText}>No questions available.</Text>
        <Button 
          title="Go to Home" 
          onPress={() => router.push('/')}
          style={styles.homeButton}
        />
      </SafeAreaView>
    );
  }

  if (quizCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.completedContainer}>
          <Text style={styles.completedTitle}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Your Score: <Text style={styles.scoreValue}>{score}/{questions.length}</Text>
          </Text>
          
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>
              {score === questions.length 
                ? 'Perfect Score!' 
                : score >= questions.length / 2 
                  ? 'Good Job!' 
                  : 'Keep Practicing!'}
            </Text>
            <Text style={styles.resultMessage}>
              {score === questions.length 
                ? "You've mastered these words!" 
                : score >= questions.length / 2 
                  ? "You're making great progress." 
                  : "Don't worry, learning takes time."}
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <Button 
              title="Try Again" 
              onPress={handleRestartQuiz}
              style={styles.actionButton}
            />
            <Button 
              title="Go to Home" 
              variant="outline"
              onPress={() => router.push('/')}
              style={styles.actionButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vocabulary Quiz</Text>
        <Text style={styles.subtitle}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What is the definition of:</Text>
        <View style={styles.wordContainer}>
          <Text style={styles.wordText}>{currentQuestion.word}</Text>
          {currentQuestion.audioUrl && (
            <TouchableOpacity 
              style={styles.audioButton}
              onPress={() => handlePlayAudio(currentQuestion.audioUrl)}
            >
              <Play size={20} color={colors.text.inverse} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOption,
              isAnswered && option === currentQuestion.correctAnswer && styles.correctOption,
              isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectOption,
            ]}
            onPress={() => handleSelectAnswer(option)}
            disabled={isAnswered}
          >
            <Text 
              style={[
                styles.optionText,
                isAnswered && option === currentQuestion.correctAnswer && styles.correctOptionText,
                isAnswered && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.incorrectOptionText,
              ]}
              numberOfLines={3}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {isAnswered && (
        <View style={styles.feedbackContainer}>
          <Text style={[
            styles.feedbackText,
            selectedAnswer === currentQuestion.correctAnswer ? styles.correctFeedback : styles.incorrectFeedback
          ]}>
            {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}
          </Text>
          <Button 
            title={currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'} 
            onPress={handleNextQuestion}
            style={styles.nextButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.card,
    borderRadius: 2,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  audioButton: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  correctOption: {
    backgroundColor: '#DCFCE7',
    borderColor: colors.success,
  },
  incorrectOption: {
    backgroundColor: '#FEE2E2',
    borderColor: colors.error,
  },
  optionText: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 22,
  },
  correctOptionText: {
    color: colors.success,
  },
  incorrectOptionText: {
    color: colors.error,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  correctFeedback: {
    color: colors.success,
  },
  incorrectFeedback: {
    color: colors.error,
  },
  nextButton: {
    width: 200,
  },
  loadingText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  noQuestionsText: {
    fontSize: 18,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  homeButton: {
    width: 200,
    alignSelf: 'center',
  },
  completedContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  scoreValue: {
    fontWeight: '700',
    color: colors.primary,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  resultMessage: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actionButtons: {
    width: '100%',
  },
  actionButton: {
    marginBottom: 12,
  },
});