import { TradeSimulation, TradeSimulationConfig } from '../tradeSimulation/TradeSimulation'
import { TradeVariant } from '../tradeSimulation/TradeVariant'

import readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'

type TradeInput {

}

export class ConsoleRunner {
  public run() {
    const rl = readline.createInterface({ input, output })

    rl.question('Input ', (inputStr: any) => {
      

      // TODO validation

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

      const simulation = new TradeSimulation(commonConfig)

			const trades = JSON.parse(inputStr)

			trades.forEach(trade => {
				const params = trade.split(';')

				const shares = parseFloat(trade[1]!)
				const price = parseFloat(trade[2]!)

				const action = trade[3]!
				const variant = trade[4]!

				
			})

			simulation.calculateProfit()

      rl.close()
    })
  }
}
