export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      usage: {
        Row: {
          id: string
          user_id: string
          usage_count: number
          tier: string
          api_key: string
          limit: number
          created_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['usage']['Row'], 'id'>>
        Update: Partial<Database['public']['Tables']['usage']['Row']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}