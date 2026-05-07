import { TradeVariant } from './TradeVariant'

type Fee = {
  variant: TradeVariant
  partDeducted: number
}

export type TradeSimulationConfig = {
  fees: Fee[]
}

export class TradeSimulation {
  constructor(config: TradeSimulationConfig) {
    config.fees.forEach((fee) => {
      this.feeParts.set(fee.variant, fee.partDeducted)
    })
  }

  private shares: number = 0
  private money: number = 0
  private accruedFees: number = 0

  private feeParts = new Map<TradeVariant, number>()

  /**
   *
   * @param amount
   * @param price
   * @param tradeVariant
   */
  public trade(sharesGained: number, price: number, tradeVariant: TradeVariant) {
    let moneyGained = sharesGained * price * -1

    const volume = Math.abs(moneyGained)
    const feePart = this.feeParts.get(tradeVariant)

    if (feePart === undefined) {
      throw new Error('Invalid operation: no fee found')
    }

    const fee = volume * feePart

    this.accruedFees += fee
    this.money += moneyGained
    this.shares += sharesGained
  }

  public calculateNetProfitLoss(): number {
    return Math.round((this.money - this.accruedFees) * 100) / 100
  }
}
