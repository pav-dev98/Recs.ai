class FavoriteSerializer
  include JSONAPI::Serializer

  attributes :id, :created_at

  belongs_to :user
  belongs_to :content
end
