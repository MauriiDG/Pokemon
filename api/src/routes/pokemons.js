const { Router} = require('express');
const getAllPokemons = require('../controllers/getPokemon');
const router = Router();
const { Pokemon, Type } = require('../db');

router.get('/pokemons', async(req, res, next) => {
    try {
        let name = req.query.name; //Recibo la request en una variable
        let allPokemons = await getAllPokemons(); //Guardo todos los pokemons en una variable
        if (name) { //Si me pasan un nombre lo busco en la variable
            let pokemonName = await allPokemons.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length
            ? res.status(200).send(pokemonName) //Si lo encuentro lo devuelvo
            : res.status(404).send('Enter a valid Pokemon')
        } else {
            res.status(200).send(allPokemons) //Sino devuelvo todos
        }
    } catch(error) {
        next(error)
    }
});

router.get('pokemons/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const allPokemons = await getAllPokemons();
        if (id) { //Si me pasan un ID, filtro el que coincida con el mismo
            let pokemonId = allPokemons.filter((el) => el.id == id);
            pokemonId.length
            ? res.status(200).json(pokemonId)
            : res.status(404).send('Pokemon not found')
        }
    } catch(error) {
        next(error)
    }
});

router.post('/', async(req, res, next) => { //Creacion del pokemon
    try {
        let { name, image, life, attack, defense, speed, height, weight, types} = req.body //Datos que tengo que pedir

        const newPokemon = await Pokemon.create({
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight
        });

        if (!name) return res.json({ info: 'Your Pokemon must have a name!'});
        
        if (Array.isArray(types) && types.length) { //Consulto si lo que me llega en TYPES, es un arreglo y si tiene algo adentro
            let dbTypes = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
                types.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en nuestra tabla de tipos
                    return Type.findOne({ where: { name: e }})
                })
            )
            await newPokemon.setTypes(dbTypes)

            return res.send('Pokemon created!')
        }
    } catch(error) {
        res.status(404).send('Error')
    }
})

module.exports = router;