import { IVehicleValuationProvider } from '../../domain/ports/IVehicleValuationProvider'
import { VIN } from '../../domain/value-objects/VIN'
import { ValuationAmount } from '../../domain/value-objects/ValuationAmount'
import { VehicleValuation, ValuationCondition } from '../../domain/entities/VehicleValuation'

/**
 * Kelley Blue Book (KBB) Vehicle Valuation Provider Service
 * Adapter that implements the IVehicleValuationProvider port for KBB
 */
export class KBBVehicleValuationProviderService
  implements IVehicleValuationProvider
{
  private readonly apiKey: string
  private readonly apiUrl: string

  constructor(apiKey?: string, apiUrl?: string) {
    this.apiKey = apiKey || process.env.KBB_API_KEY || ''
    this.apiUrl =
      apiUrl || process.env.KBB_API_URL || 'https://api.kbb.com'

    if (!this.apiKey) {
      console.warn('KBB API key not configured')
    }
  }

  getProviderName(): string {
    return 'KBB'
  }

  async getValueByVin(
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): Promise<VehicleValuation | null> {
    try {
      const response = await this.callKBBAPI(vin.getValue(), mileage, condition)

      if (!response) {
        return null
      }

      return this.mapResponseToValuation(response, vin, mileage, condition)
    } catch (error) {
      console.error('KBB API error:', error)
      throw new Error(`KBB valuation failed: ${error}`)
    }
  }

  async isAvailable(): Promise<boolean> {
    if (!this.apiKey) {
      return false
    }

    try {
      // TODO: Implement health check endpoint
      return true
    } catch (error) {
      console.error('KBB availability check failed:', error)
      return false
    }
  }

  getProviderMetadata() {
    return {
      name: 'Kelley Blue Book',
      maxRequestsPerDay: 1000,
      averageResponseTime: 600, // ms
      supportedCountries: ['US'],
    }
  }

  /**
   * Call KBB API
   * @private
   */
  private async callKBBAPI(
    vin: string,
    mileage: number,
    condition: ValuationCondition
  ): Promise<any> {
    // TODO: Implement actual KBB API call
    // Example structure:
    /*
    const response = await fetch(`${this.apiUrl}/v1/vehicle/vin/${vin}/value`, {
      method: 'GET',
      headers: {
        'x-api-key': this.apiKey,
        'Accept': 'application/json',
      },
      params: {
        mileage,
        condition: this.mapConditionToKBBFormat(condition),
      },
    })

    if (!response.ok) {
      throw new Error(`KBB API returned ${response.status}`)
    }

    return await response.json()
    */

    // Placeholder mock response for development
    return {
      vin,
      vehicleInfo: {
        year: 2020,
        make: 'Toyota',
        model: 'Camry',
        trim: 'SE Sedan 4D',
      },
      pricing: {
        dealerRetail: 24200,
        privateParty: 21500,
        tradeInValue: {
          excellent: 19500,
          good: 18200,
          fair: 16800,
        },
      },
      mileage,
      pricingDate: new Date().toISOString(),
    }
  }

  /**
   * Map KBB API response to VehicleValuation entity
   * @private
   */
  private mapResponseToValuation(
    response: any,
    vin: VIN,
    mileage: number,
    condition: ValuationCondition
  ): VehicleValuation {
    // KBB provides condition-specific trade-in values
    const tradeInValue = this.selectTradeInValueByCondition(
      response.pricing.tradeInValue,
      condition
    )

    return new VehicleValuation(
      vin,
      this.getProviderName(),
      new ValuationAmount(tradeInValue),
      new ValuationAmount(response.pricing.dealerRetail),
      new ValuationAmount(response.pricing.privateParty),
      condition,
      mileage,
      response.vehicleInfo.year,
      response.vehicleInfo.make,
      response.vehicleInfo.model,
      response.vehicleInfo.trim,
      new Date(response.pricingDate),
      {
        tradeInExcellent: response.pricing.tradeInValue.excellent,
        tradeInGood: response.pricing.tradeInValue.good,
        tradeInFair: response.pricing.tradeInValue.fair,
      }
    )
  }

  /**
   * Select appropriate trade-in value based on condition
   * @private
   */
  private selectTradeInValueByCondition(
    tradeInValues: any,
    condition: ValuationCondition
  ): number {
    const conditionMap: Record<ValuationCondition, string> = {
      [ValuationCondition.EXCELLENT]: 'excellent',
      [ValuationCondition.GOOD]: 'good',
      [ValuationCondition.FAIR]: 'fair',
      [ValuationCondition.POOR]: 'fair', // KBB doesn't have "poor", use fair
    }

    const mappedCondition = conditionMap[condition]
    return tradeInValues[mappedCondition] || tradeInValues.good
  }

  /**
   * Map internal condition to KBB format
   * @private
   */
  private mapConditionToKBBFormat(condition: ValuationCondition): string {
    const conditionMap: Record<ValuationCondition, string> = {
      [ValuationCondition.EXCELLENT]: 'Excellent',
      [ValuationCondition.GOOD]: 'Very Good',
      [ValuationCondition.FAIR]: 'Good',
      [ValuationCondition.POOR]: 'Fair',
    }

    return conditionMap[condition]
  }
}
