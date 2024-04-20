// Action types
export const CATCH_POKEMON = 'CATCH_POKEMON'
export const RELEASE_POKEMON = 'RELEASE_POKEMON'
export const RENAME_POKEMON = 'RENAME_POKEMON'


// Action creators
export const catchPokemon = (pokemon) => ({
  type: CATCH_POKEMON,
  payload: pokemon
})

export const releasePokemon = (id) => ({
  type: RELEASE_POKEMON,
  payload: { id }
})

export const renamePokemon = (id, newName, nextFib) => ({
  type: RENAME_POKEMON,
  payload: { id, newName, nextFib }
})
