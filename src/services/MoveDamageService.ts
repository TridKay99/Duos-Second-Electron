import {Hero} from "../types/Hero"
import {HeroMove} from "../types/HeroMove"

export const MoveDamageService = {

  attackHero: (attackedHero: Hero, attackingHero: Hero, move: HeroMove) => {
    let updatedHero = attackedHero
    const newHealth = attackedHero.health - move.damage
    attackedHero.health = newHealth
    return updatedHero
  }
}