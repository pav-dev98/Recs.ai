import { type ReactNode } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="text-xl font-bold">
              Recomienda.ai
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/recommendations"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/recommendations") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Recommendations
              </Link>
              <Link
                to="/search"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/search") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Search
              </Link>
              <Link
                to="/favorites"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/favorites") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Favorites
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
