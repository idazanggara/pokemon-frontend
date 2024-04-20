import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, Typography, Button, Grid, CardMedia } from '@mui/material'
import { releasePokemon, renamePokemon, resetFibonacciSequence } from '../api/backendAPI'
import { releasePokemon as releasePokemonAction, renamePokemon as renamePokemonAction } from '../redux/actions/pokemonActions'

function MyPokemonList() {
  const caughtPokemons = useSelector(state => state.pokemons.caughtPokemons)
  const dispatch = useDispatch()

  const handleRelease = async (id) => {
    try {
      const releaseSuccess = await releasePokemon(id)
      if (releaseSuccess) {
        alert('Pokémon released successfully.')
        dispatch(releasePokemonAction(id))
        await resetFibonacciSequence(id)
      } else {
        alert('Failed to release Pokémon.')
      }
    } catch (error) {
      console.error('Error releasing Pokemon:', error)
      alert('Failed to release Pokémon due to a network error.')
    }
  }

  const handleRename = async (pokemon) => {

    const nextFib = pokemon.fibCount + 1
    const newName = await renamePokemon(pokemon.id, pokemon.nickname)
    if (newName) {
      dispatch(renamePokemonAction(pokemon.id, newName, nextFib))
      alert(`Pokémon renamed successfully to ${newName}.`)
    } else {
      alert('Failed to rename Pokémon.')
    }
  }


  return (
    <Grid container spacing={2} justifyContent={caughtPokemons.length === 1 ? "center" : "flex-start"}>
      {caughtPokemons.map((pokemon, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5">
                {pokemon.nickname}
              </Typography>
              <CardMedia
                component="img"
                image={pokemon.sprites.front_default}
                alt={pokemon.nickname}
                style={{ height: 140, width: 'auto', margin: 'auto' }}
              />
              <Button onClick={() => handleRename(pokemon)} color="primary" variant="contained" sx={{ mr: 1 }}>
                Rename
              </Button>
              <Button onClick={() => handleRelease(pokemon.id)} color="secondary" variant="contained" sx={{ ml: 1 }}>
                Release
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {caughtPokemons.length === 0 && (
        <Grid item xs={12}>
          <Typography textAlign="center">No Pokémon caught yet.</Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default MyPokemonList
