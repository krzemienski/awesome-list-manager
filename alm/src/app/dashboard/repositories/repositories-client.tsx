'use client'

import { Button } from '@/components/ui/button'
import { GitBranch } from 'lucide-react'
import { ImportForm } from '@/components/lists/ImportForm'

export function RepositoriesClient() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Repositories</h2>
          <p className="text-gray-600">Manage your GitHub repositories</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ImportForm />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="text-center py-12">
            <GitBranch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No repositories connected</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by connecting a GitHub repository.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
