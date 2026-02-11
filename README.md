# Recomienda.ai - AI-Powered Recommendation System

Full-stack monorepo for personalized movie and book recommendations using AI (Grok API from xAI).

## 🏗️ Architecture

This is a **monorepo** containing both frontend and backend applications:

```
├── recomienda_ai/              # Backend: Rails 8.1+ API
└── recomienda_ai_frontend/     # Frontend: React 19 + TypeScript
```

## 📋 Project Overview

**Recomienda.ai** is an intelligent recommendation system that provides personalized movie and book suggestions powered by AI. Users can:

- 🔐 Register and authenticate with JWT
- ⚙️ Set their preferences for genres, authors, and directors
- 🎬 Get AI-powered movie recommendations
- 📚 Get AI-powered book recommendations
- ⭐ Rate and favorite content
- 🔍 Search through content library

## 🛠️ Tech Stack

### Backend (`recomienda_ai/`)
- **Rails 8.1+** (API-only mode)
- **PostgreSQL** database
- **JWT** authentication
- **Solid Queue** for background jobs
- **Rack-Attack** for rate limiting
- **Grok API** (xAI) for AI recommendations
- **jsonapi-serializer** for JSON responses

### Frontend (`recomienda_ai_frontend/`)
- **React 19** with TypeScript
- **Vite** as bundler
- **Tailwind CSS** + shadcn/ui components
- **TanStack Query** for API state management
- **React Router** for navigation
- **Axios** for HTTP requests

## 🚀 Quick Start

### Prerequisites
- Ruby 3.3+
- Node.js 18+
- PostgreSQL 15+
- xAI API key (for Grok)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd recomienda_ai
```

### 2. Backend Setup
```bash
cd recomienda_ai

# Install dependencies
bundle install

# Setup environment variables
cp .env.example .env
# Edit .env with your xAI API key and database settings

# Setup database
rails db:create
rails db:migrate
rails db:seed

# Start background jobs (in separate terminal)
bin/jobs

# Start Rails server
rails server
```

Backend will be available at `http://localhost:3000`

### 3. Frontend Setup
```bash
cd recomienda_ai_frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📡 API Documentation

### Base URL
`http://localhost:3000/api/v1`

### Authentication
All protected endpoints require JWT token in `Authorization: Bearer <token>` header.

### Endpoints

#### Authentication
```http
POST   /auth/register     # Register new user
POST   /auth/login        # Login user
GET    /auth/me           # Get current user info
```

#### Preferences
```http
GET    /preferences       # Get user preferences
POST   /preferences       # Create preferences
PUT    /preferences/:id   # Update preferences
```

#### Recommendations
```http
GET    /recommendations           # Get recommendations (cached or generate)
POST   /recommendations/generate  # Force async generation
GET    /recommendations/jobs/:id  # Check job status
```

#### Content
```http
GET    /content/:id         # Get content details
GET    /content/search?q=X  # Search content
```

#### Favorites
```http
GET    /favorites      # Get user favorites
POST   /favorites      # Add favorite
DELETE /favorites/:id  # Remove favorite
```

#### Ratings
```http
POST   /ratings        # Create rating
PUT    /ratings/:id    # Update rating
DELETE /ratings/:id    # Delete rating
```

## 🏃‍♂️ Development

### Backend Commands
```bash
cd recomienda_ai

# Run tests
rails test

# Run linting
bundle exec rubocop

# Security audit
bundle exec brakeman
bundle exec bundler-audit check
```

### Frontend Commands
```bash
cd recomienda_ai_frontend

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 🗄️ Database Schema

### Core Models
- **User**: Authentication and profile
- **Preference**: User's favorite genres, authors, directors
- **Content**: Polymorphic model for Movies and Books
- **Rating**: User ratings (1-5) for content
- **Favorite**: User's favorite content
- **Recommendation**: AI-generated recommendations with caching

## 🛡️ Security Features

- JWT-based authentication
- Rate limiting (Rack-Attack)
- Input validation and sanitization
- CORS configuration
- Security headers
- Regular security audits (Brakeman, bundler-audit)

## 🚦 Rate Limiting

- **General API**: 100 requests/minute
- **Login**: 5 requests/minute
- **Register**: 3 requests/minute
- **Recommendations**: 10 requests/5 minutes

## 📦 Deployment

### Production Deployment
Designed for deployment on modern platforms:

#### Backend Options
- **Render** (recommended)
- **Heroku**
- **AWS ECS/Fargate**
- **DigitalOcean App Platform**

#### Frontend Options
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Deployment Configuration
- Docker support included
- Kamal deployment configuration
- Environment variable templates
- Production-ready Procfile

## 🔧 Environment Variables

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://localhost/recomienda_ai_development

# JWT
JWT_SECRET=your-secret-key

# xAI/Grok
XAI_API_KEY=your-xai-api-key

# Rails
RAILS_MASTER_KEY=your-rails-master-key
```

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

## 📊 Features

### ✅ Implemented
- User authentication (JWT)
- User preferences management
- AI-powered recommendations
- Content search
- Rating system
- Favorites system
- Background job processing
- Rate limiting
- API documentation
- TypeScript frontend

### 🚧 Future Enhancements
- Social features (follow users)
- Content reviews
- Recommendation explanations
- Export preferences
- Content suggestions by users
- Mobile app
- Dark mode
- Internationalization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **xAI** for the Grok API
- **Rails** team for the amazing framework
- **React** and **Vite** communities
- **Tailwind CSS** for the utility-first CSS framework