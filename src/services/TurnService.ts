import {HeroMove} from "../types/HeroMove"
import {Hero} from "../types/Hero"
import {AllPlayersStoredTurns, BattlePosition, Player, StoredTurn} from "../game-progression-components/GameOn"
import {PlayerContent} from "../game-progression-components/PlayDotaDuos"
import _ from "lodash"


export const TurnService = {
  basicAttack: (allTurns: AllPlayersStoredTurns,
                move: HeroMove,
                attackingHero: Hero,
                attackedHero: Hero,
                player: Player,
                playerContent: PlayerContent,
                func: any) => {

    let heroToMatch = Object.values(allTurns).find(it => _.isEqual(it.hero, attackingHero))
    
    if(heroToMatch) {
      if( heroToMatch.position === BattlePosition.PLAYER_ONE_TOP){return TurnService.playerOneTopTurn(allTurns, attackingHero, attackedHero, move, func, player)}
      else if(heroToMatch.position === BattlePosition.PLAYER_ONE_BOT){return TurnService.playerOneBotTurn(allTurns, attackingHero, attackedHero, move, func, player)}
      else if(heroToMatch.position === BattlePosition.PLAYER_TWO_TOP){return TurnService.playerTwoTopTurn(allTurns, attackingHero, attackedHero, move, func, player)}
      return TurnService.playerTwoBotTurn(allTurns, attackingHero, attackedHero, move, func, player)
    }
  },

  playerOneTopTurn: (allTurns: AllPlayersStoredTurns,
                     attackingHero: Hero,
                     attackedHero: Hero,
                     move: HeroMove,
                     func: any,
                     player: Player) => {
    let turns = {...allTurns}
    turns.playerOneTop.turnSelected = true
    turns.playerOneTop.turn = func
    turns.playerOneTop.turnParams = [move, attackingHero, attackedHero, player]

    return turns
  },

  playerOneBotTurn: (allTurns: AllPlayersStoredTurns,
                     attackingHero: Hero,
                     attackedHero: Hero,
                     move: HeroMove,
                     func: any,
                     player: Player) => {
    let turns = {...allTurns}
    turns.playerOneBottom.turnSelected = true
    turns.playerOneBottom.turn = func
    turns.playerOneBottom.turnParams = [move, attackingHero, attackedHero, player]

    return turns
  },

  playerTwoTopTurn: (allTurns: AllPlayersStoredTurns,
                     attackingHero: Hero,
                     attackedHero: Hero,
                     move: HeroMove,
                     func: any,
                     player: Player) => {
    let turns = {...allTurns}
    turns.playerTwoTop.turnSelected = true
    turns.playerTwoTop.turn = func
    turns.playerTwoTop.turnParams = [move, attackingHero, attackedHero, player]

    return turns
  },

  playerTwoBotTurn: (allTurns: AllPlayersStoredTurns,
                     attackingHero: Hero,
                     attackedHero: Hero,
                     move: HeroMove,
                     func: any,
                     player: Player) => {
    let turns = {...allTurns}
    turns.playerTwoBottom.turnSelected = true
    turns.playerTwoBottom.turn = func
    turns.playerTwoBottom.turnParams = [move, attackingHero, attackedHero, player]

    return turns
  },

  wipeAllTurns: (allTurns: AllPlayersStoredTurns) => {
    let turns = {...allTurns}
    turns.playerOneTop = TurnService.wipeTurn(turns.playerOneTop)
    turns.playerOneBottom = TurnService.wipeTurn(turns.playerOneBottom)
    turns.playerTwoBottom = TurnService.wipeTurn(turns.playerTwoBottom)
    turns.playerTwoTop = TurnService.wipeTurn(turns.playerTwoTop)

    return turns
  },

  wipeTurn: (storedTurn: StoredTurn) => {
    let turn = {...storedTurn}
    turn.turnSelected = false
    turn.turnParams = []
    turn.turn = null
    return turn
  }
}
