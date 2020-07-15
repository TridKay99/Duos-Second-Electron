import {HeroMove} from "./moves";
import {AbbadonMoves, AlchemistMoves, AxeMoves} from "./moves";

export type Hero = {
  id: number,
  name: string,
  health: number,
  armour: number,
  healthRegen: number,
  moves: HeroMove[]
}

export const Heroes: Hero[] = [
  {id: 1,
    //WIP
    name: "Puck",
    health: 660,
    armour: 3,
    healthRegen: 2,
    moves: [AbbadonMoves.MistCoil, AbbadonMoves.AphoticSheild, AbbadonMoves.CurseOfAvernus, AbbadonMoves.BorrowedTime]},
  {id: 2,
    name: "Alchemist",
    health: 700,
    armour: 2,
    healthRegen: 5,
    moves: [AlchemistMoves.AcidSpray, AlchemistMoves.UnstableConcoction, AlchemistMoves.GreevilsGreed, AlchemistMoves.ChemicalRage]},
  {id: 3,
    name: "Axe",
    health: 700,
    armour: 2.33,
    healthRegen: 5,
    moves: [AxeMoves.BeserkersCall, AxeMoves.BattleHunger, AxeMoves.CounterHelix, AxeMoves.CullingBlade]}
]

