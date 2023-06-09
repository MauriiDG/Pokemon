import axios from 'axios';

export function postPokemon(payload) {
    return async function() {
        const response = await axios.post('http://localhost:3001/pokemons', payload)
        return response;
    };
};

export function searchPokemon(name) {
    return async function(dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name)
            return dispatch({
                type: 'SEARCH_NAME',
                payload: json.data
            })
        } catch {
            return alert('Pokemon not found')
        }
    };
};

export function filterByType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    };
};

export function sort(order) {
    return {
        type: 'SORT',
        payload: order
    };
;}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    };
};

export function filterByAttack(payload) {
    return {
        type: 'FILTER_BY_ATTACK',
        payload
    };
};

export function getPokemons() {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    };
};

export function getDetails(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    };
};

export function getType() {
    return async function(dispatch) {
        var json = await axios.get('/types')
        return dispatch ({
            type: 'GET_TYPE',
            payload: json.data
        })
    };
};