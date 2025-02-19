import { Configuration, OpenAIApi } from 'openai';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { addDays, differenceInDays } from 'date-fns';
import { Card, EnhancedCard, StudySession } from '../types';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let useModel: use.UniversalSentenceEncoder | null = null;
async function loadUSEModel() {
  if (!useModel) {
    useModel = await use.load();
  }
  return useModel;
}

export class AIService {
  private static instance: AIService;
  private model: use.UniversalSentenceEncoder | null = null;

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async init() {
    if (!this.model) {
      this.model = await loadUSEModel();
    }
  }

  // Adaptive Spaced Repetition
  calculateNextReview(card: EnhancedCard, performance: number): Date {
    const sr = card.spacedRepetition || {
      interval: 1,
      easeFactor: 2.5,
      consecutiveCorrect: 0,
    };

    if (performance >= 0.8) {
      sr.consecutiveCorrect++;
      sr.easeFactor = Math.min(sr.easeFactor + 0.15, 2.5);
    } else if (performance < 0.6) {
      sr.consecutiveCorrect = 0;
      sr.easeFactor = Math.max(sr.easeFactor - 0.2, 1.3);
    }

    sr.interval = sr.consecutiveCorrect === 0 
      ? 1 
      : Math.ceil(sr.interval * sr.easeFactor);

    return addDays(new Date(), sr.interval);
  }

  // AI Tutor Chat
  async getChatResponse(context: string, question: string): Promise<string> {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful tutor explaining concepts from flashcards. Keep explanations clear and concise."
          },
          {
            role: "user",
            content: `Context: ${context}\nQuestion: ${question}`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      return response.data.choices[0].message?.content || "I couldn't generate a response.";
    } catch (error) {
      console.error('Error getting chat response:', error);
      throw error;
    }
  }

  // Auto-Summarization
  async generateSummary(text: string): Promise<string> {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Create a concise flashcard-style summary of the following text."
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.5,
        max_tokens: 100
      });

      return response.data.choices[0].message?.content || text;
    } catch (error) {
      console.error('Error generating summary:', error);
      return text;
    }
  }

  // Performance Analysis
  async analyzePerformance(sessions: StudySession[]): Promise<{
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }> {
    const performanceData = sessions.reduce((acc, session) => {
      session.cards.forEach(card => {
        if (!acc[card.id]) {
          acc[card.id] = {
            correct: 0,
            total: 0,
            timeTaken: [] as number[],
          };
        }
        acc[card.id].total++;
        if (card.wasCorrect) acc[card.id].correct++;
        acc[card.id].timeTaken.push(card.timeSpent);
      });
      return acc;
    }, {} as Record<number, { correct: number; total: number; timeTaken: number[] }>);

    const weakCards = Object.entries(performanceData)
      .filter(([_, data]) => data.correct / data.total < 0.7)
      .map(([id]) => parseInt(id));

    const strongCards = Object.entries(performanceData)
      .filter(([_, data]) => data.correct / data.total > 0.9)
      .map(([id]) => parseInt(id));

    return {
      strengths: strongCards,
      weaknesses: weakCards,
      recommendations: this.generateRecommendations(performanceData),
    };
  }

  private generateRecommendations(performanceData: Record<number, { 
    correct: number; 
    total: number; 
    timeTaken: number[] 
  }>): string[] {
    const recommendations: string[] = [];
    
    // Analyze overall performance
    const averageAccuracy = Object.values(performanceData)
      .reduce((sum, data) => sum + (data.correct / data.total), 0) / Object.keys(performanceData).length;

    if (averageAccuracy < 0.7) {
      recommendations.push("Consider reviewing basic concepts more thoroughly");
    }

    // Analyze time patterns
    const slowCards = Object.entries(performanceData)
      .filter(([_, data]) => {
        const avgTime = data.timeTaken.reduce((sum, time) => sum + time, 0) / data.timeTaken.length;
        return avgTime > 10000; // More than 10 seconds
      }).length;

    if (slowCards > Object.keys(performanceData).length * 0.3) {
      recommendations.push("Practice quick recall with timed review sessions");
    }

    return recommendations;
  }

  // Get personalized study schedule
  getStudySchedule(cards: EnhancedCard[]): EnhancedCard[] {
    const now = new Date();
    return cards
      .filter(card => {
        if (!card.spacedRepetition?.nextReviewDate) return true;
        return differenceInDays(now, card.spacedRepetition.nextReviewDate) >= 0;
      })
      .sort((a, b) => {
        const aScore = this.calculatePriorityScore(a);
        const bScore = this.calculatePriorityScore(b);
        return bScore - aScore;
      });
  }

  private calculatePriorityScore(card: EnhancedCard): number {
    if (!card.spacedRepetition) return 1;

    const daysOverdue = differenceInDays(
      new Date(),
      card.spacedRepetition.nextReviewDate
    );

    const difficultyFactor = 1 / card.spacedRepetition.easeFactor;
    
    return (daysOverdue + 1) * difficultyFactor;
  }
}

export const aiService = AIService.getInstance();