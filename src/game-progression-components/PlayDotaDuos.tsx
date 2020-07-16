import React from 'react'
import {Button} from "semantic-ui-react"
import {Hero, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/play-dota-duos.css'
import {GameOn} from "./GameOn"
import {PreGame} from "./PreGame"
import {RecursivePick} from "../types/RecursivePick"
import {deepStateMerge} from "../MergeUtils"

export enum GameProgression {
  PRE_GAME = 'pre_game',
  GAME_ON = 'game_on',
  POST_GAME = 'post_game'
}

export type GamePlayState = {
  gameProgression: GameProgression
  playerOne: Player
  playerTwo: Player
  isReadyToPlay: boolean
}

export type Player = {
  heroes: Hero[]
  heroImages: string[]
}

export class PlayDotaDuos extends React.Component<{}, GamePlayState> {

  state: GamePlayState = {
    gameProgression: GameProgression.PRE_GAME,
    isReadyToPlay: false,
    playerOne: {
      heroes: [],
      heroImages: []
    },
    playerTwo: {
      heroes: [],
      heroImages: []
    }
  }

  componentDidUpdate = () => {
    const {playerOne, playerTwo, isReadyToPlay} = this.state

    if(playerOne.heroes.length === 2 && playerTwo.heroes.length === 2 && !isReadyToPlay) {
      this.setState({isReadyToPlay: true})
    }
  }

  handleChange = (delta: RecursivePick<GamePlayState>) => {
    this.setState(deepStateMerge(delta), this.saveState)
  }

  saveState = () => {
    this.setState(this.state)
  }

  chooseHeroes = (hero: Hero) => {
    return <Button className={'hero_button_ingame'}
                   content={<img src={HeroImageUrl(hero.name, ImageSize.SMALL)} alt={''}/>}
                   onClick={() => this.addToTeam(hero, HeroImageUrl(hero.name, ImageSize.SMALL))}
    />
  }

  addToTeam = (hero: Hero, imageUrl: string) => {
    const {playerOne, playerTwo} = this.state

    if(playerOne.heroes.length === 2 && playerTwo.heroes.length === 2) {
      return
    }

    const playerOnePick = playerOne.heroes.length < 2
    playerOnePick
      ? this.addHeroToPlayerOne(hero, imageUrl)
      : this.addHeroToPlayerTwo(hero, imageUrl)
  }

  addHeroToPlayerOne = (hero: Hero, imageUrl: string) => {
    const {playerOne} = this.state

    let heroes = playerOne.heroes.concat(hero)
    let heroImages = playerOne.heroImages.concat(imageUrl)

    let setPlayerOne: Player = {
      heroes,
      heroImages
    }

    this.setState({playerOne: setPlayerOne})
  }

  addHeroToPlayerTwo =(hero: Hero, imageUrl: string) => {
    const {playerTwo} = this.state

    let heroes = playerTwo.heroes.concat(hero)
    let heroImages = playerTwo.heroImages.concat(imageUrl)

    let setPlayerTwo: Player = {
      heroes,
      heroImages
    }

    this.setState({playerTwo: setPlayerTwo})
  }

  render() {
    const {
      isReadyToPlay,
      gameProgression,
      playerOne,
      playerTwo} = this.state

    return (
      <div className={'play_dota_duos_container'}>
        { gameProgression === GameProgression.PRE_GAME && <PreGame gameProgression={gameProgression}
                                                                   playerOne={playerOne}
                                                                   playerTwo={playerTwo}
                                                                   isReadyToPlay={isReadyToPlay}
                                                                   chooseHeroes={this.chooseHeroes}
                                                                   handleChange={this.handleChange}/>}
        { gameProgression === GameProgression.GAME_ON && <GameOn /> }
        { gameProgression === GameProgression.POST_GAME && <GameOn /> }
      </div>
    )
  }
}