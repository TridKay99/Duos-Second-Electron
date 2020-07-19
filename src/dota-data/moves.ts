import {Hero} from "./heroes"

export type HeroMove = {
  name: string
  moveTypes: MoveType[]
  description: string
  damage?: number
  heal?: number
}

export enum MoveType {
  DAMAGE = 'damage',
  HEAL = 'heal',
  SLOW = 'slow',
  STUN = 'stun',
  SHIELD = 'shield',
  TAUNT = 'taunt',
  BUFF = 'buff',
  ULTIMATE = 'ultimate'
}

//ABBADON
const MistCoil: HeroMove = {
  name: "Mist Coil",
  damage: 30,
  heal: 30,
  moveTypes: [MoveType.HEAL, MoveType.DAMAGE],
  description: 'A move to either heal 30 or damage 30'
}

const AphoticSheild: HeroMove = {
  name: "Aphotic Sheild",
  damage: 50,
  moveTypes: [MoveType.SHIELD, MoveType.DAMAGE],
  description: 'Shield friend for 50 damage'
}

const CurseOfAvernus: HeroMove = {
  name: "Curse Of Avernus",
  damage: 5,
  moveTypes: [MoveType.DAMAGE],
  description: 'silence enemy for 1 attack'
}

const BorrowedTime: HeroMove = {
  name: "Borrowed Time",
  damage: 0,
  moveTypes: [MoveType.HEAL, MoveType.ULTIMATE],
  description: 'Damage dealt to Abbadon instead heals for 2 turns'
}

//ALCHEMIST
const AcidSpray: HeroMove = {
  name: "Acid Spray",
  damage: 5,
  moveTypes: [MoveType.DAMAGE],
  description: 'Reduces enemy armour by 3 and does 5 damage to both enemies for 3 turns'
}

const UnstableConcoction: HeroMove = {
  name: "Unstable Concoction",
  damage: 60,
  moveTypes: [MoveType.DAMAGE],
  description: 'Stuns an enemy for one turn'
}

const GreevilsGreed: HeroMove = {
  name: "Greeviles Greed",
  damage: 0,
  moveTypes: [MoveType.HEAL],
  description: 'WIP'
}

const ChemicalRage: HeroMove = {
  name: "Chemical Rage",
  damage: 0,
  moveTypes: [MoveType.HEAL, MoveType.ULTIMATE],
  description: 'Increases Alchemists health regen by 50 for 2 turns'
}

//AXE
const BeserkersCall: HeroMove = {
  name: "Beserkers Call",
  damage: 0,
  moveTypes: [MoveType.TAUNT],
  description: 'Forces both enemies to attack Axe'
}

const BattleHunger: HeroMove = {
  name: "Battle Hunger",
  damage: 10,
  moveTypes: [MoveType.DAMAGE, MoveType.BUFF],
  description: 'Deals damage to single hero and increases team speed by WIP'
}

const CounterHelix: HeroMove = {
  name: "Counter Helix",
  damage: 20,
  moveTypes: [MoveType.BUFF],
  description: 'Anyone dealing damage to axe takes 20 damage'
}

const CullingBlade: HeroMove = {
  name: "Culling Blade",
  damage: 60,
  moveTypes: [MoveType.DAMAGE, MoveType.ULTIMATE],
  description: 'Kills anyone instantly below 100 health or deals 60 damage'
}

//BEASTMASTER
const WildAxes: HeroMove = {
  name: "Wild Axes",
  damage: 30,
  moveTypes: [MoveType.DAMAGE],
  description: 'Deals 30 damage to both enemies'
}

const CallOfTheWild: HeroMove = {
  name: "Call of the Wild",
  damage: 20,
  moveTypes: [MoveType.DAMAGE, MoveType.SLOW],
  description: 'Deals 20 damage and slows the enemy for 2 turns'
}

const InnerBeast: HeroMove = {
  name: "Inner Beast",
  damage: 20,
  moveTypes: [MoveType.BUFF],
  description: 'Increases teams speed for 3 turns'
}

const PrimalRoar: HeroMove = {
  name: "Primal Roar",
  damage: 20,
  moveTypes: [MoveType.DAMAGE, MoveType.STUN, MoveType.ULTIMATE],
  description: 'Deals 20 damage and slows the enemy for 2 turns'
}


export const AbbadonMoves = {MistCoil, AphoticSheild, CurseOfAvernus, BorrowedTime}
export const AlchemistMoves = {AcidSpray, UnstableConcoction, GreevilsGreed, ChemicalRage}
export const AxeMoves = {BeserkersCall, BattleHunger, CounterHelix, CullingBlade}
export const BeastMasterMoves = {WildAxes, CallOfTheWild, InnerBeast, PrimalRoar}