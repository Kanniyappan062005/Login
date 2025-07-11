import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <h1>My App</h1>
        <Outlet/>
        <h2>Footer</h2>
    </div>
  )
}

export default Layout