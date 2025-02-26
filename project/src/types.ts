export interface Card {
  id: number;
  front: string;
  back: string;
}

export interface EnhancedCard extends Card {
  spacedRepetition?: {
    interval: number;
    easeFactor: number;
    consecutiveCorrect: number;
    nextReviewDate: Date;
  };
  lastReviewed?: Date;
  performance?: number[];
}

export interface StudySession {
  id: number;
  userId: string;
  cards: {
    id: number;
    wasCorrect: boolean;
    timeSpent: number;
  }[];
  startTime: Date;
  endTime: Date;
}

export interface StudyRecommendation {
  cards: EnhancedCard[];
  suggestedDuration: number;
  focusAreas: string[];
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      decks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      flashcards: {
        Row: {
          id: string;
          deck_id: string;
          front: string;
          back: string;
          created_at: string;
          updated_at: string;
          last_reviewed: string | null;
          next_review: string | null;
          difficulty: number;
        };
        Insert: {
          id?: string;
          deck_id: string;
          front: string;
          back: string;
          created_at?: string;
          updated_at?: string;
          last_reviewed?: string | null;
          next_review?: string | null;
          difficulty?: number;
        };
        Update: {
          id?: string;
          deck_id?: string;
          front?: string;
          back?: string;
          created_at?: string;
          updated_at?: string;
          last_reviewed?: string | null;
          next_review?: string | null;
          difficulty?: number;
        };
      };
    };
  };
}