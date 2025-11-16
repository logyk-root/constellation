import { IVehicleValuationProvider } from '../../domain/ports/IVehicleValuationProvider'
import { VIN } from '../../domain/value-objects/VIN'
import { VehicleValuation, ValuationCondition } from '../../domain/entities/VehicleValuation'

export enum ValuationStrategy {
  /**
   * Use the first available provider
   */
  FIRST_AVAILABLE = 'FIRST_AVAILABLE',

  /**
   * Query all providers and return the most conservative (lowest) valuation
   */
  MOST_CONSERVATIVE = 'MOST_CONSERVATIVE',

  /**
   * Query all providers and return the average valuation
   */
  AVERAGE = 'AVERAGE',

  /**
   * Query all providers and return all valuations
   */
  ALL_PROVIDERS = 'ALL_PROVIDERS',
}

/**
 * Collateral Valuation Service
 * Application service that coordinates valuation requests across multiple providers
 * This is the main service that the application uses (Domain Service)
 */
export class CollateralValuationService {
  private providers: IVehicleValuationProvider[]

  constructor(providers: IVehicleValuationProvider[]) {
    if (!providers || providers.length === 0) {
      throw new Error('At least one valuation provider is required')
    }
    this.providers = providers
  }

  /**
   * Get vehicle valuation by VIN using the specified strategy
   */
  async getValueByVin(
    vinString: string,
    mileage: number,
    condition: ValuationCondition = ValuationCondition.GOOD,
    strategy: ValuationStrategy = ValuationStrategy.FIRST_AVAILABLE
  ): Promise<VehicleValuation | VehicleValuation[] | null> {
    const vin = new VIN(vinString)

    switch (strategy) {
      case ValuationStrategy.FIRST_AVAILABLE:
        return this.getFirstAvailableValuation(vin, mileage, condition)

      case ValuationStrategy.MOST_CONSERVATIVE:
        return this.getMostConservativeValuation(vin, mileage, condition)

      case ValuationStrategy.AVERAGE:
        return this.getAverageValuation(vin, mileage, condition)

      case ValuationStrategy.ALL_PROVIDERS:
        return this.getAllProviderValuations(vin, mileage, condition)

      default:
        throw new Error(`Unknown valuation strategy: ${strategy}`)
    }
  }

  /**
   * Get valuation from the first available provider
   */
  private async getFirstAvailableValuation(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation | null> {
    for (const provider of this.providers) {
      try {
        const isAvailable = await provider.isAvailable()
        if (!isAvailable) {
          console.warn(`Provider ${provider.getProviderName()} is not available`)
          continue
        }

        const valuation = await provider.getValueByVin(vin, mileage, condition)
        if (valuation) {
          return valuation
        }
      } catch (error) {
        console.error(`Error getting valuation from ${provider.getProviderName()}:`, error)
        // Continue to next provider
      }
    }

    return null
  }

  /**
   * Get valuations from all providers and return the most conservative
   */
  private async getMostConservativeValuation(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation | null> {
    const valuations = await this.getAllProviderValuations(vin, mileage, condition)

    if (!valuations || valuations.length === 0) {
      return null
    }

    // Return the valuation with the lowest trade-in value
    return valuations.reduce((lowest, current) => {
      return current.getConservativeValue().getAmount() <
        lowest.getConservativeValue().getAmount()
        ? current
        : lowest
    })
  }

  /**
   * Get average valuation from all providers
   */
  private async getAverageValuation(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation | null> {
    const valuations = await this.getAllProviderValuations(vin, mileage, condition)

    if (!valuations || valuations.length === 0) {
      return null
    }

    // Calculate average trade-in, retail, and private party values
    const avgTradeIn =
      valuations.reduce((sum, v) => sum + v.tradeInValue.getAmount(), 0) /
      valuations.length

    const avgRetail =
      valuations.reduce((sum, v) => sum + v.retailValue.getAmount(), 0) /
      valuations.length

    // Use the first valuation as a template
    const template = valuations[0]

    return new VehicleValuation(
      vin,
      'AVERAGE',
      template.tradeInValue.constructor(avgTradeIn),
      template.retailValue.constructor(avgRetail),
      null,
      condition,
      mileage,
      template.year,
      template.make,
      template.model,
      template.trim,
      new Date(),
      {
        providersUsed: valuations.map((v) => v.provider),
        valuationCount: valuations.length,
      }
    )
  }

  /**
   * Get valuations from all available providers
   */
  private async getAllProviderValuations(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation[]> {
    const valuationPromises = this.providers.map(async (provider) => {
      try {
        const isAvailable = await provider.isAvailable()
        if (!isAvailable) {
          return null
        }

        return await provider.getValueByVin(vin, mileage, condition)
      } catch (error) {
        console.error(`Error getting valuation from ${provider.getProviderName()}:`, error)
        return null
      }
    })

    const results = await Promise.all(valuationPromises)
    return results.filter((v): v is VehicleValuation => v !== null)
  }

  /**
   * Get list of available providers
   */
  async getAvailableProviders(): Promise<string[]> {
    const availabilityChecks = await Promise.all(
      this.providers.map(async (provider) => ({
        name: provider.getProviderName(),
        available: await provider.isAvailable(),
      }))
    )

    return availabilityChecks.filter((p) => p.available).map((p) => p.name)
  }

  /**
   * Get provider metadata
   */
  getProvidersMetadata() {
    return this.providers.map((p) => p.getProviderMetadata())
  }
}
