import React from 'react'
import {Player} from "./PlayDotaDuos"
import {Button, Grid, Icon, Popup, Segment} from "semantic-ui-react"
import {Hero, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/game-on.css'
import {HeroMove} from "../dota-data/moves"

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
    return heroes.map((hero, index) => {
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
      playerTwoBottomHero
    } = this.props

    return (
      <React.Fragment>
        <div className={'top_of_play_board'}>
          <Grid>
            {this.createPlayerTeamPictures(playerOne.heroes)}
            <Grid.Column width={5}/>
            {this.createPlayerTeamPictures(playerTwo.heroes)}
          </Grid>
        </div>
        <br/>
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <div className={'top_left_moves_and_buttons'}>
                <img src={HeroImageUrl(playerOne.heroes[0].name, ImageSize.MEDIUM)} alt={''}/>
                <Button.Group vertical>
                  {this.renderMoveButtons(this.props.playerOne.heroes[0].moves!)}
                </Button.Group>
              </div>
              {/*TOP LEFT HEALTH & EXCHANGE*/}
              <div className={'top_left_hero_exchange_and_health_info'}>
                <Popup content={'Switch Hero'} position={'bottom center'} trigger={
                  <Button color={'teal'}
                          basic
                          className={'exchange_button'}
                          content={<Icon name={'exchange'}/>}/>
                }/>
                  <div className={'health_info'}>
                    <p>Health:{playerOneTopHero.health}</p>
                    <p>Health Regen:{playerOneTopHero.healthRegen}</p>
                    <p>Armour:{playerOneTopHero.armour}</p>
                  </div>
              </div>
              <br/>
              <br/>
              <div className={'bottom_left_moves_and_buttons'}>
                <img src={HeroImageUrl(playerTwo.heroes[0].name, ImageSize.MEDIUM)} alt={''}/>
                <Button.Group vertical>
                  {this.renderMoveButtons(playerTwo.heroes[0].moves!)}
                </Button.Group>
              </div>
              {/*BOTTOM LEFT HEALTH & EXCHANGE*/}
              <div className={'top_left_hero_exchange_and_health_info'}>
                <Popup content={'Switch Hero'} position={'bottom center'} trigger={
                  <Button color={'teal'}
                          basic
                          className={'exchange_button'}
                          content={<Icon name={'exchange'}/>}/>
                }/>
                <div className={'health_info'}>
                  <p>Health:{playerOneBottomHero.health}</p>
                  <p>Health Regen:{playerOneBottomHero.healthRegen}</p>
                  <p>Armour:{playerOneBottomHero.armour}</p>
                </div>
              </div>
              <br/>
              <br/>
            </Grid.Column>
            <Grid.Column>
              {/*MESSAGE AREA*/}
              <Segment>
                {/*{this.getMessage}*/}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <div className={'top_right_moves_and_buttons'}>
                <Button.Group vertical>
                  {this.renderMoveButtons(this.props.playerOne.heroes[1].moves!)}
                </Button.Group>
                <img src={HeroImageUrl(playerOne.heroes[1].name, ImageSize.MEDIUM)} alt={''}/>
              </div>
              {/*TOP RIGHT HEALTH & EXCHANGE*/}
              <div className={'right_side_health_info_container'}>
                <div className={'right_hero_exchange_and_health_info'}>
                  <div className={'health_info'}>
                    <p>Health:        {playerTwoTopHero.health}</p>
                    <p>Health Regen:  {playerTwoTopHero.healthRegen}</p>
                    <p>Armour:        {playerTwoTopHero.armour}</p>
                  </div>
                  <Popup content={'Switch Hero'} position={'bottom center'} trigger={
                    <Button color={'teal'}
                            basic
                            className={'exchange_button'}
                            content={<Icon name={'exchange'}/>}/>
                  }/>
                </div>
              </div>
              <br/>
              <br/>
              <div className={'bottom_right_moves_and_buttons'}>
                <Button.Group vertical>
                  {this.renderMoveButtons(playerTwo.heroes[1].moves!)}
                </Button.Group>
                <img src={HeroImageUrl(playerTwo.heroes[1].name, ImageSize.MEDIUM)} alt={''}/>
              </div>
              {/*BOTTOM RIGHT HEALTH & EXCHANGE*/}
              <div className={'right_side_health_info_container'}>
                <div className={'right_hero_exchange_and_health_info'}>
                  <div className={'health_info'}>
                    <p>Health:        {playerTwoBottomHero.health}</p>
                    <p>Health Regen:  {playerTwoBottomHero.healthRegen}</p>
                    <p>Armour:        {playerTwoBottomHero.armour}</p>
                  </div>
                  <Popup content={'Switch Hero'} position={'bottom center'} trigger={
                    <Button color={'teal'}
                            basic
                            className={'exchange_button'}
                            content={<Icon name={'exchange'}/>}/>
                  }/>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}