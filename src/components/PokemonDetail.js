import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, CardMedia, Box, List, ListItem, ListItemText } from '@mui/material'
import { fetchPokemonDetails } from '../api/pokeAPI'
import { catchPokemon } from '../api/backendAPI'
import { useDispatch, useSelector } from 'react-redux'
import { catchPokemon as catchPokemonRedux } from '../redux/actions/pokemonActions'
import { capitalizeFirstLetter } from '../utils/stringUtils'


function PokemonDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const caughtPokemons = useSelector(state => state.pokemons.caughtPokemons)
  const [pokemon, setPokemon] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loadPokemon = async () => {
      const data = await fetchPokemonDetails(id)
      setPokemon(data)
    }
    loadPokemon()
  }, [id])

  const handleCatch = async () => {
    if (pokemon) {
      const isAlreadyCaught = caughtPokemons.some(p => p.id === pokemon.id)
      if (isAlreadyCaught) {
        alert(`${pokemon.name} has already been caught!`)
        return
      }

      try {
        const modifiedName = `Mighty ${capitalizeFirstLetter(pokemon.name)}`
        const success = await catchPokemon({ ...pokemon, nickname: modifiedName })
        // console.log(success, "=====")
        if (success) {
          alert(`You caught ${modifiedName}!`)
          dispatch(catchPokemonRedux({ ...pokemon, nickname: modifiedName }))

          navigate('/my-pokemon')
        } else {
          alert('Failed to catch the Pokémon. Try again!')
        }
      } catch (error) {
        // console.error('Error catching Pokemon:', error)
        alert('Failed to catch the Pokémon due to a network error.')
      }
    }
  }

  return (
    <Box display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 800 }}>
        <CardContent>
          {pokemon ? (
            <>
              <Typography gutterBottom variant="h4" component="h2" align="center">
                {pokemon.name} (#{pokemon.id})
              </Typography>
              <CardMedia
                component="img"
                image={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                sx={{ height: 400, maxWidth: 400, margin: '0 auto' }}
              />
              <Typography variant="body1" color="textSecondary" component="p" mt={2} align="center">
                Types: {pokemon.types.map(type => type.type.name).join(', ')}
              </Typography>
              <List sx={{ maxHeight: 200, overflow: 'auto' }}>
                <ListItem>
                  <ListItemText primary={`Height: ${pokemon.height / 10} meters`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Weight: ${pokemon.weight / 10} kg`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Moves: ${pokemon.moves.slice(0, 10).map(move => move.move.name).join(', ')}`} />
                </ListItem>
              </List>
              <Button onClick={handleCatch} color="primary" variant="contained" fullWidth sx={{ mt: 2 }}>
                Catch Pokémon
              </Button>
            </>
          ) : (
            <Typography component="p">Loading...</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default PokemonDetail
