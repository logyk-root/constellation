import { VIN } from '../value-objects/VIN'
import { ValuationAmount } from '../value-objects/ValuationAmount'

export enum ValuationCondition {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export enum ValuationType {
  TRADE_IN = 'TRADE_IN',
  RETAIL = 'RETAIL',
  PRIVATE_PARTY = 'PRIVATE_PARTY',
}

/**
 * VehicleValuation Entity
 * Represents the complete valuation of a vehicle from a provider
 */
export class VehicleValuation {
  constructor(
    public readonly vin: VIN,
    public readonly provider: string,
    public readonly tradeInValue: ValuationAmount,
    public readonly retailValue: ValuationAmount,
    public readonly privatePartyValue: ValuationAmount | null,
    public readonly condition: ValuationCondition,
    public readonly mileage: number,
    public readonly year: number,
    public readonly make: string,
    public readonly model: string,
    public readonly trim: string | null,
    public readonly valuationDate: Date,
    public readonly metadata?: Record<string, any>
  ) {
    this.validate()
  }

  private validate(): void {
    if (this.mileage < 0) {
      throw new Error('Mileage cannot be negative')
    }

    if (this.year < 1900 || this.year > new Date().getFullYear() + 2) {
      throw new Error('Invalid vehicle year')
    }

    if (!this.make || !this.model) {
      throw new Error('Make and model are required')
    }
  }

  /**
   * Get the most conservative valuation (lowest value)
   */
  getConservativeValue(): ValuationAmount {
    return this.tradeInValue
  }

  /**
   * Get valuation by type
   */
  getValueByType(type: ValuationType): ValuationAmount | null {
    switch (type) {
      case ValuationType.TRADE_IN:
        return this.tradeInValue
      case ValuationType.RETAIL:
        return this.retailValue
      case ValuationType.PRIVATE_PARTY:
        return this.privatePartyValue
      default:
        return null
    }
  }

  /**
   * Check if valuation is recent (within 30 days)
   */
  isRecent(): boolean {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return this.valuationDate >= thirtyDaysAgo
  }

  toJSON() {
    return {
      vin: this.vin.getValue(),
      provider: this.provider,
      tradeInValue: this.tradeInValue.toJSON(),
      retailValue: this.retailValue.toJSON(),
      privatePartyValue: this.privatePartyValue?.toJSON() || null,
      condition: this.condition,
      mileage: this.mileage,
      year: this.year,
      make: this.make,
      model: this.model,
      trim: this.trim,
      valuationDate: this.valuationDate.toISOString(),
      metadata: this.metadata,
    }
  }
}
