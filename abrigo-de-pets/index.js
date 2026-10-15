import express from 'express'

const app = express()
app.use(express.json())

// Dados
let pets = [
    { idPet: 1, dsNome: "Marley", dsEspecie: "cachorro", nuIdade: 5, fgAdotado: false },
    { idPet: 2, dsNome: "Mia", dsEspecie: "gato", nuIdade: 2, fgAdotado: false },
    { idPet: 3, dsNome: "Pipoca", dsEspecie: "coelho", nuIdade: 0.5, fgAdotado: false }
]

let ultimoId = 3
function findAll() {
    return pets
}

function findOne(idPet) {
    return pets.find(pet => pet.idPet === idPet)
}

function criarPet(dsNome, dsEspecie, nuIdade) {
    let novoId = ultimoId + 1
    ultimoId++

    const novoPet = {
        idPet: novoId,
        dsNome: dsNome,
        dsEspecie: dsEspecie,
        nuIdade: nuIdade,
        fgAdotado: false
    }

    pets.push(novoPet)
    return novoPet
}

app.get("/pets", (req, res) => {
    return res.status(200).json(findAll())
})

app.get("/pets/:id", (req, res) => {
    const idPet = parseInt(req.params.id)

    if (isNaN(idPet)) {
        return res.status(400).json({
            mensagem: "identificador deve ser um numero"
        })
    }

    const pet = findOne(idPet)

    if (!pet) {
        return res.status(404).json({
            mensagem: "pet não encontrado"
        })
    }

    return res.status(200).json(pet)
})



app.post("/pets", (req, res) => {
    const { dsNome, dsEspecie, nuIdade } = req.body
    const novoPet = criarPet(dsNome, dsEspecie, nuIdade)
    return res.status(201).json(novoPet)
})

app.listen(3000)