import { TradeSimulation, TradeSimulationConfig } from './TradeSImulation'
import { TradeVariant } from './TradeVariant'

const commonConfig: TradeSimulationConfig = {
  fees: [
    {
      variant: TradeVariant.MAKE,
      partDeducted: 0.001,
    },
    {
      variant: TradeVariant.TAKE,
      partDeducted: 0.004,
    },
  ],
}

describe('..', () => {
  it('1', () => {
    const simulation = new TradeSimulation(commonConfig)

    simulation.trade(2723.68, 42, TradeVariant.MAKE)
    simulation.trade(-2792.19, 42, TradeVariant.TAKE)

    const profit = simulation.calculateProfit()

    expect(profit).toEqual(2176.67)
  })
})
