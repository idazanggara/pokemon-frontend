import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material'
import { fetchPokemons } from '../api/pokeAPI' // Import the function from your API utility file

function PokemonList() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true)
      try {
        const fetchedPokemons = await fetchPokemons()
        setPokemons(fetchedPokemons.map((pokemon, index) => ({
          ...pokemon,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        })))
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch pokemons:', err)
        setError(err)
        setLoading(false)
      }
    }

    getPokemons()
  }, [])

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading Pokémon: {error.message}</Typography>

  return (
    <Grid container spacing={2}>
      {pokemons.map((pokemon, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {pokemon.name}
              </Typography>
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
                image={pokemon.imageUrl}
                alt={pokemon.name}
              />
              <Button component={Link} to={`/pokemon/${pokemon.name}`}>View Details</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default PokemonList
