import { useState } from 'react'
import { Header } from './layout/Header'
import { Menu } from './layout/Menu'
import { Banner } from './layout/Banner'
import { GameCard } from './layout/GameCard'
import './App.css'

function App() {
   const producto = [
        {
        id: 1,
        nombre: "EA Sports FC 26",
        descripcion: "Videojuego de fútbol",
        stock: 15,
        imagen: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
        precio: 159900,
        categoria: 1,
        estado: true
    },
    {
        id: 2,
        nombre: "Cyberpunk 2077",
        descripcion: "RPG de acción",
        stock: 10,
        imagen: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf",
        precio: 129900,
        categoria: 1,
        estado: true
    },
    {
        id: 3,
        nombre: "Minecraft",
        descripcion: "Juego de aventura",
        stock: 20,
        imagen: "https://images.unsplash.com/photo-1607513746994-51f730a44826",
        precio: 89900,
        categoria: 1,
        estado: true
    },
    {
        id: 4,
        nombre: "The Witcher 3",
        descripcion: "RPG",
        stock: 8,
        imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        precio: 109900,
        categoria: 1,
        estado: true
    },
    {
        id: 5,
        nombre: "Grand Theft Auto V",
        descripcion: "Acción y aventura",
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1560253023-3ec5d502959f",
        precio: 99900,
        categoria: 1,
        estado: true
    }
  ];

  return (
    <>
      <Header />
      <Menu />
      <Banner />
      <main>
        <ProductSection
                title="Juegos destacados"
                productos={productos}
            />
      </main>

    </>
  )
}

export default App;
