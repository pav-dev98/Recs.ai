class RecommendationService
  AI_API_URL = ENV.fetch("AI_API_URL")
  AI_API_KEY = ENV.fetch("AI_API_KEY")
  AI_MODEL = ENV.fetch("AI_MODEL")

  CACHE_EXPIRY = 24.hours

  def self.generate_for_user(user)
    print("ando en generate_for_user")
    return if user.preference.blank?

    cache_key = "recommendations/#{user.id}/#{user.preference.updated_at.to_i}"
    cached_recommendation = Rails.cache.read(cache_key)

    return cached_recommendation if cached_recommendation

    prompt = build_prompt(user)

    ai_response = call_ai_api(prompt)
    return nil unless ai_response

    recommendations = parse_ai_response(ai_response)

    cache_recommendation(cache_key, recommendations)
    recommendations
  end

  def self.build_prompt(user)
    pref = user.preference

    {
      messages: [
        {
          role: "system",
          content: "You are an expert recommendation engine for movies and books."
        },
        {
          role: "user",
          content: <<~PROMPT
            Based on these user preferences:
            - Movie genres: #{pref.movie_genres&.join(", ") || "None specified"}
            - Book genres: #{pref.book_genres&.join(", ") || "None specified"}
            - Favorite authors: #{pref.favorite_authors&.join(", ") || "None specified"}
            - Favorite directors: #{pref.favorite_directors&.join(", ") || "None specified"}

            Recommend 5 movies and 5 books that this user would love.

            Return ONLY valid JSON with this exact structure:
            {
              "movies": [
                {
                  "title": "Movie Title",
                  "description": "Brief description",
                  "release_year": 2024,
                  "directors": ["Director Name"],
                  "genres": ["Genre1", "Genre2"],
                  "reason": "Why this matches preferences"
                }
              ],
              "books": [
                {
                  "title": "Book Title",
                  "description": "Brief description",
                  "release_year": 2024,
                  "authors": ["Author Name"],
                  "genres": ["Genre1", "Genre2"],
                  "reason": "Why this matches preferences"
                }
              ]
            }

            IMPORTANT: Provide fresh, modern recommendations from 2020-2026. Do not include extremely well-known classics.
          PROMPT
        }
      ],
      model: AI_MODEL,
      temperature: 0.7,
      response_format: { type: "json_object" }
    }
  end

  def self.call_ai_api(prompt)
    connection = Faraday.new(url: AI_API_URL) do |conn|
      conn.request :json
      conn.response :json
      conn.adapter Faraday.default_adapter
      conn.request :retry, max: 2, interval: 1
      conn.options.timeout = 240
      conn.options.open_timeout = 30
    end

    response = connection.post do |req|
      req.headers["Content-Type"] = "application/json"
      req.headers["Authorization"] = "Bearer #{AI_API_KEY}"
      req.body = prompt
    end

    return nil unless response.success?

    response.body.dig("choices", 0, "message", "content")
  rescue Faraday::Error => e
    Rails.logger.error("AI API Error: #{e.message}")
    nil
  end

  def self.parse_ai_response(ai_response)
    JSON.parse(ai_response)
  rescue JSON::ParserError => e
    Rails.logger.error("Failed to parse AI response: #{e.message}")
    nil
  end

  def self.cache_recommendation(cache_key, recommendations)
    Rails.cache.write(cache_key, recommendations, expires_in: CACHE_EXPIRY)
  end
end
