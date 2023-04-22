const { Schema, model } = require('mongoose')

const PacienteSchema = Schema({
    name: {
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    }
})

module.exports = model('Pacientes',PacienteSchema)