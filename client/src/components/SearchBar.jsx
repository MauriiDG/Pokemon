import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { searchPokemon } from '../redux/actions';
import './SearchBar.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchPokemon(name))
    };

    return (
        <div>
            <input className="search" type='text' onChange={(e) => handleInputChange(e)} placeholder=' '/>
            <button className="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>
                Search
            </button> 
        </div>
    )

}
