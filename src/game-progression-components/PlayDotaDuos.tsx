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
  playerOne: Hero[]
  playerOneImage: string[]
  playerTwo: Hero[]
  playerTwoImage: string[]
  isReadyToPlay: boolean
}

export class PlayDotaDuos extends React.Component<{}, GamePlayState> {

  state: GamePlayState = {
    gameProgression: GameProgression.PRE_GAME,
    playerOne: [],
    playerTwo: [],
    playerOneImage: [],
    playerTwoImage: [],
    isReadyToPlay: false
  }

  componentDidUpdate = () => {
    if(this.state.playerOne.length === 2 && this.state.playerTwo.length === 2 && !this.state.isReadyToPlay) {
      this.setState({isReadyToPlay: true})
    }
  }

  chooseHeroes = (hero: Hero) => {
    return <Button className={'hero_button_ingame'}
                   content={<img src={HeroImageUrl(hero.name, ImageSize.SMALL)} alt={''}/>}
                   onClick={() => this.addToTeam(hero, HeroImageUrl(hero.name, ImageSize.SMALL))}
    />
  }

  addToTeam = (hero: Hero, imageUrl: string) => {
    const {playerOne, playerTwo} = this.state

    if(playerOne.length === 2 && playerTwo.length === 2) {
      return
    }

    const playerOnePick = playerOne.length < 2

    playerOnePick
      ? this.addHeroToPlayerOne(hero, imageUrl)
      : this.addHeroToPlayerTwo(hero, imageUrl)
  }

  addHeroToPlayerOne = (hero: Hero, imageUrl: string) => {
    let player1heroes = this.state.playerOne.concat([hero])
    let p1HeroImages = this.state.playerOneImage.concat([imageUrl])
    this.setState({playerOne: player1heroes, playerOneImage: p1HeroImages})
  }

  addHeroToPlayerTwo =(hero: Hero, imageUrl: string) => {
    let player2Heroes = this.state.playerTwo.concat([hero])
    let p2HeroImages = this.state.playerTwoImage.concat([imageUrl])
    this.setState({playerTwo: player2Heroes, playerTwoImage: p2HeroImages})
  }

  handleGameProgression = (gameProgression: GameProgression) => {
    this.setState({gameProgression})
  }

  handleChange = (delta: RecursivePick<GamePlayState>) => {
    this.setState(deepStateMerge(delta), this.saveState)
  }

  saveState = () => {
    this.setState(this.state)
  }

  render() {
    const {
      isReadyToPlay,
      gameProgression,
      playerOne,
      playerTwo,
      playerOneImage,
      playerTwoImage } = this.state
      
    return (
      <div className={'play_dota_duos_container'}>
        { gameProgression === GameProgression.PRE_GAME && <PreGame gameProgression={gameProgression}
                                                                   playerOne={playerOne}
                                                                   playerOneImage={playerOneImage}
                                                                   playerTwo={playerTwo}
                                                                   playerTwoImage={playerTwoImage}
                                                                   isReadyToPlay={isReadyToPlay}
                                                                   chooseHeroes={this.chooseHeroes}
                                                                   handleGameProgression={this.handleGameProgression}
                                                                   handleChange={this.handleChange}/>}
        { gameProgression === GameProgression.GAME_ON && <GameOn /> }
        { gameProgression === GameProgression.POST_GAME && <GameOn /> }
      </div>
    )
  }
}