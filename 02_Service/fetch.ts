import axios from "axios";  /** as */
import {coordType, dataType} from "../04_Types/types";
import Geolocation from "react-native-geolocation-service";

const apiId = 'aa660f6537863c9e785488b49b0fb175';

const instance = axios.create({
    //baseURL: 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/',
    baseURL: 'http://api.openweathermap.org/data/2.5/',
});


export const API = {

    getDefaultWeatherList(city: string) {

        return instance.get(`weather?q=${city}&units=metric&appid=${apiId}&lang=ru`)
            .then((res: any) => {
                return res
            })
    },
    getForecastWeatherList(coord: coordType, part: string) {
        return instance.get(`onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=${part}&units=metric&appid=${apiId}&lang=ru`)
            .then((res: any) => {

                return res

            })
    },

    getGeoLocation() {
        return new Promise((res, rej) => {
            Geolocation.getCurrentPosition((position) => {

               res (axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ru`)
                    .then((res)=>res.data))


                }
            )
        })

    }

};

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
