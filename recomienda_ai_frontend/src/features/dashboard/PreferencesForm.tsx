import { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { usePreferences, useUpdatePreferences } from "../../hooks/useApi";
import type { Preference } from "../../types";

const MOVIE_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
];

const BOOK_GENRES = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Philosophy",
  "Self-Help",
];

export function PreferencesForm() {
  const { preferences, isLoading } = usePreferences();
  const updatePreferences = useUpdatePreferences();

  const prefs = preferences as Preference | undefined;

  const [formData, setFormData] = useState<Preference>({
    id: "",
    movie_genres: [],
    book_genres: [],
    favorite_authors: [],
    favorite_directors: [],
  });
  const [newAuthor, setNewAuthor] = useState("");
  const [newDirector, setNewDirector] = useState("");
  
  // es un valor
  const cleanedPreferences = useMemo(() => {
    if (isLoading || !prefs?.data?.attributes) {
      return null;
    }
    const attrs = preferences.data.attributes;
    return {
        id: attrs.id,
        movie_genres: attrs.movie_genres ?? [],
        book_genres: attrs.book_genres ?? [],
        favorite_authors: attrs.favorite_authors ?? [],
        favorite_directors: attrs.favorite_directors ?? [],
      };
  }, [isLoading, prefs]);

  useEffect(() => {
    if (cleanedPreferences) {
      setFormData(cleanedPreferences);
    }
  }, [cleanedPreferences]);

  const handleGenreToggle = (genre: string, type: "movie" | "book") => {
    const key = type === "movie" ? "movie_genres" : "book_genres";
    console.log("the key", key);
    const currentGenres = formData[key];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter((g: string) => g !== genre)
      : [...currentGenres, genre];
    


    setFormData({ ...formData, [key]: newGenres });
  };

  const addAuthor = () => {
    if (newAuthor && !formData.favorite_authors.includes(newAuthor)) {
      setFormData({
        ...formData,
        favorite_authors: [...formData.favorite_authors, newAuthor],
      });
      setNewAuthor("");
    }
  };

  const removeAuthor = (author: string) => {
    setFormData({
      ...formData,
      favorite_authors: formData.favorite_authors.filter((a) => a !== author),
    });
  };

  const addDirector = () => {
    if (newDirector && !formData.favorite_directors.includes(newDirector)) {
      setFormData({
        ...formData,
        favorite_directors: [...formData.favorite_directors, newDirector],
      });
      setNewDirector("");
    }
  };

  const removeDirector = (director: string) => {
    setFormData({
      ...formData,
      favorite_directors: formData.favorite_directors.filter(
        (d) => d !== director,
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePreferences.mutateAsync(formData);
      alert("Preferences saved successfully!");
    } catch (error) {
      alert("Failed to save preferences");
    }
  };

  if (isLoading || cleanedPreferences == null) {
    return <div className="text-center py-8">Loading preferences...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>
          Tell us what you like so we can recommend the best content for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Movie Genres</h3>
            <div className="flex flex-wrap gap-2">
              {MOVIE_GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre, "movie")}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.movie_genres.includes(genre)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Book Genres</h3>
            <div className="flex flex-wrap gap-2">
              {BOOK_GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre, "book")}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.book_genres.includes(genre)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Favorite Authors</h3>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Add author"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addAuthor())
                }
              />
              <Button type="button" onClick={addAuthor}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.favorite_authors.map((author) => (
                <span
                  key={author}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                >
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(author)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Favorite Directors</h3>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Add director"
                value={newDirector}
                onChange={(e) => setNewDirector(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addDirector())
                }
              />
              <Button type="button" onClick={addDirector}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.favorite_directors.map((director) => (
                <span
                  key={director}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                >
                  {director}
                  <button
                    type="button"
                    onClick={() => removeDirector(director)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={updatePreferences.isPending}
          >
            {updatePreferences.isPending ? "Saving..." : "Save Preferences"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
