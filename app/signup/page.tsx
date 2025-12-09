"use client"

import { SignupForm } from "@/components/auth/signup-form"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Redirect authenticated users to their dashboard
      router.push(user.role === "educator" ? "/dashboard" : "/dashboard")
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">KHMER E-LEARNING</h1>
          <p className="mt-2 text-gray-600">Join our learning community</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
