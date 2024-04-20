import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2'

export const fetchPokemons = async () => {
  try {
    const response = await axios.get(`${baseUrl}/pokemon?limit=50`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching Pokemons:', error)
    throw error
  }
}

export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/pokemon/${name}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Pokemon details:', error)
    throw error
  }
}
