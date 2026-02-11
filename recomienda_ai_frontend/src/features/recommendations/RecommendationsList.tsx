import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { useRecommendations, useGenerateRecommendations, useAddFavorite } from "../../hooks/useApi"
import type { Recommendation } from "../../types"

export function RecommendationsList() {
  const { recommendations, isLoading, error, refetch } = useRecommendations()
  const recs = recommendations?.data as Recommendation | undefined
  const generateRecommendations = useGenerateRecommendations()
  const addFavorite = useAddFavorite()

  const handleGenerate = async () => {
    console.log("Regenerate recommendations...")
    try {
      await generateRecommendations.mutateAsync()
      refetch()
    } catch (err) {
      alert("Failed to generate recommendations")
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
  
  console.log("Recommendations:", recs);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">Loading recommendations...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-red-500">Failed to load recommendations</div>
        </CardContent>
      </Card>
    )
  }

  if (!recs || (!recs.movies && !recs.books)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Recommendations Yet</CardTitle>
          <CardDescription>
            Set your preferences first, then generate your personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGenerate} disabled={generateRecommendations.isPending}>
            {generateRecommendations.isPending ? "Generating..." : "Generate Recommendations"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Your Recommendations</h2>
          <p className="text-muted-foreground">AI-powered suggestions just for you</p>
        </div>
        <Button onClick={handleGenerate} disabled={generateRecommendations.isPending}>
          {generateRecommendations.isPending ? "Generating..." : "Regenerate"}
        </Button>
      </div>

      {recs.movies && recs.movies.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Movies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recs.movies.map((item,index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={"https://placehold.co/300x450"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.release_year} • {item.directors?.join(", ") || "Unknown Director"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.genres.map((genre) => (
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
        </div>
      )}

      {recs.books && recs.books.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Books</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recs.books.map((item,index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={"https://placehold.co/300x450"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.release_year} • {item.authors?.join(", ") || "Unknown Author"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.genres.map((genre) => (
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
        </div>
      )}
    </div>
  )
}
