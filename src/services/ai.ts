import OpenAI from 'openai';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { addDays, differenceInDays } from 'date-fns';
import { Card, EnhancedCard, StudySession, StudyRecommendation } from '../types';

// Initialize OpenAI with a default mock key if the API key is not provided
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'mock_key',
  dangerouslyAllowBrowser: true
});

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

  // Generate flashcards from text
  async generateFlashcards(text: string, options: {
    style: 'detailed' | 'concise';
    topicFilter?: string;
  } = { style: 'detailed' }): Promise<Card[]> {
    try {
      // Check if OpenAI API key is available
      if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here') {
        // Return mock data if no API key is provided
        return this.generateMockFlashcards(text);
      }

      const prompt = this.createFlashcardPrompt(text, options);
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert at creating educational flashcards. Create clear, accurate, and well-structured flashcards from the provided text."
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const content = response.choices[0].message?.content;
      if (!content) throw new Error('No content generated');

      return this.parseFlashcards(content);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      // Return mock data if there's an error
      return this.generateMockFlashcards(text);
    }
  }

  // Generate mock flashcards for development/testing
  private generateMockFlashcards(text: string): Card[] {
    return [
      {
        id: 1,
        front: "What is a flashcard?",
        back: "A card with information on both sides, used for learning and memorization."
      },
      {
        id: 2,
        front: "How do flashcards help with learning?",
        back: "They use active recall and spaced repetition to improve memory retention."
      },
      {
        id: 3,
        front: "What is the best way to use flashcards?",
        back: "Review them regularly, test yourself actively, and space out your practice sessions."
      }
    ];
  }

  private createFlashcardPrompt(text: string, options: {
    style: 'detailed' | 'concise';
    topicFilter?: string;
  }): string {
    const styleGuide = options.style === 'detailed'
      ? 'Create detailed flashcards with comprehensive information'
      : 'Create concise flashcards with key points only';

    const topicFilter = options.topicFilter
      ? `Focus on content related to: ${options.topicFilter}`
      : 'Cover all important topics';

    return `
Create flashcards from the following text. ${styleGuide}. ${topicFilter}

Format each flashcard as:
Q: [Question]
A: [Answer]

Text:
${text}

Create flashcards that:
1. Cover key concepts and important details
2. Use clear, unambiguous language
3. Are self-contained and make sense independently
4. Progress from basic to advanced concepts
5. Include relevant examples where appropriate

Please format the output as multiple Q/A pairs.`;
  }

  private parseFlashcards(content: string): Card[] {
    const cards: Card[] = [];
    const pairs = content.split(/\n\n+/);

    for (const pair of pairs) {
      const question = pair.match(/Q:\s*(.*)/)?.[1];
      const answer = pair.match(/A:\s*(.*)/)?.[1];

      if (question && answer) {
        cards.push({
          id: Date.now() + cards.length,
          front: question.trim(),
          back: answer.trim()
        });
      }
    }

    return cards;
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
      if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here') {
        return "Please provide your OpenAI API key to use the AI tutor feature.";
      }

      const response = await openai.chat.completions.create({
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

      return response.choices[0].message?.content || "I couldn't generate a response.";
    } catch (error) {
      console.error('Error getting chat response:', error);
      return "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
    }
  }

  // Auto-Summarization
  async generateSummary(text: string): Promise<string> {
    try {
      if (!import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here') {
        return text;
      }

      const response = await openai.chat.completions.create({
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

      return response.choices[0].message?.content || text;
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