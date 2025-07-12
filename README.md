# LunaJoy Matching Engine - Coding Challenge

This is a coding challenge implementation for a developer role at LunaJoy. The challenge involves building a clinician matching engine that simulates how patients would be matched with mental health providers based on their specific needs, preferences, and availability.

## 🎯 Challenge Overview

This project demonstrates a fullstack implementation of a matching engine that supports:
- Patient onboarding and intake workflow
- Clinician-patient matching based on multiple criteria
- Scoring algorithms
- Modern UI/UX for the patient experience

## 🏗️ Architecture

This is a fullstack monorepo with:
- **API**: Backend service with matching logic (`apps/api`)
- **App**: Frontend interface for patient intake (`apps/app`)
- **Shared**: Common types and utilities (`packages/shared`)

## 🛠️ Tech Stack

### Frontend (`apps/app`)
- **Nuxt 3**: Vue.js framework
- **Tailwind CSS**: Utility-first styling
- **DaisyUI**: Tailwind component library
- **Hono RPC**: End-to-end type safety across frontend and backend

### Backend (`apps/api`)
- **Bun**: JavaScript runtime and package manager
- **Hono**: Fast web framework
- **Zod**: Schema validation
- **OpenAPI**: API documentation


## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

1. Clone the repository
```bash
git clone https://github.com/jfdelarosa/lunajoy
cd lunajoy
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
# Copy environment example files
cp apps/api/.env.example apps/api/.env
cp apps/app/.env.example apps/app/.env
```

### Running the Project

#### Development Mode

You'll need to run both the API and the app in separate terminals:

**Terminal 1 - API Server:**
```bash
cd apps/api
bun dev
```

**Terminal 2 - Frontend App:**
```bash
cd apps/app
bun dev
```

The API will be available at `http://localhost:3000` and the frontend at `http://localhost:3001`.

Once the API is running, you can explore and test the endpoints using the interactive OpenAPI documentation at `http://localhost:3001/swagger`.


## 🎯 Key Features

### Matching Logic
- **Patient-Facing Filters**: State license, language, gender preference, clinical needs
- **Backend Prioritization**: Immediate availability, insurance match, load balancing
- **Scoring System**: Multi-criteria scoring with explanations

## 🧪 Development

### Adding New Matching Criteria
1. Update types in `packages/shared/src/types.ts`
2. Modify matching logic in `apps/api/src/lib/matching/`
3. Update frontend forms in `apps/app/components/wizzard/`

## 🚀 Future Improvements

Given more time, here are enhancements that could be implemented:

### Backend Enhancements
- **Database Integration**: Replace JSON files with a proper database
- **Comprehensive Testing**: Unit tests or integration tests
- **Rate Limiting**: API rate limiting to prevent abuse
- **Logging & Monitoring**: Structured logging with observability tools

### Frontend Enhancements
- **State Management**: Implement a proper state management library for complex state management
- **Form Validation**: Enhanced client-side validation with better error handling
- **Advanced UI**: Animations, loading states, and micro-interactions
- **Internationalization**: Multi-language support

### AI-Powered Enhancements
While working through this challenge, I realized that an AI agent-based solution might be more effective than the current wizard-based aproach. Instead of patients filling out the wizard, they could have natural conversations with an AI agent that understands their needs, concerns, and preferences in context. The agent could ask follow-up questions, clarify requirements, and even provide emotional support during the intake process.

This would create a more human-centered experience while gathering richer data for matching. The AI could also continuously learn from successful matches and patient feedback to improve recommendations over time, making the entire platform more intelligent and personalized.