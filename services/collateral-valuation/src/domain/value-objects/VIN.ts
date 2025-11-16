/**
 * VIN Value Object
 * Represents a Vehicle Identification Number with validation
 */
export class VIN {
  private readonly value: string

  constructor(vin: string) {
    this.validate(vin)
    this.value = vin.toUpperCase()
  }

  private validate(vin: string): void {
    if (!vin) {
      throw new Error('VIN cannot be empty')
    }

    // Remove whitespace
    const cleanVin = vin.trim().toUpperCase()

    // VIN must be exactly 17 characters
    if (cleanVin.length !== 17) {
      throw new Error('VIN must be exactly 17 characters')
    }

    // VIN cannot contain I, O, or Q
    if (/[IOQ]/.test(cleanVin)) {
      throw new Error('VIN cannot contain letters I, O, or Q')
    }

    // VIN must be alphanumeric
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(cleanVin)) {
      throw new Error('VIN must contain only valid characters')
    }
  }

  getValue(): string {
    return this.value
  }

  equals(other: VIN): boolean {
    return this.value === other.value
  }

  toString(): string {
    return this.value
  }
}
