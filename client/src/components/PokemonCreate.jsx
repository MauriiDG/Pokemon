import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getType, postPokemon } from '../redux/actions';
import './PokemonCreate.css';

function validate(pokemon) {
    let errors = {};
    if(!pokemon.name) {
        errors.name = 'Name required'
    } return errors
};

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types);

    const [errors, setErrors] = useState({});

    const [pokemon, setPokemon] =useState({
        name: '',
        types: [],
        image: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0
    });

    useEffect(() => {
        dispatch(getType());
    }, [dispatch])

    function handleSelect(e) {
        setPokemon({
            ...pokemon,
            type: [...pokemon.type, e.target.value]
        })
    }

    function inputChange(e) {
        e.preventDefault();
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...pokemon,
                [e.target.name]: e.target.value
            })
        )
    }

    function onSubmit(e) {
        e.preventDefault();
        dispatch(postPokemon(pokemon));
        alert('Pokemon created!');
        setPokemon({
            name: "",
            types: [],
            image: "",
            life: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0
        })
        history.push('/home')
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <h3 className="title">Create your own Pokemon</h3>

            <label for='name'>Name: </label>
            <input className="input"
            onChange={inputChange} 
            id='name'
            name= "name"
            type= 'text'
            value={pokemon.name}
            required
            />{' '}
            {errors.name && <p className="error">{errors.name}</p>}

            <label htmlFor="">Image: </label>
            <input className="input"
            onChange={inputChange}
            name= 'image'
            type= 'text'
            value= {pokemon.image}
            />{' '}

            <label htmlFor="">Life: </label>
            <input className="input"
            onChange={inputChange}
            name= 'life'
            type= 'number'
            value= {pokemon.life}
            />{' '}

            <label htmlFor="">Attack: </label>
            <input className="input"
            onChange={inputChange}
            name= 'attack'
            type= 'number'
            value={pokemon.attack}
            />{' '}

            <label htmlFor="">Defense: </label>
            <input className="input"
            onChange={inputChange}
            name= 'defense'
            type= 'number'
            value={pokemon.defense}
            />{' '}

            <label htmlFor="">Speed: </label>
            <input className="input"
            onChange={inputChange}
            name= 'speed'
            type= 'number'
            value={pokemon.speed}
            />{' '}

            <label htmlFor="">Height: </label>
            <input className="input"
            onChange={inputChange}
            name= 'height'
            type= 'number'
            value={pokemon.height}
            />{' '}

            <label htmlFor="">Weight: </label>
            <input className="input"
            onChange={inputChange}
            name= 'weight'
            type= 'number'
            value={pokemon.weight}
            />{' '}

            <p className="types-c">
                <select onChange={handleSelect}>
                    {types.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))} {' '}
                </select>
                <ul>
                    <li>
                        {pokemon.types.map((e) => e + ' , ')}
                    </li>
                </ul>
            </p>
            <Link to='/home'>
                <button type="submit" className="back">Home</button>
            </Link>
            <button type="submit" className="bottom">Create</button>
        </form>
    )
};
