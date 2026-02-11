class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :name, :created_at

  has_one :preference
  has_many :ratings
  has_many :favorites
end
