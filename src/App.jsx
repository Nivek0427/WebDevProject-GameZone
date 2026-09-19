import { useState } from 'react'
import { Inicio } from './pages/Inicio'
import { GestionCategorias } from './components/categoria/GestionCateorias'
import { GestionProductos } from './components/Producto/GestionProductos'
import './App.css'

function App() {
   

  return (
    <>
      <GestionProductos />
    </>
  )
}

export default App;
