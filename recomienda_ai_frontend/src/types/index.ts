export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface Preference {
  id?: string
  movie_genres: string[]
  book_genres: string[]
  favorite_authors: string[]
  favorite_directors: string[]
}

export interface Content {
  id: string
  type: "Movie" | "Book"
  title: string
  description: string
  release_year: number
  genres: string[]
  directors?: string[]
  authors?: string[]
  image_url: string
}

export interface Recommendation {
  id: string
  movies: Content[]
  books: Content[]
}

export interface Rating {
  id: string
  user_id: string
  content_id: string
  score: number
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  content_id: string
  created_at: string
  content: Content
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiResponse<T> {
  data: T
  meta?: Record<string, unknown>
}

export interface ApiError {
  error: string
}
