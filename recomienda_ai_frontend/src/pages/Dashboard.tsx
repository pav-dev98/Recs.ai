import { Layout } from "../components/Layout"
import { PreferencesForm } from "../features/dashboard/PreferencesForm"

export function Dashboard() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Configure your preferences to get personalized recommendations
          </p>
        </div>
        <PreferencesForm />
      </div>
    </Layout>
  )
}
