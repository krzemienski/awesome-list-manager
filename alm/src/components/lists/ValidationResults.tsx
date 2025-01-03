import { useState, useEffect } from 'react'
import { Alert, AlertTitle, Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { validateList, getListValidation } from '@/lib/services/validation'

interface ValidationResultsProps {
  listId: string
}

export function ValidationResults({ listId }: ValidationResultsProps) {
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(false)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    loadLatestValidation()
  }, [listId])

  const loadLatestValidation = async () => {
    setLoading(true)
    try {
      const validation = await getListValidation(listId)
      setResults(validation?.result)
    } catch (error) {
      console.error('Error loading validation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleValidate = async () => {
    setValidating(true)
    try {
      await validateList(listId)
      await loadLatestValidation()
    } catch (error) {
      console.error('Error validating list:', error)
    } finally {
      setValidating(false)
    }
  }

  if (loading || validating) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Validation Results</Typography>
          <Button
            variant="contained"
            onClick={handleValidate}
            disabled={validating}
          >
            Validate List
          </Button>
        </Box>

        {results?.issues?.length > 0 ? (
          <Box>
            {results.issues.map((issue: any, index: number) => (
              <Alert
                key={index}
                severity={issue.status >= 500 ? 'error' : 'warning'}
                sx={{ mb: 1 }}
              >
                <AlertTitle>{issue.status}: {issue.url}</AlertTitle>
                {issue.message}
              </Alert>
            ))}
          </Box>
        ) : (
          <Alert severity="success">
            No issues found in the list!
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
