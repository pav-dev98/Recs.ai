import { Layout } from "../components/Layout"
import { Search as SearchComponent } from "../features/search/Search"

export function Search() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <SearchComponent />
      </div>
    </Layout>
  )
}
