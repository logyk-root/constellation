import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { CollateralValuationService } from '../../application/services/CollateralValuationService'
import { GetVehicleValuationUseCase } from '../../application/use-cases/GetVehicleValuationUseCase'
import { NadaVehicleValuationProviderService } from '../../infrastructure/providers/NadaVehicleValuationProviderService'
import { KBBVehicleValuationProviderService } from '../../infrastructure/providers/KBBVehicleValuationProviderService'
import { ChromeVehicleValuationProviderService } from '../../infrastructure/providers/ChromeVehicleValuationProviderService'

/**
 * Dependency Injection Container
 * Initialize all dependencies and wire them together
 */
function initializeDependencies() {
  // Infrastructure layer - Create provider instances
  const providers = [
    new NadaVehicleValuationProviderService(),
    new KBBVehicleValuationProviderService(),
    new ChromeVehicleValuationProviderService(),
  ]

  // Application layer - Create service with providers
  const collateralValuationService = new CollateralValuationService(providers)

  // Application layer - Create use case with service
  const getVehicleValuationUseCase = new GetVehicleValuationUseCase(
    collateralValuationService
  )

  return {
    getVehicleValuationUseCase,
    collateralValuationService,
  }
}

// Initialize dependencies (singleton for Lambda container reuse)
const dependencies = initializeDependencies()

/**
 * Lambda Handler
 * Entry point for AWS Lambda
 * Routes requests to appropriate use cases
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', JSON.stringify(event, null, 2))

  try {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
      return createResponse(200, { message: 'OK' })
    }

    // Parse request body
    const body = event.body ? JSON.parse(event.body) : {}

    // Route to appropriate handler
    switch (event.httpMethod) {
      case 'POST':
        return await handleGetValuation(body)

      case 'GET':
        if (event.path.includes('/providers')) {
          return await handleGetProviders()
        }
        return createResponse(400, { error: 'Invalid GET endpoint' })

      default:
        return createResponse(405, { error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Lambda error:', error)

    return createResponse(500, {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

/**
 * Handle POST /valuation
 * Get vehicle valuation by VIN
 */
async function handleGetValuation(body: any): Promise<APIGatewayProxyResult> {
  const { vin, mileage, condition, strategy } = body

  // Validate required fields
  if (!vin || !mileage) {
    return createResponse(400, {
      error: 'Missing required fields',
      required: ['vin', 'mileage'],
    })
  }

  // Execute use case
  const result = await dependencies.getVehicleValuationUseCase.execute({
    vin,
    mileage,
    condition,
    strategy,
  })

  if (!result.success) {
    return createResponse(400, {
      error: result.error,
    })
  }

  return createResponse(200, result.data)
}

/**
 * Handle GET /providers
 * Get list of available providers and their metadata
 */
async function handleGetProviders(): Promise<APIGatewayProxyResult> {
  const availableProviders =
    await dependencies.collateralValuationService.getAvailableProviders()

  const providersMetadata =
    dependencies.collateralValuationService.getProvidersMetadata()

  return createResponse(200, {
    available: availableProviders,
    metadata: providersMetadata,
  })
}

/**
 * Create API Gateway response with CORS headers
 */
function createResponse(
  statusCode: number,
  body: any
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify(body),
  }
}
