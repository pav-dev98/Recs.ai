class Preference < ApplicationRecord
  belongs_to :user

  validate :validate_json_arrays

  private

  def validate_json_arrays
    %i[movie_genres book_genres favorite_authors favorite_directors].each do |field|
      if send(field).present? && !send(field).is_a?(Array)
        errors.add(field, "must be an array")
      end
    end
  end
end
