import React from 'react'
import {Player} from "./PlayDotaDuos"
import {Button, Grid} from "semantic-ui-react"
import {Hero, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/game-on.css'
import {HeroMove} from "../dota-data/moves"
import _ from "lodash"

type Props = {
  playerOne: Player
  playerTwo: Player
  playerOneTopHero: Hero
  playerOneBottomHero: Hero
  playerTwoTopHero: Hero
  playerTwoBottomHero: Hero
}

export class GameOn extends React.Component<Props> {

  createPlayerTeamPictures = (heroes: Hero[]) => {
    return heroes.map((hero, index)=> {
      return (
        <Grid.Column key={index}>
          <img src={HeroImageUrl(hero.name, ImageSize.SMALL)}/>
        </Grid.Column>
      )
    })
  }

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
          <Grid>
            {this.createPlayerTeamPictures(playerOne.heroes)}
            <Grid.Column width={5}/>
            {this.createPlayerTeamPictures(playerTwo.heroes)}
          </Grid>
        </div>
        <Grid>
          <Grid.Row column={4} celled>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl(playerOne.heroes[0].name, ImageSize.MEDIUM)} alt={''}/>
            </Grid.Column>
            <Grid.Column width={6}>
              <Button.Group vertical>
                  {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={4} textAlign={'right'}>
              <Button.Group vertical>
                {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}
              </Button.Group>
            </Grid.Column>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl(playerTwo.heroes[0].name, ImageSize.FULL)} alt={''}/>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'right'}>
                <p>Health</p>
                <p>Health Regen</p>
                <p>Armour</p>
              </Grid.Column>
              <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'left'}>
                <p>{playerOneTopHero.health}</p>
                <p>{playerOneTopHero.healthRegen}</p>
                <p>{playerOneTopHero.armour}</p>
              </Grid.Column>
              <Grid.Column width={8}/>
              <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'right'}>
                <p>{playerTwoTopHero.health}</p>
                <p>{playerTwoTopHero.healthRegen}</p>
                <p>{playerTwoTopHero.armour}</p>
              </Grid.Column>
              <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'left'}>
                <p>Health</p>
                <p>Health Regen</p>
                <p>Armour</p>
              </Grid.Column>
            </Grid.Row>
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
          <Grid.Row columns={3}>
          <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'right'}>
            <p>Health</p>
            <p>Health Regen</p>
            <p>Armour</p>
          </Grid.Column>
          <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'left'}>
            <p>{playerOneBottomHero.health}</p>
            <p>{playerOneBottomHero.healthRegen}</p>
            <p>{playerOneBottomHero.armour}</p>
          </Grid.Column>
          <Grid.Column width={8}/>
          <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'right'}>
            <p>{playerTwoBottomHero.health}</p>
            <p>{playerOneBottomHero.healthRegen}</p>
            <p>{playerTwoTopHero.armour}</p>
          </Grid.Column>
          <Grid.Column width={2} className={'in_game_hero_details'} textAlign={'left'}>
            <p>Health</p>
            <p>Health Regen</p>
            <p>Armour</p>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}