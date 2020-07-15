import React from 'react'
import {Header, Modal, Segment} from "semantic-ui-react"
import {HeroMove} from "../../dota-data/moves"

type Props = {
  move: HeroMove
}

export class HeroMovesInfo extends React.Component<Props> {

  getMoveTypes = () => {
    const { move } = this.props
    const moveTypes = move.moveTypes.join(' & ')
    return `Move types: ${moveTypes}`
  }

  render() {
    const {move} = this.props

    return(
      <Segment>
          <Modal.Description>
            <Header as={'h3'}>{move.name}</Header>
            <p>{move.description}</p>
            <p>Damage: {move.damage}</p>
            <p>Heal: {move.heal}</p>
            {this.getMoveTypes()}
          </Modal.Description>
      </Segment>
    )
  }
}