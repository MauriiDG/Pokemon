import React from "react";
import './PokemonCard.css';

export default function PokemonCard({name, types, image}) {
    return (
        <div className="stylesCard">
            <h3 className="name">{name}</h3>
            <img src={image} alt={name} width='120px' height='120px' />
            <ul className="typeStyle">
                <li className="type">
                    {
                        typeof types[0] ==='string' ? types[0].charAt(0).toUpperCase() + types[0].slice(1) : types[0]?.name.charAt(0).toUpperCase() +
                        types[0].name.slice(1)
                    }
                    {
                        typeof types[1] === 'string' ? ' - ' + types[1] : types[1]?.name
                    }
                </li>
            </ul>
        </div>
    )
}