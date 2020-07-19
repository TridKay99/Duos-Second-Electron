import React from 'react'
import {Button, Icon, Modal} from "semantic-ui-react"
import {GamePlayState, PlayerContent} from "../PlayDotaDuos"
import {Hero, HeroImageUrl, ImageSize} from "../../dota-data/heroes"
import {RecursivePick} from "../../types/RecursivePick"
import {BattlePosition, Player} from "../GameOn"

type Props = {
  player: PlayerContent
  heroBeingSwitched: Hero
  handleChange: (delta: RecursivePick<GamePlayState>) => void
  battlePosition: BattlePosition
}

type State = {
  isSwapHeroModalOpen: boolean
}

export class SwitchHeroButton extends React.Component<Props, State> {

  state: State = {
    isSwapHeroModalOpen: false
  }

  renderHeroButtonsForSwitch = (hero: Hero) => {
    return <Button className={'hero_button_ingame'}
                   disabled={this.isHeroInPlay(hero)}
                   content={<img src={HeroImageUrl(hero.name, ImageSize.SMALL)} alt={''}/>}
                   onClick={() => this.onSwapHero(hero)}
    />
  }

  onSwapHero = (hero: Hero) => {

    if(this.props.battlePosition === BattlePosition.BOTTOM) {
      const player = {...this.props.player}
      player.activeHeroes.bottom = hero;

      if(this.props.player.player === Player.TWO) {
        this.props.handleChange({playerTwo: player})
        this.setState({isSwapHeroModalOpen: false})
      }
    }
  }

  isHeroInPlay = (hero: Hero): boolean => {
    return this.props.player.activeHeroes.top === hero || this.props.player.activeHeroes.bottom === hero
  }



  render() {

    return(
      <Modal open={this.state.isSwapHeroModalOpen} size={'small'} trigger={
        <Button color={'teal'}
                basic
                className={'exchange_button'}
                onClick={() => this.setState({isSwapHeroModalOpen: true})}
                content={<Icon name={'exchange'}/>}/>
      }>
        <Modal.Header>Switch Hero</Modal.Header>
        <Modal.Content textAlign={'center'}>
          {this.props.player.heroes.map((hero) => {
            return this.renderHeroButtonsForSwitch(hero)
          })}
        </Modal.Content>
      </Modal>
    )
  }
}