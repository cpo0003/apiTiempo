const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/clima', async (req, res) => {
    const ciudad = req.query.ciudad;
    const apiKey = '65ec6a9e013f239821a4311f072535e1';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos climáticos');
    }
});


app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
