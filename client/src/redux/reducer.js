const initialState = {
    pokemons: [],
    allPokemons: [],
    detail: [],
    types: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };
        
        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            const typeFiltered = action.payload === 'type'
                ? allPokemons : allPokemons.filter((e) => e.types.includes(action.payload))
            return {
                ...state,
                pokemons: typeFiltered
            };

        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'Created'
            ? state.allPokemons.filter((e) => e.id.length > 2) : state.allPokemons.filter((e) => e.id <= 40)
            return {
                ...state,
                pokemons: action.payload === 'All' ? state.allPokemons : createdFilter
            };

        case 'FILTER_BY_ATTACK':
            let attackFilter = [...state.pokemons];
            attackFilter = attackFilter.sort((a, b) => {
                if (a.attack < b.attack) {
                    return action.payload === 'Higher Attack' ? 1 : -1
                }
                if (a.attack > b.attack) {
                    return action.payload === 'Higher Attack' ? -1 : 1
                }
                return 0
            });
            return {
                ...state,
                pokemons: action.payload === 'Strength' ? state.allPokemons : attackFilter
            };
        
        case 'POST_POKEMON':
            return {
                ...state
            };

        case 'SORT':
            let orderedPokemons = [...state.pokemons]
            orderedPokemons = orderedPokemons.sort((a, b) => {
                if (a.name < b.name) {
                    return action.payload === 'A-Z' ? -1 : 1
                }
                if (a.name > b.name) {
                    return action.payload === 'A-Z' ? 1 : -1
                }
                return 0
            });
            return {
                ...state,
                pokemons: action.payload === 'Filter' ? state.allPokemons : orderedPokemons
            };

        case 'SEARCH_NAME':
            return {
                ...state,
                pokemons: action.payload
            };

        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            };

        case 'GET__TYPE':
            return {
                ...state,
                types: action.payload
            };

        default:
            return state 
    };
}

export default rootReducer;