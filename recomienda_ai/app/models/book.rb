class Book < Content
  validates :authors, presence: true
end
