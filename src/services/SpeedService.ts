import {AllPlayersStoredTurns, StoredTurn} from "../game-progression-components/GameOn"
import _ from "lodash"

export const SpeedService = {
  setTurnsBySpeed: (allTurns: AllPlayersStoredTurns) => {
    const allTurnsList = [allTurns.playerOneTop, allTurns.playerOneBottom, allTurns.playerTwoTop, allTurns.playerTwoBottom]
    const correctOrder = allTurnsList.sort((a: StoredTurn, b: StoredTurn) => {
      // @ts-ignore
      return a.hero?.speed - b.hero?.speed
    })

    return _.reverse(correctOrder)
  }
}