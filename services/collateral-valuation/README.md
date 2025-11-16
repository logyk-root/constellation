# Collateral Valuation Service

Vehicle collateral valuation service built with Domain Driven Design (DDD) and Hexagonal Architecture principles.

## Architecture

This service follows a clean architecture pattern with clear separation of concerns:

### Domain Layer
- **Value Objects**: `VIN`, `ValuationAmount`
- **Entities**: `VehicleValuation`
- **Ports**: `IVehicleValuationProvider`

Pure business logic with no external dependencies.

### Application Layer
- **Services**: `CollateralValuationService`
- **Use Cases**: `GetVehicleValuationUseCase`

Orchestrates business logic and implements valuation strategies.

### Infrastructure Layer
- **Adapters**: Provider implementations (NADA, KBB, Chrome Data)

Concrete implementations of domain ports.

### Presentation Layer
- **Handlers**: AWS Lambda handler with dependency injection

## Valuation Strategies

1. **FIRST_AVAILABLE**: Returns the first successful valuation
2. **MOST_CONSERVATIVE**: Returns the lowest valuation (most conservative)
3. **AVERAGE**: Returns average valuation across all providers
4. **ALL_PROVIDERS**: Returns valuations from all available providers

## API Endpoints

### POST /valuation
Get vehicle valuation by VIN.

**Request:**
```json
{
  "vin": "1HGBH41JXMN109186",
  "mileage": 45000,
  "condition": "GOOD",
  "strategy": "MOST_CONSERVATIVE"
}
```

**Response:**
```json
{
  "vin": "1HGBH41JXMN109186",
  "provider": "NADA",
  "tradeInValue": 18500,
  "retailValue": 23500,
  "year": 2020,
  "make": "Toyota",
  "model": "Camry",
  "valuationDate": "2025-11-16T..."
}
```

### GET /providers
Get list of available providers and their metadata.

**Response:**
```json
{
  "available": ["NADA", "KBB"],
  "metadata": [
    {
      "name": "NADA Guides",
      "maxRequestsPerDay": 1000,
      "averageResponseTime": 500,
      "supportedCountries": ["US"]
    }
  ]
}
```

## Development

### Install Dependencies
```bash
npm install
```

### Build
```bash
npm run build
```

### Test
```bash
npm test
```

### Environment Variables
Copy `.env.example` to `.env` and configure API keys:
```bash
cp .env.example .env
```

## Deployment

### Prerequisites
- AWS SAM CLI installed
- AWS credentials configured

### Deploy to AWS
```bash
sam build
sam deploy --guided
```

### Parameters
- `NadaApiKey`: NADA Guides API key
- `KBBApiKey`: Kelley Blue Book API key
- `ChromeApiKey`: Chrome Data API key

## Provider Integration Status

| Provider | Status | Notes |
|----------|--------|-------|
| NADA | Mock | API integration pending |
| KBB | Mock | API integration pending |
| Chrome Data | Mock | API integration pending |

## Future Enhancements

- [ ] Implement actual provider API integrations
- [ ] Add caching layer for valuations
- [ ] Add rate limiting per provider
- [ ] Add monitoring and alerting
- [ ] Add provider failover mechanisms
- [ ] Add bulk valuation endpoint
- [ ] Add historical valuation tracking
