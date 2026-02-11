import apiClient from "../lib/api"
import type { AuthResponse, Preference, Recommendation, Content, Favorite, Rating } from "../types"

export const authService = {
  login: (email: string, password: string) =>
    apiClient.post<{ data: AuthResponse }>("/auth/login", { email, password }),

  register: (email: string, password: string, name: string) =>
    apiClient.post<{ data: AuthResponse }>("/auth/register", { user: { email, password, name } }),

  getMe: () => apiClient.get<{ data: AuthResponse["user"] }>("/auth/me"),
}

export const preferenceService = {
  getPreferences: () => apiClient.get<{ data: Preference }>("/preferences"),

  createPreferences: (preference: Preference) =>
    apiClient.post<{ data: Preference }>("/preferences", { preference }),

  updatePreferences: (preference: Partial<Preference>) =>
    apiClient.put<{ data: Preference }>(`/preferences/${preference.id}`, { preference }),
}

export const recommendationService = {
  getRecommendations: () =>
    apiClient.get<{ data: Recommendation }>("/recommendations"),

  generateRecommendations: () =>
    apiClient.post<{ data: { job_id: string; status: string } }>("/recommendations/generate"),

  getJobStatus: (jobId: string) =>
    apiClient.get<{ data: { id: string; status: string; error_message?: string } }>(
      `/recommendations/jobs/${jobId}`
    ),
}

export const contentService = {
  getContent: (id: string) => apiClient.get<{ data: Content }>(`/content/${id}`),

  searchContent: (query: string) =>
    apiClient.get<{ data: Content[] }>(`/content/search`, { params: { q: query } }),
}

export const favoriteService = {
  getFavorites: () => apiClient.get<{ data: Favorite[] }>("/favorites"),

  addFavorite: (contentId: string) =>
    apiClient.post<{ data: Favorite }>("/favorites", { content_id: contentId }),

  removeFavorite: (id: string) => apiClient.delete(`/favorites/${id}`),
}

export const ratingService = {
  createRating: (contentId: string, score: number) =>
    apiClient.post<{ data: Rating }>("/ratings", { content_id: contentId, score }),

  updateRating: (id: string, score: number) =>
    apiClient.put<{ data: Rating }>(`/ratings/${id}`, { score }),

  deleteRating: (id: string) => apiClient.delete(`/ratings/${id}`),
}
