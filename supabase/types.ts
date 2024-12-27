export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
          is_premium: boolean
          is_trial_active: boolean
          trial_ends_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
          is_premium?: boolean
          is_trial_active?: boolean
          trial_ends_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          updated_at?: string
          is_premium?: boolean
          is_trial_active?: boolean
          trial_ends_at?: string | null
        }
      }
      restaurants: {
        Row: {
          id: string
          name: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          updated_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          restaurant_id: string
          customer_name: string
          email: string
          phone: string
          date: string
          time: string
          party_size: number
          status: 'pending' | 'confirmed' | 'cancelled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          customer_name: string
          email: string
          phone: string
          date: string
          time: string
          party_size: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string | null
        }
      }
    }
  }
}