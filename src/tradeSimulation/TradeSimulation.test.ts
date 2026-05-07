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
      partDeducted: 0.005,
    },
  ],
}

describe('..', () => {
  it('example 0', () => {
    const simulation = new TradeSimulation(commonConfig)

    simulation.trade(42, 2723.68, TradeVariant.MAKE)
    simulation.trade(-42, 2792.19, TradeVariant.TAKE)

    const profit = simulation.calculateNetProfitLoss()

    expect(profit).toEqual(2176.67)
  })

  it('example 1', () => {
    const simulation = new TradeSimulation(commonConfig)

    simulation.trade(12, 3321.74, TradeVariant.MAKE)
    simulation.trade(8, 3315.13, TradeVariant.TAKE)
    simulation.trade(-20, 3407.05, TradeVariant.MAKE)

    const profit = simulation.calculateNetProfitLoss()

    expect(profit).toEqual(1518.47)
  })

  it('example 2', () => {
    const simulation = new TradeSimulation(commonConfig)

    simulation.trade(-10, 740.7, TradeVariant.MAKE)
    simulation.trade(10, 750.8, TradeVariant.MAKE)
    simulation.trade(-7, 760.7, TradeVariant.TAKE)
    simulation.trade(7, 751.5, TradeVariant.MAKE)
    simulation.trade(5, 774.6, TradeVariant.TAKE)
    simulation.trade(-5, 729.7, TradeVariant.TAKE)

    const profit = simulation.calculateNetProfitLoss()

    expect(profit).toEqual(-345.51)
  })
})
