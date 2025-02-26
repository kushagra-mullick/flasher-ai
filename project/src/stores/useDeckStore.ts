import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Deck {
  id: string;
  title: string;
  description: string;
  is_public: boolean;
  created_at: string;
}

interface DeckState {
  decks: Deck[];
  isLoading: boolean;
  error: string | null;
  loadDecks: () => Promise<void>;
  createDeck: (title: string, description: string) => Promise<void>;
  updateDeck: (id: string, updates: Partial<Deck>) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
}

export const useDeckStore = create<DeckState>((set, get) => ({
  decks: [],
  isLoading: false,
  error: null,

  loadDecks: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ decks: data || [], error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },

  createDeck: async (title: string, description: string) => {
    try {
      const { data, error } = await supabase
        .from('decks')
        .insert([{ title, description }])
        .select()
        .single();

      if (error) throw error;
      set(state => ({ decks: [data, ...state.decks] }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateDeck: async (id: string, updates: Partial<Deck>) => {
    try {
      const { data, error } = await supabase
        .from('decks')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set(state => ({
        decks: state.decks.map(deck => 
          deck.id === id ? { ...deck, ...data } : deck
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteDeck: async (id: string) => {
    try {
      const { error } = await supabase
        .from('decks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      set(state => ({
        decks: state.decks.filter(deck => deck.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));