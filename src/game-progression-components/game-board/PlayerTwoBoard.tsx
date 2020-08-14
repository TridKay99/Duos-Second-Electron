import React from 'react'
import {HeroImageUrl} from "../../dota-data/heroes"
import {ImageSize} from "../../enums/ImageSize"
import {Button, Grid} from "semantic-ui-react"
import {SwitchHeroButton} from "./SwitchHeroButton"
import {BattlePosition} from "../GameOn"
import {GamePlayState, PlayerContent} from "../PlayDotaDuos"
import {Hero} from "../../types/Hero"
import {HeroMove} from "../../types/HeroMove"
import {RecursivePick} from "../../types/RecursivePick"

type Props = {
  playerTwo: PlayerContent
  P2TOP: Hero
  p2BOT: Hero
  renderMoveButtons: (moves: HeroMove[], attackingHero: Hero, player: PlayerContent)=> JSX.Element[]
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

export class PlayerTwoBoard extends React.Component<Props> {

  render() {
    const { playerTwo, P2TOP, p2BOT, renderMoveButtons } = this.props
    return (
      <Grid.Column>
        <div className={'top_right_moves_and_buttons'}>
          <Button.Group vertical>
            {renderMoveButtons(P2TOP.moves, P2TOP, playerTwo)}
          </Button.Group>
          <img src={HeroImageUrl(P2TOP.name, ImageSize.MEDIUM)} alt={''}/>
        </div>
        {/*TOP RIGHT HEALTH & EXCHANGE*/}
        <div className={'right_side_health_info_container'}>
          <div className={'right_hero_exchange_and_health_info'}>
            <div className={'health_info'}>
              <p>Health:        {P2TOP.health}</p>
              <p>Health Regen:  {P2TOP.healthRegen}</p>
              <p>Armour:        {P2TOP.armour}</p>
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
        {/*BOTTOM RIGHT HEALTH & EXCHANGE*/}
        <div className={'right_side_health_info_container'}>
          <div className={'right_hero_exchange_and_health_info'}>
            <div className={'health_info'}>
              <p>Health:        {p2BOT.health}</p>
              <p>Health Regen:  {p2BOT.healthRegen}</p>
              <p>Armour:        {p2BOT.armour}</p>
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