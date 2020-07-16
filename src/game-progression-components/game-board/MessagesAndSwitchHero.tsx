import React from 'react'
import {Grid, Message} from "semantic-ui-react"
import {HeroImageUrl, ImageSize} from "../../dota-data/heroes"

export class MessagesAndSwitchHero extends React.Component {

  render() {
    return(
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
    )
  }
}