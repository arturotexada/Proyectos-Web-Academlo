const express = require('express');
const db = require('./utils/database');
const Users = require("./models/users.models")
const cors = require('cors');
require('./models/users.models');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
//const Countries = require('./models/countries.models');
//const { log } = require('console');
// creamos una instancia de express llamada app

db.authenticate() // es una función asíncrona
    .then(() => console.log('Base de datos conectada'))
    .catch((err) => console.log(err));

db.sync()
    .then(() => console.log("Base sincronizada"))
    .catch((error) => console.log(error));

const app = express();
app.use(cors);
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Servidor corriendo...')
});


app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        // INSERT INTO users (firstname, lastname, email, password) VALUES ()   
        await Users.create(newUser);
        res.status(201).send();
        /*         firstname, lastname, email, password   */
    } catch (error) {
        res.status(400).json(error);
    }
});

// obtener a todos los usuarios de la base d edatos
// users.findAll();

/* app.get('/users', async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['firstname', 'lastname', 'email']
        });
        res.json(users);
    } catch (error) {
        res.status(400).json(error);

    }
}) */
// get user by id
// SELECT * FROM users WHERE id=3
app.get('/users/:id', async (req, res) => {
    try {
        // para recuperar el parámetro ID
        //  * request param
        //  es un objeto  {id: 23}  -> localhost:8000/users/id/4
        const { id } = req.params;
        console.log(req.params)

        const user = await Users.findByPk(id, {
            attributes: {
                exclude: ["passwords"],
            },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);

    }
});

app.get('/users/email/:email', async (req, res) => {
    try {
        // para recuperar el parámetro ID
        //  * request param
        //  es un objeto  {id: 23}
        const { email } = req.params;
        const user = await Users.findOne({
            where: { email },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);

    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Users.destroy({
            where: { id }  // where:  {id : id}
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname } = req.body;
        // 1.actualizan nombre
        // 2.actualizan apellido
        // 3.actualizan los dos
        await Users.update(
            { firstname, lastname },
            {
                where: { id }
            });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error)
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});

console.log(process.env);
