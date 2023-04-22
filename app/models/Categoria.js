const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

module.exports = model('Categorias',CategoriaSchema)