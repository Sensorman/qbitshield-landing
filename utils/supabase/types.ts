export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      usage: {
        Row: {
          api_key: string
          created_at: string | null
          limit: number | null
          tier: string | null
          usage_count: number | null
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string | null
          limit?: number | null
          tier?: string | null
          usage_count?: number | null
          user_id?: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          limit?: number | null
          tier?: string | null
          usage_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}