class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :content

  validates :score, presence: true, inclusion: { in: 1..5 }
  validates :user_id, uniqueness: { scope: :content_id, message: "has already rated this content" }
end
