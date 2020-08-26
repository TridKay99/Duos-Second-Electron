import {HeroMove} from "../types/HeroMove"
import {MoveType} from "../enums/MoveType"

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
  moveTypes: [MoveType.DAMAGE],
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
  description: 'Deals 20 damage and stuns the enemy for 2 turns'
}

//BREWMASTER
const ThunderClap: HeroMove = {
  name: "Thunder Clap",
  damage: 40,
  moveTypes: [MoveType.DAMAGE, MoveType.SLOW],
  description: 'Deals 40 damage and slow the enemy for 2 turns'
}

const CinderBrew: HeroMove = {
  name: "Cinder Brew",
  damage: 0,
  moveTypes: [MoveType.TAUNT, MoveType.DAMAGE_AMP],
  description: 'Amps damage '
}

const DrunkenBrawler: HeroMove = {
  name: 'Drunken Brawler',
  damage: 0,
  moveTypes: [MoveType.BUFF],
  description: 'raises speed and crit for 3 turns'
}

const PrimalSpirit: HeroMove = {
  name: 'Primal Spirit',
  damage: 80,
  moveTypes: [MoveType.DAMAGE, MoveType.ULTIMATE, MoveType.STUN],
  description: 'Does 3 attacks that damages, stuns and SOMETHING ELSE'
}

//BRISTLEBACK

const ViscousNasalGoo = {
  name: 'Viscous Nasal Goo',
  damage: 0,
  moveTypes: [MoveType.SLOW, MoveType.DAMAGE_AMP],
  description: 'Slows the target and makes them take more damage'
}

const QuillSpray = {
  name: 'Quill Spray',
  damage: 20,
  moveTypes: [MoveType.DAMAGE],
  description: 'If used last turn then it does an extra 20 damage'
}

const Bristleback = {
  name: 'Bristleback',
  damage: 0,
  moveTypes: [MoveType.TAUNT, MoveType.BUFF],
  description: 'Bristle taunts opponent and gains 10 armour'
}

const Warpath = {
  name: 'Warpath',
  damage: 0,
  moveTypes: [MoveType.BUFF],
  description: 'Bristle gets faster and quill spray deals more damage for 3 turns'
}

//CENTAUR MOVES

const HoofStomp = {
  name: 'Hoof Stomp',
  damage: 30,
  moveTypes: [MoveType.DAMAGE, MoveType.STUN],
  description: 'Centaur stuns and damages target for a turn'
}

const DoubleEdge = {
  name: 'Double Edge',
  damage: 80,
  moveTypes: [MoveType.DAMAGE, MoveType.SELF_INFLICT],
  description: 'Centaur damages a hero himself'
}

const Retaliate = {
  name: 'Retaliate',
  damage: 10,
  moveTypes: [MoveType.BLADE_MAIL],
  description: 'When someone attacks Centaur, they take 10 damage'
}

const Stampede = {
  name: 'Stampede',
  damage: 0,
  moveTypes: [MoveType.SPEED_INCREASE],
  description: 'Increases speed for whole team for 3 turns'
}

// CHAOS KNIGHT
const ChaosBolt = {
  name: 'Chaos Bolt',
  damage: 30,
  moveTypes: [MoveType.STUN, MoveType.DAMAGE],
  description: 'Stuns and damages an enemy Hero'
}

const RealityRift = {
  name: 'Reality Rift',
  damage: 20,
  moveTypes: [MoveType.DAMAGE, MoveType.ARMOUR_REDUCTION],
  description: 'Damages and reduces armour for a hero for 2 turns'
}

const ChaosStrike = {
  name: 'Chaos Strike',
  damage: 30,
  moveTypes: [MoveType.DAMAGE, MoveType.LIFE_STEAL],
  description: 'Deals damage to an enemy hero and heals Chaos Knight'
}

const Phantasm = {
  name: 'Phantasm',
  damage: 0,
  moveTypes: [MoveType.ULTIMATE],
  description: 'Give Chaos Knight a chance to use one of his other moves twice per turn'
}

//DRAGON KNIGHT MOVES
const BreatheFire = {
  name: 'Breathe Fire',
  damage: 30,
  moveTypes: [MoveType.DAMAGE, MoveType.DAMAGE_REDUCTION],
  description: 'Damages enemy hero and lowers their attack'
}

const DragonTail = {
  name: 'Dragon Tail',
  damage: 30,
  moveTypes: [MoveType.DAMAGE, MoveType.STUN],
  description: 'Damages enemy hero and stun for 1 turn'
}

const DragonBlood = {
  name: 'Dragon Blood',
  damage: 0,
  moveTypes: [MoveType.ARMOUR_INCREASE],
  description: 'Raises Dragon Knights armour for 4 turns'
}

const DragonForm = {
  name: 'Dragon Form',
  damage: 0,
  moveTypes: [MoveType.ULTIMATE, MoveType.TRANSFORM, MoveType.DOT],
  description: 'Transforms the knight into a dragon and all moves make heroes burn for 20% of the damage taken for 3 turns'
}

//EARTHSPIRITS MOVES
const BoulderSmash = {
  name: 'Boulder Smash',
  damage: 15,
  moveTypes: [MoveType.SLOW, MoveType.DAMAGE, MoveType.AOE],
  description: 'Damages and slows both enemy heroes'
}

const RollingBoulder = {
  name: 'Rolling Boulder',
  damage: 20,
  moveTypes: [MoveType.DAMAGE, MoveType.STUN, MoveType.AOE],
  description: 'Stuns and damages both enemy heroes'
}

const GeomagneticGrip = {
  name: 'Geomagnetic Grip',
  damage: 0,
  moveTypes: [MoveType.SHIELD],
  description: 'Earth Spirit pulls ally out of the way to dodge incoming attacks'
}

const Magnetize = {
  name: 'Magnetize',
  damage: 0,
  moveTypes: [MoveType.ULTIMATE],
  description: 'Earth spirit makes all moves AOE for 3 turns'
}

export const AbbadonMoves = {MistCoil, AphoticSheild, CurseOfAvernus, BorrowedTime}
export const AlchemistMoves = {AcidSpray, UnstableConcoction, GreevilsGreed, ChemicalRage}
export const AxeMoves = {BeserkersCall, BattleHunger, CounterHelix, CullingBlade}
export const BeastMasterMoves = {WildAxes, CallOfTheWild, InnerBeast, PrimalRoar}
export const BrewMasterMoves = {ThunderClap, CinderBrew, DrunkenBrawler, PrimalSpirit}
export const BristlebackMoves = {ViscousNasalGoo, QuillSpray, Bristleback, Warpath}
export const CentaurMoves = {HoofStomp, DoubleEdge, Retaliate, Stampede}
export const ChaosKnightMoves = {ChaosBolt, RealityRift, ChaosStrike, Phantasm}
export const DragonKnightMoves = {BreatheFire, DragonTail, DragonBlood, DragonForm}
export const EarthSpiritMoves = {BoulderSmash, RollingBoulder, GeomagneticGrip, Magnetize}