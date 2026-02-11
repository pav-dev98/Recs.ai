# Recomienda.ai - AI-Powered Recommendation API

Full-stack application for personalized movie and book recommendations using AI (Grok API from xAI).

## Tech Stack

### Backend
- **Rails 8.1+** (API-only mode)
- **PostgreSQL** database
- **JWT** authentication
- **Solid Queue** for background jobs
- **Rack-Attack** for rate limiting
- **Grok API** (xAI) for AI recommendations
- **jsonapi-serializer** for JSON responses

### Frontend (to be implemented)
- React 18+ with TypeScript
- Vite as bundler
- Tailwind CSS + shadcn/ui
- TanStack Query for API calls

## API Endpoints (Versioned `/api/v1`)

### Authentication
```
POST   /api/v1/auth/register  - Register new user
POST   /api/v1/auth/login     - Login user
GET    /api/v1/auth/me        - Get current user
```

### Preferences
```
GET    /api/v1/preferences     - Get user preferences
POST   /api/v1/preferences     - Create preferences
PUT    /api/v1/preferences/:id - Update preferences
```

### Recommendations
```
GET    /api/v1/recommendations           - Get recommendations (cached or generate)
POST   /api/v1/recommendations/generate  - Force async generation
GET    /api/v1/recommendations/jobs/:id  - Check job status
```

### Content
```
GET    /api/v1/content/:id         - Get content details
GET    /api/v1/content/search?q=X  - Search content
```

### Favorites
```
GET    /api/v1/favorites      - Get user favorites
POST   /api/v1/favorites      - Add favorite
DELETE /api/v1/favorites/:id  - Remove favorite
```

### Ratings
```
POST   /api/v1/ratings        - Create rating
PUT    /api/v1/ratings/:id    - Update rating
DELETE /api/v1/ratings/:id    - Delete rating
```

## Setup

### Prerequisites
- Ruby 3.3+
- PostgreSQL 15+
- xAI API key (for Grok)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recomienda_ai
```

2. Install dependencies:
```bash
bundle install
```

3. Setup environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Create and setup database:
```bash
rails db:create
rails db:migrate
```

5. Start Solid Queue (background jobs):
```bash
bin/jobs
```

6. Start the server:
```bash
rails server
```

## Database Schema

### User
- `id`, `email`, `password_digest`, `name`, `created_at`, `updated_at`

### Preference
- `id`, `user_id`, `movie_genres`, `book_genres`, `favorite_authors`, `favorite_directors`

### Content (polymorphic)
- `id`, `type` (Movie/Book), `title`, `description`, `release_year`, `genres`, `directors`, `authors`, `image_url`

### Rating
- `id`, `user_id`, `content_id`, `score` (1-5)

### Favorite
- `id`, `user_id`, `content_id`

### Recommendation
- `id`, `user_id`, `content_ids`, `preferences_snapshot`, `expires_at`

## Rate Limiting

- General API: 100 requests/minute
- Login: 5 requests/minute
- Register: 3 requests/minute
- Recommendations: 10 requests/5 minutes

## Deployment

Designed for deployment on Render or similar platforms. Includes:
- Dockerfile
- Kamal deployment configuration
- Procfile ready

## Development

### Running tests
```bash
rails test
```

### Linting
```bash
bundle exec rubocop
```

### Security audits
```bash
bundle exec brakeman
bundle exec bundler-audit check
```

## License

MIT

