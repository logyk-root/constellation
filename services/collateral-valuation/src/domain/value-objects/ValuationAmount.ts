/**
 * ValuationAmount Value Object
 * Represents a monetary amount for vehicle valuation
 */
export class ValuationAmount {
  private readonly amount: number
  private readonly currency: string

  constructor(amount: number, currency: string = 'USD') {
    this.validate(amount, currency)
    this.amount = amount
    this.currency = currency
  }

  private validate(amount: number, currency: string): void {
    if (amount < 0) {
      throw new Error('Valuation amount cannot be negative')
    }

    if (amount > 1000000) {
      throw new Error('Valuation amount exceeds maximum allowed value')
    }

    if (!currency || currency.length !== 3) {
      throw new Error('Currency must be a valid 3-letter code')
    }
  }

  getAmount(): number {
    return this.amount
  }

  getCurrency(): string {
    return this.currency
  }

  equals(other: ValuationAmount): boolean {
    return this.amount === other.amount && this.currency === other.currency
  }

  toString(): string {
    return `${this.currency} ${this.amount.toFixed(2)}`
  }

  toJSON() {
    return {
      amount: this.amount,
      currency: this.currency,
    }
  }
}
