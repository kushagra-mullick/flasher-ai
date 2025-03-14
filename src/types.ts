export interface Card {
  id: number;
  front: string;
  back: string;
}

export interface SpacedRepetitionInfo {
  interval: number;
  easeFactor: number;
  consecutiveCorrect: number;
  nextReviewDate: Date;
}

export interface EnhancedCard extends Card {
  spacedRepetition?: SpacedRepetitionInfo;
  lastReviewed?: Date;
  performance?: number[];
}

export interface StudySession {
  id: number;
  date: Date;
  cards: Array<{
    id: number;
    wasCorrect: boolean;
    timeSpent: number;
  }>;
}

export interface StudyRecommendation {
  cards: EnhancedCard[];
  suggestedDuration: number;
  focusAreas: string[];
}