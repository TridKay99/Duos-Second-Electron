import React from 'react'
import {Button, Grid, Modal, Segment} from "semantic-ui-react"
import {Hero, HeroImageUrl, ImageSize} from "../dota-data/heroes"
import {HeroMovesInfo} from "./HeroMovesInfo"

type Props = {
  hero: Hero
}

export class HeroImages extends React.Component<Props> {

  render() {
    const {hero} = this.props

    return (
      <React.Fragment>
        <Modal size={'fullscreen'}
               trigger={<Button content={<img src={HeroImageUrl(hero.name, ImageSize.MEDIUM)} alt={''}/>}
               />}>
          <Modal.Header>{hero.name}</Modal.Header>
          <Grid columns={3} textAlign={'center'}>
            <Grid.Column width={3} textAlign={'center'}>
              <Segment>
                <Modal.Content image>
                  <img src={HeroImageUrl(hero.name, ImageSize.VERT)} alt={''}/>
                </Modal.Content>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Grid.Row>
                <Grid.Column>
                  <HeroMovesInfo move={hero.moves[0]}/>
                </Grid.Column>
                <Grid.Column>
                  <HeroMovesInfo move={hero.moves[1]}/>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={6}>
              <Grid.Row>
                <Grid.Column>
                  <HeroMovesInfo move={hero.moves[2]}/>
                </Grid.Column>
                <Grid.Column>
                  <HeroMovesInfo move={hero.moves[3]}/>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Modal>
      </React.Fragment>
    )
  }
}