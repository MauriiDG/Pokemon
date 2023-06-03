import React from "react";
import './Paginate.css';

export default function Paginate({ pokemonsPerPage, allPokemons, paginate}) {
    const pageNumbers = [];
    for ( let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="paginate">
                {pageNumbers.map(number => {
                    <li className="number" key='num'> 
                        <button className="btn" onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                })}
            </ul>
        </nav>
    )
}
