import React from 'react'
import App from './App'
import {createRoot } from 'react-dom/client'


const container = document.getElementById('container')

createRoot(container).render(<App/>)