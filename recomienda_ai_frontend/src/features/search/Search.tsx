import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useSearchContent, useAddFavorite } from "../../hooks/useApi"
import type { Content } from "../../types"

export function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Content[]>([])
  const searchContent = useSearchContent()
  const addFavorite = useAddFavorite()

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      const response = await searchContent.mutateAsync(query)
      setResults(response.data.data)
    } catch (error) {
      alert("Search failed")
    }
  }

  const handleFavorite = async (contentId: string) => {
    try {
      await addFavorite.mutateAsync(contentId)
      alert("Added to favorites!")
    } catch (err) {
      alert("Failed to add to favorites")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>Find movies and books to add to your favorites</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={searchContent.isPending}>
            {searchContent.isPending ? "Searching..." : "Search"}
          </Button>
        </form>

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.type === "Movie" ? "Movie" : "Book"} • {item.release_year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.genres.map((genre: string) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleFavorite(item.id)}
                  >
                    Add to Favorites
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {query && results.length === 0 && !searchContent.isPending && (
          <p className="text-center text-muted-foreground py-8">No results found</p>
        )}
      </CardContent>
    </Card>
  )
}
