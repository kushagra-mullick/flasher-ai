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
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          unsubscribed_at: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          cards_created: number;
          cards_reviewed: number;
          study_time: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          cards_created?: number;
          cards_reviewed?: number;
          study_time?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          cards_created?: number;
          cards_reviewed?: number;
          study_time?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}