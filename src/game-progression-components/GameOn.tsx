import React from 'react'
import {GamePlayState, PlayerContent} from "./PlayDotaDuos"
import {Button, Grid, Message, Popup, Segment} from "semantic-ui-react"
import '../styling/game-on.css'
import _ from "lodash"
import {RecursivePick} from "../types/RecursivePick"
import {MoveDamageService} from "../services/MoveDamageService"
import {Hero} from "../types/Hero"
import {HeroMove} from "../types/HeroMove"
import {MoveType} from "../enums/MoveType"
import {TurnService} from "../services/TurnService"
import {SpeedService} from "../services/SpeedService"
import {GameOnHeader} from "./game-board/GameOnHeader"
import {PlayerOneBoard, PlayerTurnStatus} from "./game-board/PlayerOneBoard"
import {PlayerTwoBoard} from "./game-board/PlayerTwoBoard"

export enum Player {
  ONE = 'one',
  TWO = 'two'
}

export enum BattlePosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  PLAYER_ONE_TOP = 'playerOneTop',
  PLAYER_ONE_BOT = 'playerOneBot',
  PLAYER_TWO_TOP = 'playerTwoTop',
  PLAYER_TWO_BOT = 'playerTwoBot'
}

export type StoredTurn = {
  position: BattlePosition,
  hero: Hero | null,
  turnSelected: boolean,
  //TURN WILL BE ANYTHING FROM USING AN ATTACK MOVE -> SWITCHING HEROES
  turn: any | null,
  turnParams: any[]
}

export type AllPlayersStoredTurns = {
  playerOneTop: StoredTurn,
  playerOneBottom: StoredTurn,
  playerTwoTop: StoredTurn,
  playerTwoBottom: StoredTurn
}

