import React from 'react'
import {HeroImageUrl} from "../../dota-data/heroes"
import {ImageSize} from "../../enums/ImageSize"
import {Button, Grid, Icon} from "semantic-ui-react"
import {SwitchHeroButton} from "./SwitchHeroButton"
import {AllPlayersStoredTurns, BattlePosition} from "../GameOn"
import {GamePlayState, PlayerContent} from "../PlayDotaDuos"
import {Hero} from "../../types/Hero"
import {HeroMove} from "../../types/HeroMove"
import {RecursivePick} from "../../types/RecursivePick"
import '../../styling/game-on.css'

export enum PlayerTurnStatus {
  NOT_READY = 'not_ready',
  WAITING = 'waiting',
  READY = 'ready'
}

type Props = {
  playerOne: PlayerContent
  p1TOP: Hero
  p1BOT: Hero
  allTurns: AllPlayersStoredTurns
  renderMoveButtons: (moves: HeroMove[], attackingHero: Hero, player: PlayerContent)=> JSX.Element[]
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

type State = {
  topTurnStatus: PlayerTurnStatus
  botTurnStatus: PlayerTurnStatus
}

export class PlayerOneBoard extends React.Component<Props, State> {

  state: State = {
    topTurnStatus: PlayerTurnStatus.NOT_READY,
    botTurnStatus: PlayerTurnStatus.NOT_READY
  }

  componentDidUpdate = () => {
    const {playerOneTop, playerOneBottom} = this.props.allTurns
    const {topTurnStatus, botTurnStatus} = this.state

    if(playerOneTop.turnSelected && topTurnStatus !== PlayerTurnStatus.WAITING &&  topTurnStatus !== PlayerTurnStatus.READY) {
      this.setState({topTurnStatus: PlayerTurnStatus.WAITING})
    }

    if(playerOneBottom.turnSelected && botTurnStatus !== PlayerTurnStatus.WAITING && botTurnStatus !== PlayerTurnStatus.READY) {
      this.setState({botTurnStatus: PlayerTurnStatus.WAITING})
    }

    if(this.state.topTurnStatus === PlayerTurnStatus.WAITING && this.state.botTurnStatus === PlayerTurnStatus.WAITING && (topTurnStatus !== PlayerTurnStatus.READY && botTurnStatus !== PlayerTurnStatus.READY)) {
      this.setState({topTurnStatus: PlayerTurnStatus.READY, botTurnStatus: PlayerTurnStatus.READY})
    }
  }

  playerTurnStatusIcon = (position: BattlePosition) => {
    const {topTurnStatus, botTurnStatus} = this.state

    if(position === BattlePosition.TOP) {
      if(topTurnStatus === PlayerTurnStatus.NOT_READY) { return 'thumbs down' }
      else if(topTurnStatus === PlayerTurnStatus.WAITING) { return 'spinner'}
      else { return 'check circle' }
    } else {
      if(botTurnStatus === PlayerTurnStatus.NOT_READY) { return 'thumbs down' }
      else if(botTurnStatus === PlayerTurnStatus.WAITING) { return 'spinner'}
      else { return 'check circle' }
    }
  }

  render() {
    const { playerOne, p1TOP, p1BOT, renderMoveButtons } = this.props
    const healthIcon = <Icon name={'heartbeat'} color={"red"}/>
    const regenIcon = <Icon name={'plus square'} color={"green"}/>
    const armourIcon = <Icon name={'chess rook'} color={'blue'}/>
    return (
      <Grid.Column>
        <div className={'top_left_moves_and_buttons'}>
          <img src={HeroImageUrl(p1TOP.name, ImageSize.MEDIUM)} alt={''}/>
          <Button.Group vertical>
            {renderMoveButtons(p1TOP.moves, p1TOP, playerOne)}
          </Button.Group>
        </div>
        <div className={'top_left_hero_exchange_and_health_info'}>
          <SwitchHeroButton player={this.props.playerOne}
                            heroBeingSwitched={p1TOP}
                            handleChange={this.props.handleChange}
                            battlePosition={BattlePosition.TOP}
          />
          <div className={'health_and_move_status'}>
            <div className={'move_status'}>
              <p>Turn Status</p>
              <Icon name={this.playerTurnStatusIcon(BattlePosition.TOP)}
                    color={'green'}
                    size={'big'}/>
            </div>
            <div className={'health_info'}>
              <p>{healthIcon}Health:{p1TOP.health}</p>
              <p>{regenIcon}Health Regen:{p1TOP.healthRegen}</p>
              <p>{armourIcon}Armour:{p1TOP.armour}</p>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <div className={'bottom_left_moves_and_buttons'}>
          <img src={HeroImageUrl(p1BOT.name, ImageSize.MEDIUM)} alt={''}/>
          <Button.Group vertical>
            {renderMoveButtons(p1BOT.moves, p1BOT, playerOne)}
          </Button.Group>
        </div>
        <div className={'top_left_hero_exchange_and_health_info'}>
          <SwitchHeroButton player={this.props.playerOne}
                            heroBeingSwitched={p1BOT}
                            handleChange={this.props.handleChange}
                            battlePosition={BattlePosition.BOTTOM}
          />
          <div className={'health_and_move_status'}>
            <div className={'move_status'}>
              <p>Turn Status</p>
              <Icon name={this.playerTurnStatusIcon(BattlePosition.BOTTOM)}
                    color={'green'}
                    size={'big'}
                    textAlign={'center'}
              />
            </div>
            <div className={'health_info'}>
              <p>{healthIcon}Health:{p1BOT.health}</p>
              <p>{regenIcon}Health Regen:{p1BOT.healthRegen}</p>
              <p>{armourIcon}Armour:{p1BOT.armour}</p>
            </div>
          </div>
        </div>
      </Grid.Column>
    )
  }
}