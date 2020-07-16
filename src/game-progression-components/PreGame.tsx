import React from 'react'
import {Button, Grid, Header} from "semantic-ui-react"
import {Hero, Heroes} from "../dota-data/heroes"
import {GamePlayState, GameProgression} from "./PlayDotaDuos"
import {RecursivePick} from "../types/RecursivePick"

type Props = {
  gameProgression: GameProgression
  playerOne: Hero[]
  playerOneImage: string[]
  playerTwo: Hero[]
  playerTwoImage: string[]
  isReadyToPlay: boolean
  chooseHeroes: (hero: Hero) => void
  handleGameProgression: (gameProgression: GameProgression) => void
  handleChange: (delta: RecursivePick<GamePlayState>) => void
}

export class PreGame extends React.Component<Props> {

  createHeroImg = (imageUrl: string) => {
    return <img src={`${imageUrl}`} alt={''}/>
  }

  render() {
    const playerToPick = this.props.playerOne.length < 2 ? 'PLAYER 1' : 'PLAYER 2'

    return (
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
            {this.props.playerOneImage.map((imageUrl) => {
              return this.createHeroImg(imageUrl)
            })}
          </Grid.Column>
          <Grid.Column width={8} textAlign={'left'} className={'player_two_picked_heroes'}>
            <Header textAlign={'left'} color={'grey'}>Player Two</Header>
            {this.props.playerTwoImage.map((imageUrl) => {
              return this.createHeroImg(imageUrl)
            })}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column width={3}/>
          <Grid.Column width={10}>
            {Heroes.map((hero) => {
              return this.props.chooseHeroes(hero)
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
                    disabled={!this.props.isReadyToPlay}
                    onClick={() => this.props.handleChange({gameProgression: GameProgression.GAME_ON})}/>
          </Grid.Column>
          <Grid.Column width={7}/>
        </Grid.Row>
      </Grid>
    )
  }
}