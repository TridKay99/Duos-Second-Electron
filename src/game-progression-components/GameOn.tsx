import React from 'react'
import {Player} from "./PlayDotaDuos"
import {Button, Grid} from "semantic-ui-react"
import {Hero, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/game-on.css'
import {HeroMove} from "../dota-data/moves"
import {MessagesAndSwitchHero} from "./game-board/MessagesAndSwitchHero"

type Props = {
  playerOne: Player
  playerTwo: Player
  playerOneTopHero: Hero
  playerOneBottomHero: Hero
  playerTwoTopHero: Hero
  playerTwoBottomHero: Hero
}

export class GameOn extends React.Component<Props> {

  renderMoveButtons = (moves: HeroMove[]) => {
    return moves.map(move => <Button color={'blue'} content={`${move.name}`}/>)
  }

  render() {
    const {
      playerOne,
      playerTwo,
      playerOneTopHero,
      playerOneBottomHero,
      playerTwoTopHero,
      playerTwoBottomHero } = this.props

    return (
      <React.Fragment>
        <div className={'top_of_play_board'}>
      </div>
        <Grid>
          <Grid.Row column={4} celled>
            {/*<Grid.Column>*/}
            {/*  <p>{}</p>*/}
            {/*  <p></p>*/}
            {/*  <p></p>*/}
            {/*  <p></p>*/}
            {/*</Grid.Column>*/}
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl(playerOne.heroes[0].name, ImageSize.MEDIUM)} alt={''}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group vertical>
                  {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={6} textAlign={'right'}>
              <Button.Group vertical>
                {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl(playerTwo.heroes[0].name, ImageSize.FULL)} alt={''}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row/>
          <Grid.Row/>
          <Grid.Row column={3} celled>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl(playerOne.heroes[1].name, ImageSize.FULL)} alt={''}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button.Group vertical>
                {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={6} textAlign={'right'}>
              <Button.Group vertical>
                {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl(playerTwo.heroes[1].name, ImageSize.FULL)} alt={''}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
        <br/>
        <br/>
        <MessagesAndSwitchHero />
      </React.Fragment>
    )
  }
}