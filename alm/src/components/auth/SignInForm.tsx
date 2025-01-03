'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GithubIcon } from 'lucide-react'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn, githubSignIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.')
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-center">Sign in to ALM</h2>
        <p className="mt-2 text-center text-gray-600">
          Manage your AwesomeLists with ease
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={githubSignIn}
        >
          <GithubIcon className="mr-2 h-4 w-4" />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  )
}
