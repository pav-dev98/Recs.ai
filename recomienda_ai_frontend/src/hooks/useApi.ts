import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { preferenceService, recommendationService, contentService, favoriteService, ratingService } from "../services/api"
import { useAuth as useAuthContext } from "../contexts/AuthContext"

export function useAuth() {
  const { user, login, register, logout, loading, isAuthenticated } = useAuthContext()
  return { user, login, register, logout, loading, isAuthenticated }
}

export function usePreferences() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => preferenceService.getPreferences(),
  })

  return { preferences: data?.data, isLoading, error }
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (preference: any) => preferenceService.updatePreferences(preference),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] })
      queryClient.invalidateQueries({ queryKey: ["recommendations"] })
    },
  })
}

export function useRecommendations() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationService.getRecommendations(),
  })

  return { recommendations: data?.data, isLoading, error, refetch }
}

export function useGenerateRecommendations() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => recommendationService.generateRecommendations(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] })
    },
  })
}

export function useContent(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["content", id],
    queryFn: () => contentService.getContent(id),
    enabled: !!id,
  })

  return { content: data?.data, isLoading, error }
}

export function useSearchContent() {
  return useMutation({
    mutationFn: (query: string) => contentService.searchContent(query),
  })
}

export function useFavorites() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteService.getFavorites(),
  })

  return { favorites: data?.data, isLoading, error }
}

export function useAddFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contentId: string) => favoriteService.addFavorite(contentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => favoriteService.removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })
}

export function useCreateRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ contentId, score }: { contentId: string; score: number }) =>
      ratingService.createRating(contentId, score),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
    },
  })
}

export function useUpdateRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, score }: { id: string; score: number }) =>
      ratingService.updateRating(id, score),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
    },
  })
}

export function useDeleteRating() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => ratingService.deleteRating(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
    },
  })
}
