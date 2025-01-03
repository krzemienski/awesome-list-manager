import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Chip,
  Alert
} from '@mui/material'
import { Add as AddIcon, AutoAwesome as AIIcon } from '@mui/icons-material'

interface AddLinkFormProps {
  listId: string
  onAdd: () => void
}

export function AddLinkForm({ listId, onAdd }: AddLinkFormProps) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState<any>(null)

  const analyzeUrl = async () => {
    setAnalyzing(true)
    setError('')
    try {
      const response = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, type: 'analyze' })
      })

      if (!response.ok) throw new Error('Failed to analyze URL')
      
      const data = await response.json()
      setSuggestions(data)
      
      // Pre-fill fields with suggestions
      setTitle(data.title || '')
      setDescription(data.description || '')
      if (data.suggestedCategories?.[0]) {
        setCategory(data.suggestedCategories[0].category)
      }
    } catch (err) {
      setError('Failed to analyze URL')
      console.error(err)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/lists/${listId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, description, category })
      })

      if (!response.ok) throw new Error('Failed to add link')

      setUrl('')
      setTitle('')
      setDescription('')
      setCategory('')
      setSuggestions(null)
      onAdd()
    } catch (err) {
      setError('Failed to add link')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Link
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              fullWidth
            />
            <Button
              onClick={analyzeUrl}
              disabled={!url || analyzing}
              startIcon={analyzing ? <CircularProgress size={20} /> : <AIIcon />}
              variant="outlined"
            >
              Analyze
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {suggestions?.suggestedCategories && (
            <Box mb={2}>
              <Typography variant="subtitle2" gutterBottom>
                Suggested Categories:
              </Typography>
              <Box display="flex" gap={1}>
                {suggestions.suggestedCategories.map((sug: any, i: number) => (
                  <Chip
                    key={i}
                    label={`${sug.category} (${Math.round(sug.confidence * 100)}%)`}
                    onClick={() => setCategory(sug.category)}
                    color={category === sug.category ? 'primary' : 'default'}
                  />
                ))}
              </Box>
            </Box>
          )}

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
            >
              Add Link
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}
