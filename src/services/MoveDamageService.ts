import {Hero} from "../types/Hero"
import {HeroMove} from "../types/HeroMove"

export const MoveDamageService = {

  attackHero: (attackedHero: Hero, attackingHero: Hero, move: HeroMove) => {
    let updatedHero = attackedHero
    console.log('updatedHero', updatedHero)
    const newHealth = attackedHero.health - move.damage
    attackedHero.health = newHealth
    console.log('newHealth', newHealth)
    console.log('updatedHero', updatedHero)
    return updatedHero
  }
}