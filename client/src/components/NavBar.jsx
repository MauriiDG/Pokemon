import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';
import img from '../assets/pokeball_icon.png'

export default function NavBar() {
    return (
        <header className="header">
            <Link to='/home'>
                <img className="logo" src={img} alt="Img not found"/>
            </Link>
            <div>
                <Link to='/create' className="created">
                    Create Pokemon
                </Link>
            </div>
        </header>
    )
}