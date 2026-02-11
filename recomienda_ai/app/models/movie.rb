class Movie < Content
  validates :directors, presence: true
end
