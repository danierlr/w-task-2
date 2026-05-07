import { TradeVariant } from './TradeVariant'

type Fee = {
  variant: TradeVariant
  partDeducted: number
}

export type TradeSimulationConfig = {
  fees: Fee[]
}

// TODO use proper types for monetary values, like bigint

//

export class TradeSimulation {
  constructor(config: TradeSimulationConfig) {
    config.fees.forEach((fee) => {
      this.fees.set(fee.variant, fee.partDeducted)
    })
  }

  private shares: number = 0
  private money: number = 0

  private fees = new Map<TradeVariant, number>()

  /**
   *
   * @param amount
   * @param price
   * @param tradeVariant
   */
  public trade(shares: number, price: number, tradeVariant: TradeVariant) {
    let moneyGained = shares * price * -1
    let sharesGained = shares

    const fee = this.fees.get(tradeVariant)

    if (!fee) {
      throw new Error('Invalid operation ..')
    }

    if (shares > 0) {
      sharesGained = sharesGained * (1 - fee)
    } else {
      moneyGained = moneyGained * (1 - fee)
    }

    if (sharesGained + this.shares < 0) {
      throw new Error('Invalid operation: can not have negative shares')
    }

    this.money += moneyGained
    this.shares += sharesGained
  }

  public calculateProfit(): number {
    return this.money
  }
}
