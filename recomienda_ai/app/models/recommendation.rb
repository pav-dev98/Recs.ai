class Recommendation < ApplicationRecord
  belongs_to :user

  validates :content_ids, presence: true
  validate :content_ids_must_be_array

  scope :active, -> { where("expires_at > ?", Time.current) }

  private

  def content_ids_must_be_array
    return if content_ids.is_a?(Array) && content_ids.present?

    errors.add(:content_ids, "must be a non-empty array")
  end
end
