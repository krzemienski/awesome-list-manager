'use client'

import { Button } from '@/components/ui/button'
import { ListTodo, Plus } from 'lucide-react'

export function ListsClient() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AwesomeLists</h2>
          <p className="text-gray-600">Manage and organize your curated lists</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New List
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="text-center py-12">
            <ListTodo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No lists created</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first AwesomeList.</p>
            <div className="mt-6">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
