# Constellation

AI-powered auto loan refinancing platform for Texas.

## Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/repo).

```
constellation/
├── apps/
│   └── web/              # Next.js customer-facing website
├── packages/
│   ├── ui/               # Shared shadcn/ui components
│   ├── validation/       # Zod schemas (shared validation)
│   ├── database/         # Prisma schema & client
│   ├── events/           # Event type definitions
│   └── api-client/       # Shared API client
├── services/             # AWS Lambda microservices
└── infrastructure/       # AWS CDK (IaC)
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, shadcn/ui, Tailwind CSS
- **Backend:** Node.js/TypeScript on AWS Lambda
- **Database:** PostgreSQL (AWS RDS)
- **Events:** AWS SNS + SQS
- **Cache:** Redis (AWS ElastiCache)
- **Storage:** AWS S3

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- AWS CLI configured

### Installation

```bash
# Install dependencies
npm install

# Run development servers
npm run dev

# Build all apps
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Development

```bash
# Run web app only
cd apps/web
npm run dev
```

## Environment Variables

See `.env.example` in each app/service for required environment variables.

## Deployment

- **Frontend:** Vercel (automatic deployment from `main` branch)
- **Backend:** AWS Lambda (via CDK)

## Contributing

This is a private project. All contributors must follow the code style and commit conventions.

## License

Proprietary - All rights reserved
