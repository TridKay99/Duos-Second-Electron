import {HeroMove} from "./HeroMove"

export type Hero = {
  id: number,
  name: string,
  health: number,
  armour: number,
  healthRegen: number,
  moves: HeroMove[]
}