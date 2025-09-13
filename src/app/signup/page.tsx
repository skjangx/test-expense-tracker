import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}