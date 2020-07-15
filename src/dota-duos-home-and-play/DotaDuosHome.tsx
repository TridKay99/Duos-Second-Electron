import React from 'react'
import {Button} from "semantic-ui-react"
import {PlayDotaDuos} from "./PlayDotaDuos"
import '../styling/dota-duos-home.css'

export enum PlayingStatus {
  PLAYING = 'playing',
  NOT_PLAYING = 'not_playing'
}

export type State = {
  playing: PlayingStatus
}

export class DotaDuosHome extends React.Component<{}, State> {

  state: State = {
    playing: PlayingStatus.NOT_PLAYING
  }

  homeScreen = () => {
    return (
      <div className={'dota_duos_home_container'}>
        <Button color={'blue'}
                className={'play_button'}
                size={'large'}
                content={'P L A Y'}
                onClick={() => this.setState({playing: PlayingStatus.PLAYING})}/>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.state.playing === PlayingStatus.NOT_PLAYING
          ? this.homeScreen()
          : <PlayDotaDuos/>
        }
      </React.Fragment>
    )
  }
}