const axios = require('axios');
const { Router } = require('express');
const { Type } = require('../db.js');

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const api = await axios.get("https://pokeapi.co/api/v2/type") //Trae todos los tipos
        const types = await api.data // trae la respuesta en data

        for (type of types.result) { //Entra a la propiedad results, a cada elemento
            const find = await Type.findOne({ name: type.name}) // Entra a la propiedad name y busca si ya existe 
            if (!find) { 
                await Type.create({ name: type.name }) // Si no lo encuentra lo agrega a la db
            } else {
                return res.json(await Type.findAll()) // Sino devuelve todos los tipos
            }
        }
        res.json(await type.findAll()) //Finalmente devuelvo todos los tipos de la db
    } catch (error) {
        next(error)
    }
});

module.exports = router;