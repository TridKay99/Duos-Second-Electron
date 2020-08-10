import React from 'react'
import {Button, Icon, Modal} from "semantic-ui-react"
import {GamePlayState, PlayerContent} from "../PlayDotaDuos"
import {HeroImageUrl} from "../../dota-data/heroes"
import {RecursivePick} from "../../types/RecursivePick"
import {BattlePosition, Player} from "../GameOn"
import _ from "lodash"
import {Hero} from "../../types/Hero"
import {ImageSize} from "../../enums/ImageSize"
import '../../styling/switch-hero-button.css'

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
                   disabled={_.isEqual(hero, this.props.player.activeHeroes.top) || _.isEqual(hero, this.props.player.activeHeroes.bottom) || hero.fainted}
                   content={<img src={HeroImageUrl(hero.name, ImageSize.SMALL)} alt={''}/>}
                   onClick={() => this.onSwapHero(hero)}
    />
  }

  onSwapHero = (hero: Hero) => {
    this.props.player.player === Player.ONE
      ? this.swapPlayerOne(hero)
      : this.swapPlayerTwo(hero)
  }

  swapPlayerTwo = (hero: Hero) => {
    let player = {...this.props.player}
    this.props.battlePosition === BattlePosition.TOP
      ? player.activeHeroes.top = hero
      : player.activeHeroes.bottom = hero

    this.props.handleChange({playerTwo: player})
    this.setState({isSwapHeroModalOpen: false})
  }

  swapPlayerOne = (hero: Hero) => {
    let player = {...this.props.player}
    this.props.battlePosition === BattlePosition.TOP
      ? player.activeHeroes.top = hero
      : player.activeHeroes.bottom = hero

    this.props.handleChange({playerOne: player})
    this.setState({isSwapHeroModalOpen: false})
  }

  render() {
    return(
      <Modal open={this.state.isSwapHeroModalOpen} size={'small'} trigger={
        <Button color={'teal'}
                inverted
                circular
                className={'exchange_button'}
                onClick={() => this.setState({isSwapHeroModalOpen: true})}
                content={<Icon name={'exchange'}/>}/>
      }>
        <Modal.Header>
          Switch Hero
          <Button icon={'close'}
                  floated={'right'}
                  color={'red'}
                  onClick={() => this.setState({isSwapHeroModalOpen: false})}/>
        </Modal.Header>
        <Modal.Content textAlign={'center'}>
          {this.props.player.heroes.map((hero) => {
            return this.renderHeroButtonsForSwitch(hero)
          })}
        </Modal.Content>
      </Modal>
    )
  }
}