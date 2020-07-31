import {Hero} from "../types/Hero"
import {HeroMove} from "../types/HeroMove"
import {PlayerContent} from "../game-progression-components/PlayDotaDuos"

export const MoveDamageService = {

  attackHero: (attackedHero: Hero, attackingHero: Hero, move: HeroMove) => {
    let updatedHero = attackedHero
    const newHealth = attackedHero.health - move.damage
    attackedHero.health = newHealth
    return updatedHero
  },

  updatePlayerOneTop: (playerOne: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerOne = {...playerOne}
    updatedPlayerOne.activeHeroes.top = damagedHero;

    const index = updatedPlayerOne.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerOne.heroes[index] = damagedHero

    return updatedPlayerOne
  },

  updatePlayerOneBottom: (playerOne: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerOne = {...playerOne}
    updatedPlayerOne.activeHeroes.bottom = damagedHero;

    const index = updatedPlayerOne.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerOne.heroes[index] = damagedHero

    return updatedPlayerOne
  },

  updatePlayerTwoTop: (playerTwo: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerTwo = {...playerTwo}
    updatedPlayerTwo.activeHeroes.top = damagedHero;

    const index = updatedPlayerTwo.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerTwo.heroes[index] = damagedHero

    return updatedPlayerTwo
  },

  updatePlayerTwoBottom: (playerTwo: PlayerContent, damagedHero: Hero) => {
    const updatedPlayerTwo = {...playerTwo}
    updatedPlayerTwo.activeHeroes.bottom = damagedHero;

    const index = updatedPlayerTwo.heroes.findIndex(hero => hero.name === damagedHero.name)
    updatedPlayerTwo.heroes[index] = damagedHero

    return updatedPlayerTwo
  }
}