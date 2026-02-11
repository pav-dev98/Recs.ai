import { useFavorites, useRemoveFavorite } from "../../hooks/useApi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import type { Favorite } from "../../types"

export function FavoritesList() {
  const { favorites, isLoading, error } = useFavorites()
  const removeFavorite = useRemoveFavorite()

  const handleRemoveFavorite = async (id: string) => {
    try {
      await removeFavorite.mutateAsync(id)
    } catch (err) {
      alert("Failed to remove from favorites")
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">Loading favorites...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-red-500">Failed to load favorites</div>
        </CardContent>
      </Card>
    )
  }

  const favoritesList = favorites as Favorite[] | undefined

  if (!favoritesList || favoritesList.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            No favorites yet. Browse recommendations or search for content to add to your favorites!
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your Favorites</h2>
        <p className="text-muted-foreground">Content you've saved for later</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoritesList.map((favorite) => (
          <Card key={favorite.id} className="overflow-hidden">
            <img
              src={favorite.content.image_url || "https://via.placeholder.com/300x450"}
              alt={favorite.content.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle className="text-lg">{favorite.content.title}</CardTitle>
              <CardDescription>
                {favorite.content.type === "Movie" ? "Movie" : "Book"} • {favorite.content.release_year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{favorite.content.description}</p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => handleRemoveFavorite(favorite.id)}
              >
                Remove from Favorites
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
