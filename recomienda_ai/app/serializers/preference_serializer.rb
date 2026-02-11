class PreferenceSerializer
  include JSONAPI::Serializer

  attributes :id, :movie_genres, :book_genres, :favorite_authors, :favorite_directors
end
