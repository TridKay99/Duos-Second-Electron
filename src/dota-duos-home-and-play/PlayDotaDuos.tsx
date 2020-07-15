import React from 'react'
import {Button, Grid, Header} from "semantic-ui-react"
import {Hero, Heroes, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/play-dota-duos.css'

export enum GameProgression {
  PRE_GAME = 'pre_game',
  GAME = 'game',
  POST_GAME = 'post_game'
}

type State = {
  gameProgression: GameProgression
  playerOne: Hero[]
  playerOneImage: string[]
  playerTwo: Hero[]
  playerTwoImage: string[]
  isReadyToPlay: boolean
}

export class PlayDotaDuos extends React.Component<{}, State> {

  state: State = {
    gameProgression: GameProgression.PRE_GAME,
    playerOne: [],
    playerTwo: [],
    playerOneImage: [],
    playerTwoImage: [],
    isReadyToPlay: false
  }

  chooseHeroes = (hero: Hero) => {
    return <Button className={'hero_button_ingame'}
                   content={<img src={HeroImageUrl(hero.name, ImageSize.SMALL)} alt={''}/>}
                   onClick={() => this.addToTeam(hero, HeroImageUrl(hero.name, ImageSize.SMALL))}
    />
  }

  createHeroImg = (imageUrl: string) => {
    return <img src={`${imageUrl}`} alt={''}/>
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


  render() {
    const playerToPick = this.state.playerOne.length < 2 ? 'PLAYER 1' : 'PLAYER 2'
    const {isReadyToPlay} = this.state
    return (
      <div className={'play_dota_duos_container'}>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column width={6}/>
              <Grid.Column width={4} textAlign={'center'}>
                <header className={'pick_ur_heroes'}>{playerToPick} PICK YOUR HEROES...</header>
              </Grid.Column>
            <Grid.Column width={6}/>
          </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column width={8} textAlign={'right'} className={'player_one_picked_heroes'}>
                <Header textAlign={'right'} color={'grey'}>Player One</Header>
                {this.state.playerOneImage.map((imageUrl) => {
                  return this.createHeroImg(imageUrl)
                })}
              </Grid.Column>
              <Grid.Column width={8} textAlign={'left'} className={'player_two_picked_heroes'}>
                <Header textAlign={'left'} color={'grey'}>Player Two</Header>
                {this.state.playerTwoImage.map((imageUrl) => {
                  return this.createHeroImg(imageUrl)
                })}
              </Grid.Column>
            </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width={3}/>
            <Grid.Column width={10}>
              {Heroes.map((hero) => {
                return this.chooseHeroes(hero)
              })}
            </Grid.Column>
            <Grid.Column width={1}/>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width={7}/>
            <Grid.Column width={2} textAlign={'center'}>
              <Button color={'blue'}
                      className={'ready_button'}
                      size={'large'}
                      content={'R E A D Y'}
                      disabled={!isReadyToPlay}
                      onClick={() => this.setState({gameProgression: GameProgression.GAME})}/>
            </Grid.Column>
            <Grid.Column width={7}/>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}