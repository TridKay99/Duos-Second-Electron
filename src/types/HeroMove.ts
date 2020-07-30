import {MoveType} from "../dota-data/moves"

export type HeroMove = {
  name: string
  moveTypes: MoveType[]
  description: string
  damage: number
  heal?: number
}