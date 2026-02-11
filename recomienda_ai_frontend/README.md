# Recomienda.ai Frontend

Frontend for AI-powered movie and book recommendation app.

## Tech Stack

- **React 19** with TypeScript
- **Vite** as bundler
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Router** for routing
- **TanStack Query** for API state management
- **Axios** for HTTP requests

## Features

- Authentication (login/register)
- User preferences configuration
- AI-powered recommendations
- Search functionality
- Favorites management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Create .env file
VITE_API_URL=http://localhost:3000/api/v1
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   └── Layout.tsx    # Main layout with navigation
├── contexts/
│   └── AuthContext.tsx
├── features/
│   ├── auth/         # Login/Register forms
│   ├── dashboard/    # Preferences form
│   ├── recommendations/ # Recommendations list
│   ├── search/       # Search functionality
│   └── favorites/    # Favorites list
├── hooks/
│   └── useApi.ts     # Custom hooks for API calls
├── lib/
│   ├── api.ts        # Axios client
│   └── utils.ts      # Utility functions
├── pages/            # Route components
├── services/         # API service functions
└── types/            # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build


You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
