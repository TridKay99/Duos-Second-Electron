import {HeroMove} from "../types/HeroMove"
import {Hero} from "../types/Hero"
import {AllPlayersStoredTurns, BattlePosition, Player, StoredTurn} from "../game-progression-components/GameOn"
import {ActiveHeroes} from "../game-progression-components/PlayDotaDuos"
import _ from "lodash"
import {SpeedService} from "./SpeedService"

export enum TurnType {
  BASIC_ATTACK = 'basic_attack',
  SWAP_HERO = 'swap_hero'
}

export const TurnService = {
  setBasicAttack: (allTurns: AllPlayersStoredTurns,
                   move: HeroMove,
                   attackingHero: Hero,
                   attackedHero: Hero,
                   player: Player,
                   func: any) => {

    let heroToMatch = Object.values(allTurns).find(it => _.isEqual(it.hero?.name, attackingHero.name))

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
    turns.playerOneTop.turnType = TurnType.BASIC_ATTACK
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
    turns.playerOneBottom.turnType = TurnType.BASIC_ATTACK
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
    turns.playerTwoTop.turnType = TurnType.BASIC_ATTACK
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
    turns.playerTwoBottom.turnType = TurnType.BASIC_ATTACK
    return turns
  },

  regenHealth: (heroes: ActiveHeroes) => {
    if(heroes) {
      let heroesSpread = {...heroes}
      heroesSpread.top!.health = heroesSpread.top?.health! + heroesSpread.top?.healthRegen!
      return heroesSpread
    }
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
    turn.turnType = null
    return turn
  },

  swapTurn: () => {
    return 'hello'
  },

  runTurns: (allTurns: AllPlayersStoredTurns) => {
    const heroesInOrderOfSpeed = SpeedService.setTurnsBySpeed(allTurns)
      TurnService.doBasicAttack(heroesInOrderOfSpeed[0])

    setTimeout(() => {
      TurnService.doBasicAttack(heroesInOrderOfSpeed[1])
    }, 2000)

    setTimeout(() => {
      TurnService.doBasicAttack(heroesInOrderOfSpeed[2])
    }, 4000)

    return setTimeout(() => {
      TurnService.doBasicAttack(heroesInOrderOfSpeed[3])
    }, 6000)
  },

  doBasicAttack: (heroTurn: StoredTurn) => {
    return heroTurn.turn(heroTurn.turnParams[0],heroTurn.turnParams[1], heroTurn.turnParams[2], heroTurn.turnParams[3])
  }
}
