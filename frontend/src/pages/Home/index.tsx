import { useState } from 'react';
import axios from 'axios';
import './index.css';

const heightUnits = ['cm', 'ft', 'inch'];
const weightUnits = ['kg', 'pound'];

const Home = () => {
    const [height, setHeight] = useState('0');
    const [hUnit, setHeightUnit] = useState(heightUnits[0]);
    const [weight, setWeight] = useState('0');
    const [wUnit, setWeightUnit] = useState(weightUnits[0]);
    const [bmi, setBmi] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (height === '0' || weight === '0') {
            alert('Enter height or weight properly');
        } else {
            axios.post(`${process.env.REACT_APP_API}/calculate-bmi`, {
                height,
                hUnit,
                weight,
                wUnit,
            })
              .then(function (response) {
                console.log(response);
                setBmi(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    return (
        <div className="container">
            <div className="title">Web developer test for Karta</div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div>Enter your height:</div>
                    <div>
                        <input
                            className="value-input"
                            type="number" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <select name="height-units" value={hUnit} onChange={(e) => setHeightUnit(e.target.value)}>
                            {heightUnits.map((unit, index) => 
                                <option key={index} value={unit}>{unit}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <div>Enter your weight:</div>
                    <div>
                        <input
                            className="value-input"
                            type="number" 
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <select name="weight-units" value={wUnit} onChange={(e) => setWeightUnit(e.target.value)}>
                            {weightUnits.map((unit, index) => 
                                <option key={index} value={unit}>{unit}</option>
                            )}
                        </select>
                    </div>
                </div>
                <input type="submit" className="submit" />
            </form>
            <div className="bmi-result">
                <div>Calculated BMI: </div>
                <div>{bmi === '' ? 'No calculated BMI yet' : bmi}</div>
            </div>
        </div>
    );
}

export default Home;