type Props = {
  playerOne: PlayerContent
  playerTwo: PlayerContent
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

type GameState = {
  battleMessages: JSX.Element[]
  turnNumber: number
  beginTurn: boolean
  allTurns: AllPlayersStoredTurns
}

export class GameOn extends React.Component<Props, GameState> {

  state: GameState = {
    battleMessages: [],
    turnNumber: 1,
    beginTurn: false,
    allTurns: {
      playerOneTop: {
        position: BattlePosition.PLAYER_ONE_TOP,
        hero: this.props.playerOne.activeHeroes.top,
        turnSelected: false,
        turn: null,
        turnParams: []
      },
      playerOneBottom: {
        position: BattlePosition.PLAYER_ONE_BOT,
        hero: this.props.playerOne.activeHeroes.bottom,
        turnSelected: false,
        turn: null,
        turnParams: []
      },
      playerTwoTop: {
        position: BattlePosition.PLAYER_TWO_TOP,
        hero: this.props.playerTwo.activeHeroes.top,
        turnSelected: false,
        turn: null,
        turnParams: []
      },
      playerTwoBottom: {
        position: BattlePosition.PLAYER_TWO_BOT,
        hero: this.props.playerTwo.activeHeroes.bottom,
        turnSelected: false,
        turn: null,
        turnParams: []
      }
    },
  }

  componentDidUpdate = () => {
    let allTurns: AllPlayersStoredTurns = {...this.state.allTurns}

    const p1MovesSet = allTurns.playerOneTop.turnSelected && allTurns.playerOneBottom.turnSelected
    const p2MovesSet = allTurns.playerTwoTop.turnSelected && allTurns.playerTwoBottom.turnSelected

    if(p1MovesSet && p2MovesSet && !this.state.beginTurn) {
      const heroesInOrderOfSpeed = SpeedService.setTurnsBySpeed(allTurns)
      heroesInOrderOfSpeed[0].turn(heroesInOrderOfSpeed[0].turnParams[0],heroesInOrderOfSpeed[0].turnParams[1], heroesInOrderOfSpeed[0].turnParams[2], heroesInOrderOfSpeed[0].turnParams[3])

      setTimeout(() => {
        heroesInOrderOfSpeed[1].turn(heroesInOrderOfSpeed[1].turnParams[0], heroesInOrderOfSpeed[1].turnParams[1], heroesInOrderOfSpeed[1].turnParams[2], heroesInOrderOfSpeed[1].turnParams[3])
      }, 2000)

      setTimeout(() => {
        heroesInOrderOfSpeed[2].turn(heroesInOrderOfSpeed[2].turnParams[0], heroesInOrderOfSpeed[2].turnParams[1], heroesInOrderOfSpeed[2].turnParams[2], heroesInOrderOfSpeed[2].turnParams[3])
      }, 4000)

      setTimeout(() => {
        heroesInOrderOfSpeed[3].turn(heroesInOrderOfSpeed[3].turnParams[0], heroesInOrderOfSpeed[3].turnParams[1], heroesInOrderOfSpeed[3].turnParams[2], heroesInOrderOfSpeed[3].turnParams[3],
        this.setState({turnNumber: this.state.turnNumber + 1}))
      }, 6000)

      const allTurnsWiped = TurnService.wipeAllTurns(allTurns)
      this.setState({beginTurn: true, allTurns: allTurnsWiped})
    }
  }

  renderMoveButtons = (moves: HeroMove[], attackingHero: Hero, player: PlayerContent) => {
    return moves.map((move) => {
      return player.player === Player.ONE
        ? this.whoToAttack(move, attackingHero, this.props.playerTwo.activeHeroes.top!, this.props.playerTwo.activeHeroes.bottom!, Player.ONE, this.props.playerOne)
        : this.whoToAttack(move, attackingHero, this.props.playerOne.activeHeroes.top!, this.props.playerOne.activeHeroes.bottom!, Player.TWO, this.props.playerTwo)
    })
  }

  whoToAttack = (move: HeroMove, attackingHero: Hero, topHero: Hero, bottomHero: Hero, playerNumber: Player, playerContent: PlayerContent) => {
    return (
      <Popup wide
             trigger={
               <Button color={"blue"}
                       content={`${move.name}`}/>} on={'click'}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button color='blue'
                      content={topHero.name}
                      onClick={() => this.attackEnemyNew(move, attackingHero, topHero, playerNumber, playerContent)}
                      fluid />
            </Grid.Column>
            <Grid.Column>
              <Button color='blue'
                      content={bottomHero.name}
                      onClick={() => this.attackEnemyNew(move, attackingHero, bottomHero, playerNumber, playerContent)}
                      fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Popup>
    )
  }

  attackEnemyNew = (move: HeroMove, attackingHero: Hero, attackedHero: Hero, playerNumber: Player, playerContent: PlayerContent) => {
    if(move.moveTypes.includes(MoveType.DAMAGE)) {
      const turns = TurnService.basicAttack(
        this.state.allTurns,
        move,
        attackingHero,
        attackedHero,
        playerNumber,
        playerContent,
        this.attackEnemy)

      if(turns) {
        this.setState({allTurns: turns})
      }
    }
  }

  attackEnemy = (move: HeroMove, attackingHero: Hero, damagedHero: Hero, player: Player) => {
    this.updatePlayerHealth(move, damagedHero, player)
    this.sendBattleMessage(move, attackingHero, damagedHero)
  }

  updatePlayerHealth = (move: HeroMove, damagedHero: Hero, playerNumber: Player) => {
    playerNumber === Player.ONE
      ? this.updatedPlayerTwoHealth(move, damagedHero)
      : this.updatedPlayerOneHealth(move, damagedHero)
  }

  updatedPlayerOneHealth = (move: HeroMove, damagedHero: Hero) => {
    const playerOne = damagedHero.name === this.props.playerOne.activeHeroes.top?.name
      ? MoveDamageService.updatePlayerOneTop(this.props.playerOne, damagedHero, move)
      : MoveDamageService.updatePlayerOneBottom(this.props.playerOne, damagedHero, move)
      this.props.handleChange({playerOne})
  }

  updatedPlayerTwoHealth = (move: HeroMove, damagedHero: Hero) => {
    const playerTwo = damagedHero.name === this.props.playerTwo.activeHeroes.top?.name
      ? MoveDamageService.updatePlayerTwoTop(this.props.playerTwo, damagedHero, move)
      : MoveDamageService.updatePlayerTwoBottom(this.props.playerTwo, damagedHero, move)
    this.props.handleChange({playerTwo})
  }

  sendBattleMessage = (move: HeroMove, attackingHero: Hero, attackedHero: Hero) => {
    const newMessage = attackedHero.health > 0
      ? <Message content={`${attackingHero.name} attacked ${attackedHero.name} with ${move.name} doing ${move.damage} damage.`} size={'small'}/>
      : <Message error content={`${attackingHero.name} attacked ${attackedHero.name} with ${move.name} doing ${move.damage} damage. ${attackedHero.name} is fucking dead!`} size={'small'}/>

    let battleMessages = this.state.battleMessages.concat(newMessage)

    if(battleMessages.length > 7) {
      const messageToRemove = _.head(battleMessages)
      battleMessages = battleMessages.filter(message => message !== messageToRemove)
    }

    this.setState({battleMessages})
  }

  render() {
    const { playerOne, playerTwo } = this.props
    const { turnNumber, allTurns } = this.state
    const playerOneTopHero = playerOne.activeHeroes.top!
    const playerOneBottomHero = playerOne.activeHeroes.bottom!
    const playerTwoTopHero = playerTwo.activeHeroes.top!
    const playerTwoBottomHero = playerTwo.activeHeroes.bottom!

    return (
      <React.Fragment>
        {playerOne.activeHeroes.top && playerOne.activeHeroes.bottom && playerTwo.activeHeroes.top && playerTwo.activeHeroes.bottom &&
          <React.Fragment>
            <GameOnHeader turnNumber={this.state.turnNumber}
                          playerOne={this.props.playerOne}
                          playerTwo={this.props.playerTwo}/>
            <Grid columns={3} divided>
              <Grid.Row stretched>
                <PlayerOneBoard playerOne={playerOne}
                                p1TOP={playerOneTopHero}
                                p1BOT={playerOneBottomHero}
                                allTurns={allTurns}
                                renderMoveButtons={this.renderMoveButtons}
                                handleChange={this.props.handleChange}
                                turnNumber={turnNumber}
                />
                <Grid.Column>
                  <Segment>
                    {this.state.battleMessages}
                  </Segment>
                </Grid.Column>
                <PlayerTwoBoard playerTwo={playerTwo}
                                P2TOP={playerTwoTopHero}
                                p2BOT={playerTwoBottomHero}
                                allTurns={allTurns}
                                renderMoveButtons={this.renderMoveButtons}
                                handleChange={this.props.handleChange}
                                turnNumber={turnNumber}
                />
              </Grid.Row>
            </Grid>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}