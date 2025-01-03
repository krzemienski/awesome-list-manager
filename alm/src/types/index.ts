export type Profile = {
  id: string
  name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Repository = {
  id: string
  user_id: string
  github_id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  created_at: string
  updated_at: string
}

export type List = {
  id: string
  user_id: string
  repository_id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export type ListItem = {
  id: string
  list_id: string
  title: string
  description: string | null
  url: string
  category: string | null
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export type UserSettings = {
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  created_at: string
  updated_at: string
}
