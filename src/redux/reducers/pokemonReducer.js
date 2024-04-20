import { CATCH_POKEMON, RELEASE_POKEMON, RENAME_POKEMON } from '../actions/pokemonActions'

const initialState = {
  caughtPokemons: []
}

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATCH_POKEMON:
      return {
        ...state,
        caughtPokemons: [...state.caughtPokemons, action.payload]
      }
    case RELEASE_POKEMON:
      return {
        ...state,
        caughtPokemons: state.caughtPokemons.filter(pokemon => pokemon.id !== action.payload.id)
      }
    case RENAME_POKEMON:
      return {
        ...state,
        caughtPokemons: state.caughtPokemons.map(pokemon =>
          pokemon.id === action.payload.id ? { ...pokemon, nickname: action.payload.newName, fibCount: action.payload.nextFib } : pokemon
        )
      }
    default:
      return state
  }
}

export default pokemonReducer
