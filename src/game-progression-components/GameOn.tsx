import React from 'react'
import {ActiveHeroes, GamePlayState, PlayerContent} from "./PlayDotaDuos"
import {Button, Grid, Icon, Message, Popup, Segment} from "semantic-ui-react"
import {Hero, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/game-on.css'
import {HeroMove} from "../dota-data/moves"
import _ from "lodash"
import {SwitchHeroButton} from "./game-board/SwitchHeroButton"
import {RecursivePick} from "../types/RecursivePick"

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
}

export class GameOn extends React.Component<Props, State> {

  state: State = {
    battleMessages: []
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
      if(player.player === Player.ONE) {
        return this.whoToAttack(move, attackingHero, this.props.playerTwo.activeHeroes.top!, this.props.playerTwo.activeHeroes.bottom!)
      } else {
        return this.whoToAttack(move, attackingHero, this.props.playerOne.activeHeroes.top!, this.props.playerOne.activeHeroes.bottom!)
      }
    })
  }

  whoToAttack = (move: HeroMove, attackingHero: Hero, topHero: Hero, bottomHero: Hero) => {
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
                      onClick={() => this.sendBattleMessage(move, attackingHero, topHero)} fluid />
            </Grid.Column>
            <Grid.Column>
              <Button color='blue'
                      content={bottomHero.name}
                      onClick={() => this.sendBattleMessage(move, attackingHero, bottomHero)} fluid />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Popup>
    )
  }

  sendBattleMessage = (move: HeroMove, attackingHero: Hero, attackedToHero: Hero) => {
    const newMessage = <Message content={`${attackingHero.name} attacked ${attackedToHero.name} with ${move.name} doing ${move.damage} damage.`} size={'small'}/>
    let battleMessages = this.state.battleMessages.concat(newMessage)

    if(battleMessages.length > 9) {
      const toFilter = _.head(battleMessages)
      battleMessages = battleMessages.filter(message => message !== toFilter)
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
                  <br/>
                  <br/>
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
                      {this.renderMoveButtons(playerTwoTopHero.moves!, playerTwoTopHero, playerOne)}
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
                      {this.renderMoveButtons(playerTwoBottomHero.moves!, playerTwoBottomHero, playerOne)}
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