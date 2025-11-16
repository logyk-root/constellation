import { VIN } from '../value-objects/VIN'
import { VehicleValuation, ValuationCondition } from '../entities/VehicleValuation'

/**
 * Vehicle Valuation Provider Port
 * This interface defines the contract that all valuation providers must implement
 * Following the Dependency Inversion Principle (SOLID)
 */
export interface IVehicleValuationProvider {
  /**
   * Get the provider name
   */
  getProviderName(): string

  /**
   * Get vehicle valuation by VIN
   * @param vin - Vehicle Identification Number
   * @param mileage - Current vehicle mileage
   * @param condition - Vehicle condition
   * @returns VehicleValuation entity or null if not found
   */
  getValueByVin(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation | null>

  /**
   * Check if the provider is available/healthy
   */
  isAvailable(): Promise<boolean>

  /**
   * Get provider-specific configuration or limits
   */
  getProviderMetadata(): {
    name: string
    maxRequestsPerDay?: number
    averageResponseTime?: number
    supportedCountries: string[]
  }
}
