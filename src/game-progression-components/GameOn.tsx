import React from 'react'
import {Player} from "./PlayDotaDuos"
import {Button, Grid, Message} from "semantic-ui-react"
import {HeroImageUrl, ImageSize} from "../dota-data/heroes"
import '../styling/game-on.css'
import {HeroMove} from "../dota-data/moves"

type Props = {
  playerOne: Player
  playerTwo: Player
}

export class GameOn extends React.Component<Props> {

  renderMoveButtons = (moves: HeroMove[]) => {
    return moves.map(move => <Button color={'blue'} content={`${move.name}`}/>)
  }

  render() {
    const {playerOne, playerTwo} = this.props
    return (
      <React.Fragment>
        <div className={'top_of_play_board'}>
      </div>
        <Grid>
          <Grid.Row column={3} celled>
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
        <Grid>
          <Grid.Row column={3} celled>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl('rubick', ImageSize.SMALL)} alt={''}/>
              <br/>
              <br/>
              <img src={HeroImageUrl('rubick', ImageSize.SMALL)} alt={''}/>
            </Grid.Column>
            <Grid.Column width={10}>
              <Message size={'tiny'} content={'Trial Message: 70 damage!'}/>
              <Message size={'tiny'} content={'Trial Message: 70 damage!'}/>
              <Message size={'tiny'} content={'Trial Message: 70 damage!'}/>
            </Grid.Column>
            <Grid.Column width={3} textAlign={'center'}>
              <img src={HeroImageUrl('rubick', ImageSize.SMALL)} alt={''}/>
              <br/>
              <br/>
              <img src={HeroImageUrl('rubick', ImageSize.SMALL)} alt={''}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/*<Grid.Column width={5} textAlign={'left'}>*/}
        {/*    //left buttons*/}
        {/*    <Button.Group vertical>*/}
        {/*      {this.renderMoveButtons(this.props.playerOne.heroes[0].moves)}*/}
        {/*    </Button.Group>*/}
        {/*</Grid.Column>*/}
        {/*<Grid.Column width={5} textAlign={'right'}>*/}
        {/*  //right buttons*/}
        {/*  <Button.Group vertical>*/}
        {/*    {this.renderMoveButtons(this.props.playerTwo.heroes[0].moves)}*/}
        {/*  </Button.Group>*/}
        {/*</Grid.Column>*/}
      </React.Fragment>
    )
  }
}