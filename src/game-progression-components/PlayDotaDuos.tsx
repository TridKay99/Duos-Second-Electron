import React from 'react'
import {Button} from "semantic-ui-react"
import {Hero, Heroes, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/play-dota-duos.css'
import {GameOn, Player} from "./GameOn"
import {PreGame} from "./PreGame"
import {RecursivePick} from "../types/RecursivePick"
import {deepStateMerge} from "../MergeUtils"

export type ActiveHeroes = {
  top: Hero | null
  bottom: Hero | null
}

export enum GameProgression {
  PRE_GAME = 'pre_game',
  GAME_ON = 'game_on',
  POST_GAME = 'post_game'
}

export type GamePlayState = {
  gameProgression: GameProgression
  playerOne: PlayerContent
  playerTwo: PlayerContent
  isReadyToPlay: boolean
}

export type PlayerContent = {
  player: Player
  heroes: Hero[]
  heroImages: string[]
  activeHeroes: ActiveHeroes
}

export class PlayDotaDuos extends React.Component<{}, GamePlayState> {

  state: GamePlayState = {
    gameProgression: GameProgression.PRE_GAME,
    isReadyToPlay: false,
    playerOne: {
      //WIP REMOVE TO PICK HEROES AGAIN
      player: Player.ONE,
      heroes: [],
      heroImages: [],
      activeHeroes: {
        top: null,
        bottom: null
      }
    },
    playerTwo: {
      player: Player.TWO,
      heroes: [],
      heroImages: [],
      activeHeroes: {
        top: null,
        bottom: null
      }
    }
  }

  componentDidUpdate = () => {
    const {playerOne, playerTwo, isReadyToPlay} = this.state

    if(playerOne.heroes.length === 5 && playerTwo.heroes.length === 5 && !isReadyToPlay) {
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

    if(playerOne.heroes.length === 5 && playerTwo.heroes.length === 5) {
      return
    }

    const playerOnePick = playerOne.heroes.length < 5
    playerOnePick
      ? this.addHeroToPlayerOne(hero, imageUrl)
      : this.addHeroToPlayerTwo(hero, imageUrl)
  }

  addHeroToPlayerOne = (hero: Hero, imageUrl: string) => {
    const {playerOne} = this.state

    let heroes = playerOne.heroes.concat(hero)
    let heroImages = playerOne.heroImages.concat(imageUrl)

    let activeHeroes: ActiveHeroes = {
      top: this.state.playerOne.activeHeroes.top,
      bottom: this.state.playerOne.activeHeroes.bottom
    }

    if(heroes.length === 2) {
      activeHeroes = {
        top: heroes[0],
        bottom: heroes[1]
      }
    }

    let setPlayerOne: PlayerContent = {
      player: Player.ONE,
      heroes,
      heroImages,
      activeHeroes
    }

    this.setState({playerOne: setPlayerOne})
  }

  addHeroToPlayerTwo =(hero: Hero, imageUrl: string) => {
    const {playerTwo} = this.state

    let heroes = playerTwo.heroes.concat(hero)
    let heroImages = playerTwo.heroImages.concat(imageUrl)
    let activeHeroes: ActiveHeroes = {
      top: this.state.playerTwo.activeHeroes.top,
      bottom: this.state.playerTwo.activeHeroes.bottom
    }

    if(heroes.length === 2) {
      activeHeroes = {
        top: heroes[0],
        bottom: heroes[1]
      }
    }
    let setPlayerTwo: PlayerContent = {
      player: Player.TWO,
      heroes,
      heroImages,
      activeHeroes
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
        { gameProgression === GameProgression.GAME_ON && <GameOn playerOne={playerOne}
                                                                 playerTwo={playerTwo}
                                                                 handleChange={this.handleChange}/>}
      </div>
    )
  }
}