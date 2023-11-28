const axios = require('axios')

class Searches{
    history = ['Tucumán', 'Madrid']

    constructor() {
        //Reading DB if exist
    }

    //Http request params of Maptiler
    get paramsMaptiler() {
        return{
            'key' : process.env.MAPTILDER_KEY
        }
    }

    //Methot of the site
    async city(place){
        try {
        //Http request
        const instance = axios.create({
        baseURL: `https://api.maptiler.com/geocoding/${place}.json`,
        params: this.paramsMaptiler //(also you can write the params here like an object)
        })
        //Request get
        const resp = await instance.get()
        //Return places
        return resp.data.features.map(place => ({
            id: place.id,
            city: place.place_name,
            longitude: place.center[0],
            latitude: place.center[1]
        }))
        } catch (error) {
            return 'Wow sorry, it seems an error ocurred'
        }
    }

    //Http request params of Openweather
    get paramsOpenweather() {
        return {
            appid: process.env.WEATHER_KEY,
            //latitude,
            //longitude,
            units: 'metric',
            lang: 'es'
        }
    }

    //Method of the weather
    async weatherPlace(lat, lon) {
        try {
            //Http request
            const instance = axios.create({
            apiURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsOpenweather, lat, lon}
            })
            //Request get
            const resp = await instance.get()
            const { weather, main } = resp.data
            //Return weather
            return {
                temperature: main.temp,
                minimun: main.temp_min,
                maximun: main.temp_max,
                description: weather[0].description
            }
        } catch (error) {
            return error
        }
    }
}


module.exports = Searches