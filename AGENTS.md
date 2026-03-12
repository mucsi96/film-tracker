# Film Tracker - Development Guidelines

## General Code Style

- Avoid fallbacks, prefer failing fast
- Prefer functional programming patterns
- Prefer immutable data structures

## Java Style

- Use Lombok annotations (@Data, @Builder, @RequiredArgsConstructor)
- Constructor injection (via @RequiredArgsConstructor)
- Use Stream API for collections
- Use records for DTOs/responses

## TypeScript Style

- Use `const` by default
- Prefer spread operator for object/array operations
- Use functional array methods (map, filter, reduce)
- Use string literals over enums

## Testing Style

- Write tests from user perspective
- Use role-based selectors (getByRole)
- Use semantic selectors (getByText, getByLabel)
- E2E tests with Playwright

## Angular Style

- Use Angular Material components
- Use signals and resources (not rxjs where possible)
- Use string literals over enums
- Standalone components

## Design

- Material UI dark theme
- Skeleton loaders for loading states

## Project Overview

Film tracker application for:
- Tracking watched films (title, year, 2 main actors, personal score)
- AI-powered film suggestions based on watch history and preferences
- Managing favorite actors for better AI recommendations
- Persisting next film suggestion until watched

## Architecture

- **client/** - Angular 21 SPA with Material UI, MSAL authentication
- **server/** - Spring Boot 4 REST API with PostgreSQL, Spring AI
- **mock_anthropic_server/** - Express mock for Claude API
- **test/** - Playwright E2E tests
- **scripts/** - Build and deployment scripts
- **.github/workflows/** - CI/CD pipelines

## Key Technologies

- Spring Boot 4.0.3, Java 21
- Angular 21.2.0
- PostgreSQL 17
- Spring AI 2.0.0-M2 (Anthropic)
- Azure AD (MSAL) authentication
- Azure Key Vault for secrets
- Traefik reverse proxy
- Docker multi-stage builds
- Playwright for E2E testing

## Development Commands

### Frontend
```bash
cd client && npm start        # Start dev server
cd client && npm run build    # Production build
```

### Backend
```bash
cd server && mvn spring-boot:run -Dspring-boot.run.profiles=local  # Start with local profile
```

### Testing
```bash
scripts/compose_up.sh         # Start test stack
cd test && npm test           # Run E2E tests
cd test && npx playwright test --ui  # Interactive test runner
```

## API Routes

- `GET /api/environment` - Client configuration (public)
- `GET /api/films` - List watched films
- `POST /api/films` - Add a watched film
- `DELETE /api/films/{id}` - Delete a film
- `GET /api/favorite-actors` - List favorite actors
- `POST /api/favorite-actors` - Add a favorite actor
- `DELETE /api/favorite-actors/{id}` - Delete a favorite actor
- `GET /api/suggestion` - Get current film suggestion
- `POST /api/suggestion/generate` - Generate a new AI suggestion
- `DELETE /api/suggestion` - Dismiss current suggestion

## Data Model

- **films** - Watched films with title, year, actor1, actor2, score (1-10)
- **favorite_actors** - User's favorite actors (name)
- **suggestions** - AI-suggested next film to watch (title, year, reason)

## Configuration Patterns

### Spring Profiles
- **prod** - Production with Azure Key Vault and AAD
- **local** - Local development with Docker Compose DB
- **test** - Testing with disabled auth and mock AI services

### Environment Config
- Server exposes `/api/environment` endpoint
- Client fetches config before bootstrap
- Conditionally enables MSAL based on `mockAuth` flag
