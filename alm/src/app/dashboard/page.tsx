import { Button } from '@/components/ui/button'
import { GitBranch, ListTodo, BarChart } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Welcome to AwesomeListManager</h2>
        <p className="text-gray-600">Manage your AwesomeLists with ease</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Lists</p>
              <h3 className="text-3xl font-bold">0</h3>
            </div>
            <ListTodo className="h-8 w-8 text-blue-500" />
          </div>
          <Button variant="link" className="mt-4 p-0">
            View all lists →
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Connected Repositories</p>
              <h3 className="text-3xl font-bold">0</h3>
            </div>
            <GitBranch className="h-8 w-8 text-green-500" />
          </div>
          <Button variant="link" className="mt-4 p-0">
            Manage repositories →
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Contributions</p>
              <h3 className="text-3xl font-bold">0</h3>
            </div>
            <BarChart className="h-8 w-8 text-purple-500" />
          </div>
          <Button variant="link" className="mt-4 p-0">
            View analytics →
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="text-gray-500 text-center py-8">
          No recent activity to show
        </div>
      </div>
    </div>
  )
}
