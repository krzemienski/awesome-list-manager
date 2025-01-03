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
      profiles: {
        Row: {
          id: string
          user_id: string
          username: string
          avatar_url: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          avatar_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          avatar_url?: string
          created_at?: string
        }
      }
      lists: {
        Row: {
          id: string
          user_id: string
          github_url: string
          name: string
          description?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          github_url: string
          name: string
          description?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          github_url?: string
          name?: string
          description?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          list_id: string
          name: string
          description?: string
          parent_id?: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          list_id: string
          name: string
          description?: string
          parent_id?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          list_id?: string
          name?: string
          description?: string
          parent_id?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      links: {
        Row: {
          id: string
          list_id: string
          category_id?: string
          url: string
          title: string
          description?: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          list_id: string
          category_id?: string
          url: string
          title: string
          description?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          list_id?: string
          category_id?: string
          url?: string
          title?: string
          description?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      suggestions: {
        Row: {
          id: string
          list_id: string
          url: string
          title: string
          description?: string
          suggested_category?: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          list_id: string
          url: string
          title: string
          description?: string
          suggested_category?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          list_id?: string
          url?: string
          title?: string
          description?: string
          suggested_category?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          openai_api_key?: string
          auto_categorize: boolean
          auto_suggest: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          openai_api_key?: string
          auto_categorize?: boolean
          auto_suggest?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          openai_api_key?: string
          auto_categorize?: boolean
          auto_suggest?: boolean
          created_at?: string
          updated_at?: string
        }
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
  }
}

export type List = Database['public']['Tables']['lists']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Link = Database['public']['Tables']['links']['Row']
export type Suggestion = Database['public']['Tables']['suggestions']['Row']
export type UserSettings = Database['public']['Tables']['user_settings']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
