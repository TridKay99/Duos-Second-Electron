import {HeroMove} from "./moves";
import {AbbadonMoves, AlchemistMoves, AxeMoves} from "./moves";


export enum ImageSize {
  SMALL = '_sb.png',
  MEDIUM = '_lg.png',
  FULL = '_full.png',
  VERT = '_vert.jpg'
}

export type Hero = {
  id: number,
  name: string,
  health?: number,
  armour?: number,
  healthRegen?: number,
  moves?: HeroMove[]
}

export const HeroImageUrl = (heroName: string , size: ImageSize) => {
  return `http://cdn.dota2.com/apps/dota2/images/heroes/${heroName.toLowerCase()}${size}`
}

export const Heroes: Hero[] = [
  {id: 1,
    //WIP ABBADON
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
    moves: [AxeMoves.BeserkersCall, AxeMoves.BattleHunger, AxeMoves.CounterHelix, AxeMoves.CullingBlade]},
  {id: 2,
    name: "Beastmaster"},
  {id: 2,
    name: "Brewmaster"},
  {id: 2,
    name: "Bristleback"},
  {id: 2,
    name: "Centaur"},
  {id: 2,
    name: "Chaos_Knight"},
  //WIP CLOCKWERK
  {id: 2,
    name: "Puck"},
  //WIP DOOM
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Dragon_Knight"},
  {id: 2,
    name: "Earth_Spirit"},
  {id: 2,
    name: "Earthshaker"},
  {id: 2,
    name: "Elder_Titan"},
  {id: 2,
    name: "Huskar"},
  {id: 2,
    name: "Kunkka"},
  {id: 2,
    name: "Legion_Commander"},
  //WIP NAIX
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Lycan"},
  //WIP MAGNUS
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Mars"},
  {id: 2,
    name: "Night_Stalker"},
  {id: 2,
    name: "Omniknight"},
  {id: 2,
    name: "Phoenix"},
  {id: 2,
    name: "Pudge"},
  {id: 2,
    name: "Sand_King"},
  {id: 2,
    name: "Slardar"},
  {id: 2,
    name: "Snapfire"},
  {id: 2,
    name: "Spirit_Breaker"},
  {id: 2,
    name: "Sven"},
  {id: 2,
    name: "Tidehunter"},
  //WIP TIMBERSAW
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Tiny"},
  //WIP TREANT_PROTECTOR
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Tusk"},
  // WIP PENIS
  {id: 2,
    name: "Underlord"},
  {id: 2,
    name: "Undying"},
  {id: 2,
    name: "Skeleton_King"},
  {id: 2,
    //WIP
    name: "Puck"},
  {id: 2,
    name: "Bloodseeker"},
  {id: 2,
    name: "Bounty_Hunter"},
  {id: 2,
    name: "Broodmother"},
  {id: 2,
    name: "Clinkz"},
  {id: 2,
    name: "Drow_Ranger"},
  {id: 2,
    name: "Ember_Spirit"},
  {id: 2,
    name: "Faceless_Void"},
  {id: 2,
    name: "Gyrocopter"},
  {id: 2,
    name: "Juggernaut"},
  {id: 2,
    name: "Lone_Druid"},
  {id: 2,
    name: "Luna"},
  {id: 2,
    name: "Medusa"},
  {id: 2,
    name: "Meepo"},
  {id: 2,
    name: "Mirana"},
  {id: 2,
    name: "Monkey_King"},
  {id: 2,
    name: "Morphling"},
  {id: 2,
    name: "Naga_Siren"},
  {id: 2,
    name: "Nyx_Assassin"},
  {id: 2,
    name: "Pangolier"},
  {id: 2,
    name: "Phantom_Assassin"},
  {id: 2,
    name: "Phantom_Lancer"},
  {id: 2,
    name: "Razor"},
  {id: 2,
    name: "Riki"},
  //WIP SHADOW FIEND
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Slark"},
  {id: 2,
    name: "Sniper"},
  {id: 2,
    name: "Spectre"},
  {id: 2,
    name: "Templar_Assassin"},
  {id: 2,
    name: "Terrorblade"},
  {id: 2,
    name: "Troll_Warlord"},
  {id: 2,
    name: "Ursa"},
  //WIP VENGE
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Venomancer"},
  {id: 2,
    name: "Viper"},
  {id: 2,
    name: "Weaver"},
  //INTELLECT
  {id: 2,
    name: "Ancient_Apparition"},
  {id: 2,
    name: "Bane"},
  {id: 2,
    name: "Batrider"},
  {id: 2,
    name: "Chen"},
  {id: 2,
    name: "Crystal_Maiden"},
  {id: 2,
    name: "Dark_Seer"},
  {id: 2,
    name: "Dark_Willow"},
  {id: 2,
    name: "Dazzle"},
  {id: 2,
    name: "Death_Prophet"},
  {id: 2,
    name: "Disruptor"},
  {id: 2,
    name: "Enchantress"},
  {id: 2,
    name: "Enigma"},
  {id: 2,
    name: "Grimstroke"},
  {id: 2,
    name: "Invoker"},
  {id: 2,
    name: "Jakiro"},
  {id: 2,
    name: "Keeper_Of_The_Light"},
  {id: 2,
    name: "Leshrac"},
  {id: 2,
    name: "Lich"},
  {id: 2,
    name: "Lina"},
  {id: 2,
    name: "Lion"},
  //WIP Natures P
  {id: 2,
    name: "Puck"},
  //WIP Necro
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Ogre_Magi"},
  {id: 2,
    name: "Oracle"},
  //WIP OUTWORLD DEVOURER
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Pugna"},
  //WIP QOP
  {id: 2,
    name: "Puck"},
  {id: 2,
    name: "Rubick"},
  {id: 2,
    name: "Shadow_Demon"},
  {id: 2,
    name: "Shadow_Shaman"},
  {id: 2,
    name: "Silencer"},
  {id: 2,
    name: "Skywrath_Mage"},
  {id: 2,
    name: "Storm_Spirit"},
  {id: 2,
    name: "Techies"},
  {id: 2,
    name: "Tinker"},
  {id: 2,
    name: "Visage"},
  {id: 2,
    name: "Void_Spirit"},
  {id: 2,
    name: "Warlock"},
  {id: 2,
    name: "Windrunner"},
  //WIP WINTER WYVERN
  {id: 2,
    name: "puck"},
  {id: 2,
    name: "Witch_Doctor"},
  //WIP ZUES
  {id: 2,
    name: "Puck"}
]