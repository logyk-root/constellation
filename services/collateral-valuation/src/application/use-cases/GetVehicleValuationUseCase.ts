import { CollateralValuationService, ValuationStrategy } from '../services/CollateralValuationService'
import { ValuationCondition } from '../../domain/entities/VehicleValuation'

export interface GetVehicleValuationRequest {
  vin: string
  mileage: number
  condition?: ValuationCondition
  strategy?: ValuationStrategy
}

export interface GetVehicleValuationResponse {
  success: boolean
  data?: any
  error?: string
}

/**
 * Get Vehicle Valuation Use Case
 * Orchestrates the vehicle valuation flow
 * This is the entry point for the application layer
 */
export class GetVehicleValuationUseCase {
  constructor(
    private readonly collateralValuationService: CollateralValuationService
  ) {}

  async execute(
    request: GetVehicleValuationRequest
  ): Promise<GetVehicleValuationResponse> {
    try {
      // Validate input
      if (!request.vin) {
        return {
          success: false,
          error: 'VIN is required',
        }
      }

      if (!request.mileage || request.mileage < 0) {
        return {
          success: false,
          error: 'Valid mileage is required',
        }
      }

      // Get valuation
      const valuation = await this.collateralValuationService.getValueByVin(
        request.vin,
        request.mileage,
        request.condition || ValuationCondition.GOOD,
        request.strategy || ValuationStrategy.FIRST_AVAILABLE
      )

      if (!valuation) {
        return {
          success: false,
          error: 'Unable to retrieve valuation. Please try again later.',
        }
      }

      // Return response
      return {
        success: true,
        data: Array.isArray(valuation)
          ? valuation.map((v) => v.toJSON())
          : valuation.toJSON(),
      }
    } catch (error) {
      console.error('Error in GetVehicleValuationUseCase:', error)

      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      }
    }
  }
}
