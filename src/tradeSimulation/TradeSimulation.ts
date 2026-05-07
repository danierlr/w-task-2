import { TradeVariant } from './TradeVariant'

type Fee = {
  variant: TradeVariant
  rate: number
}

export type TradeSimulationConfig = {
  fees: Fee[]
}

export class TradeSimulation {
  constructor(config: TradeSimulationConfig) {
    config.fees.forEach((fee) => {
      this.feeRates.set(fee.variant, fee.rate)
    })
  }

  private shares: number = 0
  private money: number = 0
  private accruedFees: number = 0

  private feeRates = new Map<TradeVariant, number>()

  /**
   *
   * @param sharesGained
   * @param price
   * @param tradeVariant
   */
  public trade(sharesGained: number, price: number, tradeVariant: TradeVariant) {
    const moneyGained = sharesGained * price * -1 // positive if we sell shares & negative otherwise

    const volume = Math.abs(moneyGained)
    const feeRate = this.feeRates.get(tradeVariant)

    if (feeRate === undefined) {
      throw new Error('Invalid operation: no fee rate found')
    }

    const fee = volume * feeRate

    this.accruedFees += fee
    this.money += moneyGained
    this.shares += sharesGained
  }

  public calculateNetProfitLoss(): number {
    return Math.round((this.money - this.accruedFees) * 100) / 100
  }
}
