class ContentSerializer
  include JSONAPI::Serializer

  attributes :id, :type, :title, :description, :release_year, :genres, :image_url

  attribute :directors, if: Proc.new { |record| record.is_a?(Movie) }
  attribute :authors, if: Proc.new { |record| record.is_a?(Book) }
end
