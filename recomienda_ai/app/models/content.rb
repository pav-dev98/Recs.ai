class Content < ApplicationRecord
  has_many :ratings, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :title, presence: true
  validates :type, presence: true
  validates :type, inclusion: { in: %w[Movie Book] }
end
