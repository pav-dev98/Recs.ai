class RecommendationSerializer
  include JSONAPI::Serializer

  attributes :id, :content_ids, :expires_at, :created_at
end
