import {Hero} from "../types/Hero"
import {HeroMove} from "../types/HeroMove"
import {PlayerContent} from "../game-progression-components/PlayDotaDuos"

export const MoveDamageService = {

  attackHero: (attackedHero: Hero, attackingHero: Hero, move: HeroMove) => {
    let updatedHero = attackedHero
    let newHealth;

    newHealth = attackedHero.health - move.damage

    attackedHero.health = newHealth
    return updatedHero
  },

  updatePlayerOneTop: (playerOne: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerOne = {...playerOne}
    updatedPlayerOne.activeHeroes.top = damagedHero;

    const index = updatedPlayerOne.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerOne.heroes[index] = damagedHero

    updatedPlayerOne.heroes[index].fainted = MoveDamageService.checkIfFainted(updatedPlayerOne.heroes[index].health)

    return updatedPlayerOne
  },

  updatePlayerOneBottom: (playerOne: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerOne = {...playerOne}
    updatedPlayerOne.activeHeroes.bottom = damagedHero;

    const index = updatedPlayerOne.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerOne.heroes[index] = damagedHero

    updatedPlayerOne.heroes[index].fainted = MoveDamageService.checkIfFainted(updatedPlayerOne.heroes[index].health)

    return updatedPlayerOne
  },

  updatePlayerTwoTop: (playerTwo: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerTwo = {...playerTwo}
    updatedPlayerTwo.activeHeroes.top = damagedHero;

    const index = updatedPlayerTwo.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerTwo.heroes[index] = damagedHero

    updatedPlayerTwo.heroes[index].fainted = MoveDamageService.checkIfFainted(updatedPlayerTwo.heroes[index].health)

    return updatedPlayerTwo
  },

  updatePlayerTwoBottom: (playerTwo: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerTwo = {...playerTwo}
    updatedPlayerTwo.activeHeroes.bottom = damagedHero;

    const index = updatedPlayerTwo.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerTwo.heroes[index] = damagedHero

    updatedPlayerTwo.heroes[index].fainted = MoveDamageService.checkIfFainted(updatedPlayerTwo.heroes[index].health)

    return updatedPlayerTwo
  },

  checkIfFainted: (health: number): boolean => {
    return health <= 0
  }
}