import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/pokemon'

export const catchPokemon = async (pokemon) => {
  try {
    const response = await axios.post(`${baseUrl}/catch`, pokemon, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.success
  } catch (error) {
    console.error('Error catching Pokemon:', error)
    throw error
  }
}

export const releasePokemon = async (id) => {
  try {
    const response = await axios.post(`${baseUrl}/release`, { id })
    return response.data.success
  } catch (error) {
    console.error('Error releasing Pokemon:', error)
    throw error
  }
}

export const renamePokemon = async (id, name) => {
  // console.log(name, "API---")
  try {
    const response = await axios.post(`${baseUrl}/rename`, { id, name }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.newName
  } catch (error) {
    console.error('Error renaming Pokemon:', error)
    throw error
  }
}

export const resetFibonacciSequence = async (pokemonId) => {
  try {
    const response = await axios.post(`${baseUrl}/reset-fibonacci`, { id: pokemonId }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error resetting Fibonacci sequence:', error)
    throw error
  }
};

