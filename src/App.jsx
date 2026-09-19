import { useState } from 'react'
import { Inicio } from './pages/Inicio'
import { GestionCategorias } from './components/categoria/GestionCateorias'
import { GestionProductos } from './components/Producto/GestionProductos'
import { GestionClientes } from './components/Cliente/GestionClientes'
import { GestionUsuarios } from './components/Usuario/GestionUsuarios'
import { GestionEstadosOrden } from './components/EstadoOrden/GestionEstadosOrden'
import { GestionOrdenes } from './components/Orden/GestionOrdenes'
import { GestionInformacion } from './components/Informacion/GestionInformacion'
import './App.css'

function App() {
   

  return (
    <>
      <GestionInformacion />
    </>
  )
}

export default App;
