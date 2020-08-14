import React from 'react'
import {HeroImageUrl} from "../../dota-data/heroes"
import {ImageSize} from "../../enums/ImageSize"
import {Button, Grid, Icon} from "semantic-ui-react"
import {SwitchHeroButton} from "./SwitchHeroButton"
import {BattlePosition} from "../GameOn"
import {GamePlayState, PlayerContent} from "../PlayDotaDuos"
import {Hero} from "../../types/Hero"
import {HeroMove} from "../../types/HeroMove"
import {RecursivePick} from "../../types/RecursivePick"
import {PlayerTurnStatus} from "./PlayerOneBoard"

type Props = {
  playerTwo: PlayerContent
  P2TOP: Hero
  p2BOT: Hero
  renderMoveButtons: (moves: HeroMove[], attackingHero: Hero, player: PlayerContent)=> JSX.Element[]
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

type State = {
  playerTurnStatus: PlayerTurnStatus
}

export class PlayerTwoBoard extends React.Component<Props, State> {

  state: State = {
    playerTurnStatus: PlayerTurnStatus.NOT_READY
  }

  playerTurnStatusIcon = () => {
    const {playerTurnStatus} = this.state
    if(playerTurnStatus === PlayerTurnStatus.NOT_READY) { return 'thumbs down' }
    else if(playerTurnStatus === PlayerTurnStatus.WAITING) { return 'spinner'}
    else { return 'check circle' }
  }

  render() {
    const { playerTwo, P2TOP, p2BOT, renderMoveButtons } = this.props
    const icon = this.playerTurnStatusIcon()
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
                <Icon name={icon}
                      color={'green'}
                      size={'big'}/>
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
                <Icon name={icon}
                      color={'green'}
                      size={'big'}/>
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