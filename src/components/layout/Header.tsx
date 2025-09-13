'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function Header() {
  const { user, loading, logout, isAuthenticated } = useAuth()

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const handleSignOut = async () => {
    await logout()
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={loading}
          >
            {loading ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </div>
    </header>
  )
}