import React from 'react'
import {GamePlayState, PlayerContent} from "./PlayDotaDuos"
import {Button, Grid, Message, Modal, Popup, Segment} from "semantic-ui-react"
import {HeroImageUrl} from "../dota-data/heroes"
import '../styling/game-on.css'
import _ from "lodash"
import {SwitchHeroButton} from "./game-board/SwitchHeroButton"
import {RecursivePick} from "../types/RecursivePick"
import {MoveDamageService} from "../services/MoveDamageService"
import {Hero} from "../types/Hero"
import {ImageSize} from "../enums/ImageSize"
import {HeroMove} from "../types/HeroMove"
import {MoveType} from "../enums/MoveType"
import {TurnService} from "../services/TurnService"

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

export type AllPlayersStoredTruns = {
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

type State = {
  battleMessages: JSX.Element[]
  turnNumber: number
  beginTurn: boolean
  allTurns: AllPlayersStoredTruns
}

export class GameOn extends React.Component<Props, State> {

  state: State = {
    battleMessages: [],
    turnNumber: 0,
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
    }
  }

  componentDidUpdate = () => {
    let allTurns = {...this.state.allTurns}

    const p1MovesSet = allTurns.playerOneTop.turnSelected && allTurns.playerOneBottom.turnSelected
    const p2MovesSet = allTurns.playerTwoTop.turnSelected && allTurns.playerTwoBottom.turnSelected

    if(allTurns.playerOneTop.turn && !this.state.beginTurn) {
      allTurns.playerOneTop.turn(allTurns.playerOneTop.turnParams[0], allTurns.playerOneTop.turnParams[1], allTurns.playerOneTop.turnParams[2], allTurns.playerOneTop.turnParams[3])

      allTurns.playerOneTop.turn = null
      allTurns.playerOneTop.turnSelected = false
      allTurns.playerOneTop.turnParams = []
      this.setState({beginTurn: true, allTurns})
    }

    if(p1MovesSet && p2MovesSet) {
      allTurns.playerOneTop.turn()
      // allTurns.playerOneBottom.turn()
      // allTurns.playerTwoTop.turn()
      // allTurns.playerOneBottom.turn()
    }
  }

  createPlayerTeamPictures = (heroes: Hero[]) => {
    return heroes.map((hero, index) => {
      return (
        <Grid.Column key={index}>
          <img src={HeroImageUrl(hero.name, ImageSize.SMALL)}/>
        </Grid.Column>
      )
    })
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
    console.log('COMES INTO HERE')
    this.updatePlayerHealth(damagedHero, player)
    this.sendBattleMessage(move, attackingHero, damagedHero)
  }

  updatePlayerHealth = (damagedHero: Hero, playerNumber: Player) => {
    playerNumber === Player.ONE
      ? this.updatedPlayerTwoHealth(damagedHero)
      : this.updatedPlayerOneHealth(damagedHero)
  }

  updatedPlayerOneHealth = (damagedHero: Hero) => {
    const playerOne = damagedHero.name === this.props.playerOne.activeHeroes.top?.name
      ? MoveDamageService.updatePlayerOneTop(this.props.playerOne, damagedHero)
      : MoveDamageService.updatePlayerOneBottom(this.props.playerOne, damagedHero)
      this.props.handleChange({playerOne})
  }

  updatedPlayerTwoHealth = (damagedHero: Hero) => {
    const playerTwo = damagedHero.name === this.props.playerTwo.activeHeroes.top?.name
      ? MoveDamageService.updatePlayerTwoTop(this.props.playerTwo, damagedHero)
      : MoveDamageService.updatePlayerTwoBottom(this.props.playerTwo, damagedHero)

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
    const playerOneTopHero = playerOne.activeHeroes.top!
    const playerOneBottomHero = playerOne.activeHeroes.bottom!
    const playerTwoTopHero = playerTwo.activeHeroes.top!
    const playerTwoBottomHero = playerTwo.activeHeroes.bottom!
    return (
      <React.Fragment>
        {playerOne.activeHeroes.top && playerOne.activeHeroes.bottom && playerTwo.activeHeroes.top && playerTwo.activeHeroes.bottom &&
          <React.Fragment>
            <div className={'top_of_play_board'}>
              <Grid>
                {this.createPlayerTeamPictures(playerOne.heroes)}
                <Grid.Column width={5}/>
                {this.createPlayerTeamPictures(playerTwo.heroes)}
              </Grid>
            </div>
            <br/>
            <Grid columns={3} divided>
              <Grid.Row stretched>
                <Grid.Column>
                  <div className={'top_left_moves_and_buttons'}>
                    <img src={HeroImageUrl(playerOneTopHero.name, ImageSize.MEDIUM)} alt={''}/>
                    <Button.Group vertical>
                      {this.renderMoveButtons(playerOneTopHero.moves!, playerOneTopHero, playerOne)}
                    </Button.Group>
                  </div>
                  {/*TOP LEFT HEALTH & EXCHANGE*/}
                  <div className={'top_left_hero_exchange_and_health_info'}>
                    <SwitchHeroButton player={this.props.playerOne}
                                      heroBeingSwitched={playerOneTopHero}
                                      handleChange={this.props.handleChange}
                                      battlePosition={BattlePosition.TOP}
                    />
                    <div className={'health_info'}>
                      <p>Health:{playerOneTopHero.health}</p>
                      <p>Health Regen:{playerOneTopHero.healthRegen}</p>
                      <p>Armour:{playerOneTopHero.armour}</p>
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <div className={'bottom_left_moves_and_buttons'}>
                    <img src={HeroImageUrl(playerOneBottomHero.name, ImageSize.MEDIUM)} alt={''}/>
                    <Button.Group vertical>
                      {this.renderMoveButtons(playerOneBottomHero.moves!, playerOneBottomHero, playerOne)}
                    </Button.Group>
                  </div>
                  {/*BOTTOM LEFT HEALTH & EXCHANGE*/}
                  <div className={'top_left_hero_exchange_and_health_info'}>
                    <SwitchHeroButton player={this.props.playerOne}
                                      heroBeingSwitched={playerOneBottomHero}
                                      handleChange={this.props.handleChange}
                                      battlePosition={BattlePosition.BOTTOM}
                    />
                    <div className={'health_info'}>
                      <p>Health:{playerOneBottomHero.health}</p>
                      <p>Health Regen:{playerOneBottomHero.healthRegen}</p>
                      <p>Armour:{playerOneBottomHero.armour}</p>
                    </div>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  {/*MESSAGE AREA*/}
                  <Segment>
                    {this.state.battleMessages}
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <div className={'top_right_moves_and_buttons'}>
                    <Button.Group vertical>
                      {this.renderMoveButtons(playerTwoTopHero.moves!, playerTwoTopHero, playerTwo)}
                    </Button.Group>
                    <img src={HeroImageUrl(playerTwoTopHero.name, ImageSize.MEDIUM)} alt={''}/>
                  </div>
                  {/*TOP RIGHT HEALTH & EXCHANGE*/}
                  <div className={'right_side_health_info_container'}>
                    <div className={'right_hero_exchange_and_health_info'}>
                      <div className={'health_info'}>
                        <p>Health:        {playerTwoTopHero.health}</p>
                        <p>Health Regen:  {playerTwoTopHero.healthRegen}</p>
                        <p>Armour:        {playerTwoTopHero.armour}</p>
                      </div>
                      <SwitchHeroButton player={this.props.playerTwo}
                                        heroBeingSwitched={playerTwoTopHero}
                                        handleChange={this.props.handleChange}
                                        battlePosition={BattlePosition.TOP}
                      />
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <div className={'bottom_right_moves_and_buttons'}>
                    <Button.Group vertical>
                      {this.renderMoveButtons(playerTwoBottomHero.moves!, playerTwoBottomHero, playerTwo)}
                    </Button.Group>
                    <img src={HeroImageUrl(playerTwoBottomHero.name, ImageSize.MEDIUM)} alt={''}/>
                  </div>
                  {/*BOTTOM RIGHT HEALTH & EXCHANGE*/}
                  <div className={'right_side_health_info_container'}>
                    <div className={'right_hero_exchange_and_health_info'}>
                      <div className={'health_info'}>
                        <p>Health:        {playerTwoBottomHero.health}</p>
                        <p>Health Regen:  {playerTwoBottomHero.healthRegen}</p>
                        <p>Armour:        {playerTwoBottomHero.armour}</p>
                      </div>
                      <SwitchHeroButton player={this.props.playerTwo}
                                        heroBeingSwitched={playerTwoBottomHero}
                                        handleChange={this.props.handleChange}
                                        battlePosition={BattlePosition.BOTTOM}
                      />
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}