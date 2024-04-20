import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PokemonList from './components/PokemonList'
import PokemonDetail from './components/PokemonDetail'
import MyPokemonList from './components/MyPokemonList'
import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material'

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1 }}>
            PokéDex
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/my-pokemon">My Pokemon List</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/my-pokemon" element={<MyPokemonList />} />
        </Routes>
      </Container>
    </Router>
  )
}


export default App
