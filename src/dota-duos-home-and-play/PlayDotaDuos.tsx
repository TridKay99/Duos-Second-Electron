import React from 'react'
import {Button, Grid} from "semantic-ui-react"
import {Hero, Heroes} from "../dota-data/heroes"
import '../styling/play-dota-duos.css'

export enum GameProgression {
  PRE_GAME = 'pre_game',
  GAME = 'game',
  POST_GAME = 'post_game'
}

type State = {
  gameProgression: GameProgression
  player1: Hero[]
  p1img: string[]
  player2: Hero[]
  p2img: string[]
}

export class PlayDotaDuos extends React.Component<{}, State> {

  state: State = {
    gameProgression: GameProgression.PRE_GAME,
    player1: [],
    p1img: [],
    player2: [],
    p2img: []
  }

  chooseHeroes = (hero: Hero) => {
    return <Button className={'hero_button_ingame'}
                   content={<img src={`http://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.toLowerCase()}_sb.png`} alt={''}/>}
                   onClick={() => this.addToTeam(hero, `http://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.toLowerCase()}_sb.png`)}
    />
  }

  createHeroImg = (imageUrl: string) => {
    return <img src={`${imageUrl}`} alt={''}/>
  }

  addToTeam = (hero: Hero, imageUrl: string) => {
    if(this.state.player1.length < 2) {
      let player1 = this.state.player1.concat([hero])
      let p1img = this.state.p1img.concat([imageUrl])
      this.setState({player1, p1img})
    } else {
      let player2 = this.state.player2.concat([hero])
      let p2img = this.state.p2img.concat([imageUrl])
      this.setState({player2, p2img})
    }
  }

  render() {
    const playerToPick = this.state.player1.length < 2 ? 'PLAYER 1' : 'PLAYER 2'

    return (
      <div className={'play_dota_duos_container'}>
          <header className={'pick_ur_heroes'}>{playerToPick} PICK YOUR HEROES...</header>
          {Heroes.map((hero) => {
            return this.chooseHeroes(hero)
          })}
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                {this.state.p1img.map((imageUrl) => {
                  return this.createHeroImg(imageUrl)
                })}
              </Grid.Column>
              <Grid.Column width={5}>
                {this.state.p2img.map((imageUrl) => {
                  return this.createHeroImg(imageUrl)
                })}
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </div>
    )
  }
}