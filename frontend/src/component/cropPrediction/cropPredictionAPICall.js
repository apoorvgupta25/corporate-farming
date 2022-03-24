import {ML_API} from '../../backend';

export const getcropPrediction = (nitrogen,phosphorous,potassium,ph,humidity,rainfall,temperature) => {
    let url = `${ML_API}/crop_prediction?`
    //return fetch(`${url}nitrogen=$54&rainfall=1000&humidity=$32&temperature=$32&ph=$5&pottasium=11&phosphorous=32`, { method: "GET" })
    return fetch(`${url}nitrogen=${nitrogen}&rainfall=${rainfall}&humidity=${humidity}&temperature=${temperature}&ph=${ph}&pottasium=${potassium}&phosphorous=${phosphorous}`, { method: "GET" })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};
