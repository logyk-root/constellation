import { IVehicleValuationProvider } from '../../domain/ports/IVehicleValuationProvider'
import { VIN } from '../../domain/value-objects/VIN'
import { ValuationAmount } from '../../domain/value-objects/ValuationAmount'
import { VehicleValuation, ValuationCondition } from '../../domain/entities/VehicleValuation'

/**
 * NADA Vehicle Valuation Provider Service
 * Adapter that implements the IVehicleValuationProvider port for NADA
 * This is a concrete implementation in the Infrastructure layer
 */
export class NadaVehicleValuationProviderService
  implements IVehicleValuationProvider
{
  private readonly apiKey: string
  private readonly apiUrl: string

  constructor(apiKey?: string, apiUrl?: string) {
    this.apiKey = apiKey || process.env.NADA_API_KEY || ''
    this.apiUrl =
      apiUrl || process.env.NADA_API_URL || 'https://api.nadaguides.com'

    if (!this.apiKey) {
      console.warn('NADA API key not configured')
    }
  }

  getProviderName(): string {
    return 'NADA'
  }

  async getValueByVin(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation | null> {
    try {
      // TODO: Replace with actual NADA API call
      // This is a placeholder implementation
      const response = await this.callNadaAPI(vin.getValue(), mileage, condition)

      if (!response) {
        return null
      }

      return this.mapResponseToValuation(response, vin, mileage, condition)
    } catch (error) {
      console.error('NADA API error:', error)
      throw new Error(`NADA valuation failed: ${error}`)
    }
  }

  async isAvailable(): Promise<boolean> {
    // Check if API key is configured
    if (!this.apiKey) {
      return false
    }

    try {
      // TODO: Implement health check endpoint
      // For now, just return true if API key exists
      return true
    } catch (error) {
      console.error('NADA availability check failed:', error)
      return false
    }
  }

  getProviderMetadata() {
    return {
      name: 'NADA Guides',
      maxRequestsPerDay: 1000,
      averageResponseTime: 500, // ms
      supportedCountries: ['US'],
    }
  }

  /**
   * Call NADA API
   * @private
   */
  private async callNadaAPI(
    vin: string,
    mileage: number,
    condition: ValuationCondition
  ): Promise<any> {
    // TODO: Implement actual NADA API call
    // Example structure:
    /*
    const response = await fetch(`${this.apiUrl}/vehicle-valuations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vin,
        mileage,
        condition: this.mapConditionToNadaFormat(condition),
      }),
    })

    if (!response.ok) {
      throw new Error(`NADA API returned ${response.status}`)
    }

    return await response.json()
    */

    // Placeholder mock response for development
    return {
      vin,
      vehicle: {
        year: 2020,
        make: 'Toyota',
        model: 'Camry',
        trim: 'SE',
      },
      valuations: {
        tradeIn: 18500,
        retail: 23500,
        cleanTradeIn: 19200,
        roughTradeIn: 17800,
      },
      mileage,
      condition,
    }
  }

  /**
   * Map NADA API response to VehicleValuation entity
   * @private
   */
  private mapResponseToValuation(
    response: any,
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): VehicleValuation {
    return new VehicleValuation(
      vin,
      this.getProviderName(),
      new ValuationAmount(response.valuations.tradeIn),
      new ValuationAmount(response.valuations.retail),
      null, // NADA doesn't typically provide private party value
      condition,
      mileage,
      response.vehicle.year,
      response.vehicle.make,
      response.vehicle.model,
      response.vehicle.trim,
      new Date(),
      {
        cleanTradeIn: response.valuations.cleanTradeIn,
        roughTradeIn: response.valuations.roughTradeIn,
      }
    )
  }

  /**
   * Map internal condition to NADA format
   * @private
   */
  private mapConditionToNadaFormat(condition: ValuationCondition): string {
    const conditionMap: Record<ValuationCondition, string> = {
      [ValuationCondition.EXCELLENT]: 'excellent',
      [ValuationCondition.GOOD]: 'clean',
      [ValuationCondition.FAIR]: 'average',
      [ValuationCondition.POOR]: 'rough',
    }

    return conditionMap[condition]
  }
}
