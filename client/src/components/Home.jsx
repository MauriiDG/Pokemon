import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterByType, filterCreated, filterByAttack, sort } from '../redux/actions';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import Paginate from './Paginate';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import './Home.css';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = useState(12);
    const indexLastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    function handleFilterType(e) {
        dispatch(filterByType(e.target.value))
    };
    
    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    };

    function handleFilterAttack(e) {
        dispatch(filterByAttack(e.target.value))
    };

    function onSelectChange(e) {
        dispatch(sort(e.target.value))
    };

    return (
        <div>
            <NavBar />
            <SearchBar classname='search' />
            <div className="home">
                <div>
                    <select name="select" onChange={onSelectChange} className='a-z'>
                        <option value='AZ'>A-Z</option>
                        <option value="ZA">Z-A</option>
                    </select>
                    <select name="selects" onChange={handleFilterAttack} className='attack'>
                        <option value='lowerAttack'>Lower Attack</option>
                        <option value='higherAttack'>Higher Attack</option>                        
                    </select>
                    <select onChange={handleFilterType}>
                        <option value="type"> Type </option>
                        <option value="normal"> Normal </option>
                        <option value="flying"> Flying </option>
                        <option value="poison"> Poison </option>
                        <option value="ground"> Ground </option>
                        <option value="bug"> Bug </option>
                        <option value="fire"> Fire </option>
                        <option value="water"> Water </option>
                        <option value="grass"> Grass </option>
                        <option value="electric"> Electric </option>
                        <option value="fairy"> Fairy </option>
                    </select>
                    <select onChange={handleFilterCreated}>
                        <option value='all'>All</option>
                        <option value='originals'>Originals</option>
                        <option value='created'>Created</option>
                    </select>
                    <Paginate pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginate={paginate} />
                    {currentPokemons?.map((e) => {
                        return (
                            <fragment>
                                <Link to={'/home' + e.id}>
                                    <PokemonCard name={e.name} image={e.image} types={e.types} />
                                </Link>
                            </fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};