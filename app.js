require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Searches = require("./models/search");


const main = async() => {

    const searches = new Searches()
    let option
    do {
        option = await inquirerMenu() 
        
        switch (option) {
            case 1:
                //Show message
                const inputPlace = await leerInput('City: ')
                //Search the places
                const places = await searches.city(inputPlace)
                //Select the places
                const idSelect = await listarLugares(places)
                const placeSelected = places.find(p => p.id === idSelect)
                console.log(placeSelected);
                //Weather data
                const weather = await searches.weatherPlace(placeSelected.latitude, placeSelected.longitude)
                //console.log(weather);
                //Show results
                console.log('\nCity information\n'.green);
                console.log('City:', placeSelected.city);
                console.log('Latitude:', placeSelected.longitude);
                console.log('Longitude:', placeSelected.latitude);
                console.log('Temperature:', weather.temperature);
                console.log('Minimun:', weather.minimun);
                console.log('Maximun:', weather.maximun);
                console.log('Description:', weather.description);
                /*
                let ciudad = await leerInput('Ingrese la ciudad a buscar: ')
                //break;
                */
            case 2:
                //History
                break;
        }
        
        if(option !== 0) await pausa()
    } while (option !== 0);

}

main()
