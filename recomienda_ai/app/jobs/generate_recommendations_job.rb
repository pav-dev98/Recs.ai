class GenerateRecommendationsJob < ApplicationJob
  queue_as :recommendations

  def perform(job_id)
    job = RecommendationGenerationJob.find(job_id)
    job.update!(status: :processing)

    recommendations = RecommendationService.generate_for_user(job.user)

    if recommendations
      movie_ids = recommendations["movies"].map { |m| create_or_update_movie(m) }
      book_ids = recommendations["books"].map { |b| create_or_update_book(b) }

      recommendation = job.user.recommendations.create!(
        content_ids: movie_ids + book_ids,
        preferences_snapshot: job.user.preference&.attributes,
        expires_at: 24.hours.from_now
      )

      job.update!(status: :completed)
    else
      job.update!(status: :failed, error_message: "Failed to generate recommendations")
    end
  rescue StandardError => e
    job.update!(status: :failed, error_message: e.message)
    raise e
  end

  private

  def create_or_update_movie(movie_data)
    Movie.find_or_create_by(
      title: movie_data["title"],
      release_year: movie_data["release_year"]
    ) do |movie|
      movie.description = movie_data["description"]
      movie.directors = movie_data["directors"]
      movie.genres = movie_data["genres"]
      movie.image_url = "https://via.placeholder.com/300x450"
    end.id
  end

  def create_or_update_book(book_data)
    Book.find_or_create_by(
      title: book_data["title"],
      release_year: book_data["release_year"]
    ) do |book|
      book.description = book_data["description"]
      book.authors = book_data["authors"]
      book.genres = book_data["genres"]
      book.image_url = "https://via.placeholder.com/300x450"
    end.id
  end
end
