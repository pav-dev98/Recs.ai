import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "../types"
import apiClient from "../lib/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const response = await apiClient.get("/auth/me")
        setUser(response.data.data)
      } catch (error) {
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<{ data: { user: User; token: string } }>("/auth/login", {
      email,
      password,
    })
    const { user: userData, token } = response.data.data
    localStorage.setItem("token", token)
    setUser(userData)
  }

  const register = async (email: string, password: string, name: string) => {
    console.log("en el register");
    const response = await apiClient.post<{ data: { user: User; token: string } }>(
      "/auth/register",
      { user: { email, password, name } }
    )
    console.log("response register", response);
    const { user: userData, token } = response.data.data
    localStorage.setItem("token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
