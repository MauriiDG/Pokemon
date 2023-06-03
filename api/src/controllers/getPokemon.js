const axios = require('axios')
const { Pokemon, Type } = require('../db')

function getApiInfo() {
    return new Promise((resolve, reject) => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
            .then(response => {
                const resp = {
                    pokemons: response.data.results.map(pokemon => (
                        {
                            id: pokemon.id,
                            name: pokemon.name,
                            types: pokemon.types.map((t) => t.type.name),
                            image: pokemon.sprites.front_default,
                            life: pokemon.stats[0].base_stat,
                            attack: pokemon.stats[1].base_stat,
                            defense: pokemon.stats[2].base_stat,
                            speed: pokemon.stats[3].base_stat,
                            height: pokemon.height,
                            weight: pokemon.weight
                        }
                    ))
                }
                resolve(resp);
            })
            .catch(error => reject(error))
    })
} 
//     const resp = await axios
//         .get('https://pokeapi.co/api/v2v2/pokemon?limit=40')
//         .then((data) => {
//             return data.data.results;
//         })
//         .then((data) => {
//             return Promise.all(data.map((res) => axios.get(res.url))) //Entra a cada elemento y hace un get a la url
//         })
//         .then((data) => {
//             return data.map((res) => res.data) //Resultado de cada pokemon que se guarda en resp
//         });
    
//     let pokemonProps = resp.map((res) => { //Traigo las props de cada pokemon
//         return {
//             id: res.id,
//             name: res.name,
//             types: res.types.map((t) => t.type.name), //Tipos en prop name
//             image: res.sprites.front_default,
//             life: res.stats[0].base_stat,
//             attack: res.stats[1].base_stat,
//             defense: res.stats[2].base_stat,
//             speed: res.stats[3].base_stat,
//             height: res.height,
//             weight: res.weight
//         };
//     });
//     return pokemonProps;
// };

const getDbInfo = async() => {
    try {
        const result = await Pokemon.findAll({ //Traigo todo lo de la tabla pokemon, incluida la relacion con Type
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return result;
    } catch(error) {
        console.log(error)
    }
}

const getAllPokemons = async() => {
    const apiInfo = await getApiInfo(); //Datos de api
    const dbInfo = await getDbInfo(); //Datos de db
    const allInfo = apiInfo.concat(dbInfo); //Junto los datos
    return allInfo;
}

module.exports = getAllPokemons;