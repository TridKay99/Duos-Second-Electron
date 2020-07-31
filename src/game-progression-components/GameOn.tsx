import React from 'react'
import {GamePlayState, PlayerContent} from "./PlayDotaDuos"
import {Button, Grid, Message, Popup, Segment} from "semantic-ui-react"
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

export enum Player {
  ONE = 'one',
  TWO = 'two'
}

export enum BattlePosition {
  TOP = 'top',
  BOTTOM = 'bottom'
}

type Props = {
  playerOne: PlayerContent
  playerTwo: PlayerContent
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

type State = {
  battleMessages: JSX.Element[]
  showSwapDeadHeroModal: boolean
}

export class GameOn extends React.Component<Props, State> {

  state: State = {
    battleMessages: [],
    showSwapDeadHeroModal: false
  }

  // componentDidUpdate = () => {
  //   if(this.props.playerOne.activeHeroes.top?.fainted === true) {
  //     this.setState({showSwapDeadHeroModal: true})
  //     this.swapPlayerOneDeadTopHero()
  //   }
  // }

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
        ? this.whoToAttack(move, attackingHero, this.props.playerTwo.activeHeroes.top!, this.props.playerTwo.activeHeroes.bottom!, Player.ONE)
        : this.whoToAttack(move, attackingHero, this.props.playerOne.activeHeroes.top!, this.props.playerOne.activeHeroes.bottom!, Player.TWO)
    })
  }

  whoToAttack = (move: HeroMove, attackingHero: Hero, topHero: Hero, bottomHero: Hero, player: Player) => {
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
                      onClick={() => this.attackEnemy(move, attackingHero, topHero, player)} fluid />
            </Grid.Column>
            <Grid.Column>
              <Button color='blue'
                      content={bottomHero.name}
                      onClick={() => this.attackEnemy(move, attackingHero, bottomHero, player)} fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Popup>
    )
  }

  attackEnemy = (move: HeroMove, attackingHero: Hero, attackedHero: Hero, player: Player) => {
    if(move.moveTypes.includes(MoveType.DAMAGE)) {
      const damagedHero = MoveDamageService.attackHero(attackedHero, attackingHero, move)
      this.updatePlayerHealth(damagedHero, player)
    }

    this.sendBattleMessage(move, attackingHero, attackedHero)
  }

  updatePlayerHealth = (damagedHero: Hero, player: Player) => {
    player === Player.ONE
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
    const {
      playerOne,
      playerTwo,
    } = this.props
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