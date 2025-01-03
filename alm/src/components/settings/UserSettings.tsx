'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UserSettings {
  openai_api_key?: string
  auto_categorize?: boolean
  auto_suggest?: boolean
}

export function UserSettings() {
  const [settings, setSettings] = useState<UserSettings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/user/settings')
      if (!response.ok) throw new Error('Failed to load settings')
      
      const data = await response.json()
      setSettings(data || {})
    } catch (error) {
      console.error('Error loading settings:', error)
      setError('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (key: keyof UserSettings) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      [key]: event.target.value
    }))
  }

  const handleToggle = (key: keyof UserSettings) => (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save settings')
      }

      setSuccess(true)
    } catch (error: any) {
      console.error('Error saving settings:', error)
      setError(error.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai_api_key">OpenAI API Key</Label>
            <Input
              id="openai_api_key"
              type="password"
              value={settings.openai_api_key || ''}
              onChange={handleChange('openai_api_key')}
              placeholder="sk-..."
            />
            <p className="text-sm text-gray-500">
              Required for AI-powered features like auto-categorization and suggestions
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto_categorize">Auto-categorize new links</Label>
              <Switch
                id="auto_categorize"
                checked={settings.auto_categorize || false}
                onCheckedChange={handleToggle('auto_categorize')}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto_suggest">Automatically suggest related links</Label>
              <Switch
                id="auto_suggest"
                checked={settings.auto_suggest || false}
                onCheckedChange={handleToggle('auto_suggest')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      {success && (
        <Alert>Settings saved successfully</Alert>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </form>
  )
}
