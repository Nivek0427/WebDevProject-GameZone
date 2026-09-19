import { useState } from 'react'
import { Header } from './layout/Header'
import { Menu } from './layout/Menu'
import { Banner } from './layout/Banner'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Menu />
      <Banner />

    </>
  )
}

