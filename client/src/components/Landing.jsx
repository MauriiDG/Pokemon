import React, { useEffect  } from 'react'
import { useHistory } from 'react-router-dom';
import './Landing.css'
import image from '../assets/wp2432874.webp'


function Landing() {

    const history = useHistory();
  
  useEffect(() => {
    setTimeout(() => {
      history.push('/home')
    }, 3500)
  })

  return (
    <img src={image} alt='Pokemons Page' /> 
  )
}

export default Landing