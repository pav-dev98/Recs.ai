class RatingSerializer
  include JSONAPI::Serializer

  attributes :id, :score, :created_at

  belongs_to :user
  belongs_to :content
end
