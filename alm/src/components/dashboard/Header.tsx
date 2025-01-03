import { useAuth } from '@/lib/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { BellIcon, UserCircle } from 'lucide-react'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">AwesomeListManager</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <UserCircle className="h-8 w-8" />
          <div>
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    </header>
  )
}
