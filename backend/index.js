const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.post('/calculate-bmi', (req, res) => {
    const { height, hUnit, weight, wUnit } = req.body
    const calculatedWeight = wUnit === 'kg' ? parseFloat(weight) : parseFloat(weight) * 0.45359237;
    let calculatedHeight = 0;
    if (hUnit === 'cm') {
        calculatedHeight = parseFloat(height) * 0.01;
    } else if (hUnit === 'ft') {
        calculatedHeight = parseFloat(height) * 0.3048;
    } else {
        calculatedHeight = parseFloat(height) * 0.0254;
    }
    const bmi = calculatedWeight / (calculatedHeight * calculatedHeight);
    res.send(bmi.toString());
});

app.listen(process.env.PORT || 8000);