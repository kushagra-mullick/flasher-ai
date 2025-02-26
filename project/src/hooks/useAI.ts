import { useState, useCallback, useEffect } from 'react';
import { aiService } from '../services/ai';
import { Card, EnhancedCard, StudySession, StudyRecommendation } from '../types';

export function useAI() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studyRecommendation, setStudyRecommendation] = useState<StudyRecommendation | null>(null);

  // Initialize AI service
  useEffect(() => {
    aiService.init().catch(console.error);
  }, []);

  const updateCardProgress = useCallback((
    card: EnhancedCard, 
    performance: number
  ): EnhancedCard => {
    const nextReviewDate = aiService.calculateNextReview(card, performance);
    return {
      ...card,
      spacedRepetition: {
        ...card.spacedRepetition!,
        nextReviewDate,
      },
      lastReviewed: new Date(),
      performance: [...(card.performance || []), performance],
    };
  }, []);

  const getStudyPlan = useCallback(async (
    cards: EnhancedCard[],
    sessions: StudySession[]
  ): Promise<StudyRecommendation> => {
    setIsProcessing(true);
    try {
      const analysis = await aiService.analyzePerformance(sessions);
      const dueCards = aiService.getStudySchedule(cards);
      
      const focusCards = dueCards.filter(card => 
        analysis.weaknesses.includes(card.id)
      );

      return {
        cards: [...focusCards, ...dueCards.filter(card => !focusCards.includes(card))],
        suggestedDuration: Math.min(focusCards.length * 2 + dueCards.length, 30),
        focusAreas: analysis.recommendations,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating study plan');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const getTutorResponse = useCallback(async (
    context: string,
    question: string
  ): Promise<string> => {
    setIsProcessing(true);
    try {
      return await aiService.getChatResponse(context, question);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting tutor response');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const summarizeText = useCallback(async (text: string): Promise<string> => {
    setIsProcessing(true);
    try {
      return await aiService.generateSummary(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating summary');
      return text;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    isProcessing,
    error,
    studyRecommendation,
    updateCardProgress,
    getStudyPlan,
    getTutorResponse,
    summarizeText,
  };
}