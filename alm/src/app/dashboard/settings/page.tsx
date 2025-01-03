import { UserSettings } from '@/components/settings/UserSettings'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <UserSettings />
    </div>
  )
}
