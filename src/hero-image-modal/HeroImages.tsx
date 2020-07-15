import React from 'react'
import {Button, Grid, Modal, Segment} from "semantic-ui-react"
import {Hero} from "../../dota-data/heroes"
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
               trigger={<Button content={<img src={`http://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.toLowerCase()}_lg.png`} alt={''}/>}
               />}>
          <Modal.Header>{hero.name}</Modal.Header>
          <Grid columns={3} textAlign={'center'}>
            <Grid.Column width={3} textAlign={'center'}>
              <Segment>
                <Modal.Content image>
                  <img src={`http://cdn.dota2.com/apps/dota2/images/heroes/${hero.name.toLowerCase()}_vert.jpg`}
                       alt={''}/>
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