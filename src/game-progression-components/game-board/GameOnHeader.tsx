import React from 'react'
import {Grid, Header} from "semantic-ui-react"
import {Hero} from "../../types/Hero"
import {HeroImageUrl} from "../../dota-data/heroes"
import {ImageSize} from "../../enums/ImageSize"
import {PlayerContent} from "../PlayDotaDuos"

type Props = {
  turnNumber: number
  playerOne: PlayerContent
  playerTwo: PlayerContent
}

export class GameOnHeader extends React.Component<Props> {

  createPlayerTeamPictures = (heroes: Hero[]) => {
    return heroes.map((hero, index) => {
      return (
        <Grid.Column key={index}>
          <img src={HeroImageUrl(hero.name, ImageSize.SMALL)}/>
        </Grid.Column>
      )
    })
  }

  render() {
    const {playerOne, playerTwo, turnNumber} = this.props

    return (
      <div className={'top_of_play_board'}>
        <Grid>
          {this.createPlayerTeamPictures(playerOne.heroes)}
          <Grid.Column width={5}>
            <Header as={'h1'} textAlign={'center'} color={'teal'} className={'turnNumberHeader'}>
              Turn: {turnNumber}
            </Header>
          </Grid.Column>
          {this.createPlayerTeamPictures(playerTwo.heroes)}
        </Grid>
      </div>
    )
  }
}