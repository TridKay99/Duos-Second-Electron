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
import {PlayerTurnStatus} from "./PlayerOneBoard"

type Props = {
  playerTwo: PlayerContent
  P2TOP: Hero
  p2BOT: Hero
  allTurns: AllPlayersStoredTurns
  renderMoveButtons: (moves: HeroMove[], attackingHero: Hero, player: PlayerContent)=> JSX.Element[]
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

type State = {
  topTurnStatus: PlayerTurnStatus,
  botTurnStatus: PlayerTurnStatus
}

export class PlayerTwoBoard extends React.Component<Props, State> {

  state: State = {
    topTurnStatus: PlayerTurnStatus.NOT_READY,
    botTurnStatus: PlayerTurnStatus.NOT_READY
  }

  componentDidUpdate = () => {
    const {playerTwoTop, playerTwoBottom} = this.props.allTurns
    const {topTurnStatus, botTurnStatus} = this.state

    const topPlayerNotReady = topTurnStatus === PlayerTurnStatus.NOT_READY
    const botPlayerNotReady = botTurnStatus === PlayerTurnStatus.NOT_READY
    const topPlayerWaiting = topTurnStatus === PlayerTurnStatus.WAITING
    const botPlayerWaiting = botTurnStatus === PlayerTurnStatus.WAITING

    if(playerTwoTop.turnSelected && topPlayerNotReady)  {
      this.setState({topTurnStatus: PlayerTurnStatus.WAITING})
    }

    if(playerTwoBottom.turnSelected && botPlayerNotReady) {
      this.setState({botTurnStatus: PlayerTurnStatus.WAITING})
    }

    if(topPlayerWaiting && botPlayerWaiting) {
      this.setState({topTurnStatus: PlayerTurnStatus.READY, botTurnStatus: PlayerTurnStatus.READY})
    }
  }

  playerTurnStatusIcon = (position: BattlePosition) => {
    const {topTurnStatus, botTurnStatus} = this.state
    if(position === BattlePosition.TOP) {
      if(topTurnStatus === PlayerTurnStatus.NOT_READY) { return <Icon name={'thumbs down'} color={'red'} size={'big'}/>}
      else if(topTurnStatus === PlayerTurnStatus.WAITING) { return <Icon loading name={"spinner"} color={'blue'} size={'big'}/>}
      else { return <Icon name={'check circle'} color={'green'} size={'big'}/> }
    } else {
      if(botTurnStatus === PlayerTurnStatus.NOT_READY) { return <Icon name={'thumbs down'} color={'red'} size={'big'}/>}
      else if(botTurnStatus === PlayerTurnStatus.WAITING) { return <Icon loading name={"spinner"} color={'blue'} size={'big'}/>}
      else { return <Icon name={'check circle'} color={'green'} size={'big'}/> }
    }
  }

  render() {
    const { playerTwo, P2TOP, p2BOT, renderMoveButtons } = this.props
    const healthIcon = <Icon name={'heartbeat'} color={"red"}/>
    const regenIcon = <Icon name={'plus square'} color={"green"}/>
    const armourIcon = <Icon name={'chess rook'} color={'blue'}/>
    return (
      <Grid.Column>
        <div className={'top_right_moves_and_buttons'}>
          <Button.Group vertical>
            {renderMoveButtons(P2TOP.moves, P2TOP, playerTwo)}
          </Button.Group>
          <img src={HeroImageUrl(P2TOP.name, ImageSize.MEDIUM)} alt={''}/>
        </div>
        <div className={'right_side_health_info_container'}>
          <div className={'right_hero_exchange_and_health_info'}>
            <div className={'health_and_move_status'}>
              <div className={'health_info'}>
                <p>{healthIcon}Health:{P2TOP.health}</p>
                <p>{regenIcon}Health Regen:{P2TOP.healthRegen}</p>
                <p>{armourIcon}Armour:{P2TOP.armour}</p>
              </div>
              <div className={'move_status'}>
                <p>Turn Status</p>
                {this.playerTurnStatusIcon(BattlePosition.TOP)}
              </div>
            </div>
            <SwitchHeroButton player={playerTwo}
                              heroBeingSwitched={P2TOP}
                              handleChange={this.props.handleChange}
                              battlePosition={BattlePosition.TOP}
            />
          </div>
        </div>
        <br/>
        <br/>
        <div className={'bottom_right_moves_and_buttons'}>
          <Button.Group vertical>
            {renderMoveButtons(p2BOT.moves, p2BOT, playerTwo)}
          </Button.Group>
          <img src={HeroImageUrl(p2BOT.name, ImageSize.MEDIUM)} alt={''}/>
        </div>
        <div className={'right_side_health_info_container'}>
          <div className={'right_hero_exchange_and_health_info'}>
            <div className={'health_and_move_status'}>
              <div className={'health_info'}>
                <p>{healthIcon}Health:{p2BOT.health}</p>
                <p>{regenIcon}Health Regen:{p2BOT.healthRegen}</p>
                <p>{armourIcon}Armour:{p2BOT.armour}</p>
              </div>
              <div className={'move_status'}>
                <p>Turn Status</p>
                {this.playerTurnStatusIcon(BattlePosition.BOTTOM)}
              </div>
            </div>
            <SwitchHeroButton player={playerTwo}
                              heroBeingSwitched={p2BOT}
                              handleChange={this.props.handleChange}
                              battlePosition={BattlePosition.BOTTOM}
            />
          </div>
        </div>
      </Grid.Column>
    )
  }
}