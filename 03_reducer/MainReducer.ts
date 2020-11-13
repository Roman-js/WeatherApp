import {API} from "../02_Service/fetch";
import {
    coordType,
    dataArrayOfDailyForecastsType,
    GET_CHOSE_CITY_WEATHER,
    GET_DEFAULT_WEATHER,
    GET_WEATHER_FORECAST,
    GET_WEATHER_FORECAST_FOR_COUPLE_DAYS,
    mainType,
    SET_RESPONSE_RESULT,
    WeatherActionType
} from "../04_Types/types";
import {ThunkAction} from "redux-thunk";
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from "./store";
import {convert} from "../01_Component/Tools/ConvertTimeStampToDate";


export type initialStateType = {
    main: mainType
    coord: coordType
    forecastItem: dataArrayOfDailyForecastsType
    responseResult: boolean
    city: string
    date: string
    days: number
}
// @ts-ignore
const initialState: initialStateType = {
    main: {
        temp: 0,
        wind_speed: 0,
        humidity: 0,
        cloudy: 0,
        feels_like: 0,
        sunset: 0,
        sunrise: 0,
        description: 'light rain',
        pressure: 0,
        temp_max: 0,
        temp_min: 0,
        weatherIcon: ''
    },
    forecastItem: [],
    coord: {
        lat: 0,
        lon: 0
    },
    city: '',
    responseResult: false,
    date: '',
    days: 1
};


const MainReducer = (state: initialStateType = initialState, action: WeatherActionType): initialStateType => {

    switch (action.type) {

        case GET_DEFAULT_WEATHER:

            return {
                ...state, main: action.weatherList, city: action.city, coord: {...action.coord}, date: action.date
            };

        case GET_CHOSE_CITY_WEATHER:

            return {
                ...state, main: action.weatherList, city: action.city, coord: action.coord
            };
        case SET_RESPONSE_RESULT:
            return {
                ...state, responseResult: action.res
            };
        case GET_WEATHER_FORECAST: {

            return {
                ...state, forecastItem: action.weatherList
            }
        }
        case GET_WEATHER_FORECAST_FOR_COUPLE_DAYS: {
            return {
                ...state,
                forecastItem: action.forecasts,
                days: action.days
            }
        }


        default:
            return state
    }
};

export default MainReducer


//actionCreators

const getWeatherSuccess = (weatherList: mainType, coord: coordType, city: string, date: string): WeatherActionType => ({
    type: GET_DEFAULT_WEATHER,
    weatherList,
    coord,
    city,
    date
});
const getChoseCityWeatherSuccess = (weatherList: mainType, coord: coordType, city: string, date: string): WeatherActionType => ({
    type: GET_CHOSE_CITY_WEATHER,
    weatherList,
    coord,
    city,
    date
});
const getWeatherForecastSuccess = (weatherList: dataArrayOfDailyForecastsType): WeatherActionType => ({
    type: GET_WEATHER_FORECAST,
    weatherList,

});
const getWeatherForecastForThreeDays =
    (forecasts: dataArrayOfDailyForecastsType, date: string, days: number): WeatherActionType => ({
        type: GET_WEATHER_FORECAST_FOR_COUPLE_DAYS,
        forecasts,
        date,
        days
    });
export const responseResult = (res: boolean): WeatherActionType => ({
    type: SET_RESPONSE_RESULT,
    res
});


//thunks
type ThunkType = ThunkAction<void, initialStateType, unknown, WeatherActionType>

export const getDefaultWeather = (city: string): ThunkType =>
    async (dispatch, getState) => {

        let storageCity = await AsyncStorage.getItem('defaultValue');
        let parsed = storageCity !== null ? JSON.parse(storageCity) : 'Moscow';
        let loc = city ? city : parsed.city;
        console.log(loc);
        console.log(parsed);


        try {
            let data = await API.getDefaultWeatherList(loc);

            let date = convert(data.data.dt);
            let dateString = ' '+date[0]+' '+date[1]+' '+date[2]+' '+date[3];

            let res: mainType = {
                temp: data.data.main.temp,
                wind_speed: data.data.wind.speed,
                humidity: data.data.main.humidity,
                cloudy: data.data.clouds.all,
                feels_like: data.data.main.feels_like,
                sunset: data.data.sys.sunset,
                sunrise: data.data.sys.sunrise,
                description: data.data.weather[0].description,
                pressure: data.data.main.pressure,
                temp_max: data.data.main.temp_max,
                temp_min: data.data.main.temp_min,
                weatherIcon: data.data.weather[0].icon
            };
            dispatch(getWeatherSuccess(res, data.data.coord, data.data.name, dateString));
            dispatch(responseResult(false));
        } catch (e) {
            debugger
            dispatch(responseResult(true));
        }
    };

export const getChoseCityWeather = (city: string): ThunkType =>
    async (dispatch, getState) => {
        try {
            let data = await API.getDefaultWeatherList(city);
            let storage = {city: city, coordinates: data.coord};
            await AsyncStorage.setItem('defaultValue', JSON.stringify(storage));
            //console.log(JSON.parse.AsyncStorage.getItem('defaultValue'));

            //let date = convert(data.data.dt);

            let res: mainType = {
                temp: data.data.main.temp,
                wind_speed: data.data.wind.speed,
                humidity: data.data.main.humidity,
                cloudy: data.data.clouds.all,
                feels_like: data.data.main.feels_like,
                sunset: data.data.sys.sunset,
                sunrise: data.data.sys.sunrise,
                description: data.data.weather[0].description,
                pressure: data.data.main.pressure,
                temp_max: data.data.main.temp_max,
                temp_min: data.data.main.temp_min,
                weatherIcon: data.data.weather[0].icon
            };
            dispatch(getChoseCityWeatherSuccess(res, data.data.coord, data.data.name, data.headers.date));
            dispatch(responseResult(false));

            let promise = await API.getForecastWeatherList(data.data.coord, 'hourly');
            dispatch(getWeatherForecastForThreeDays(promise.data.daily, promise.headers.date, getState().mainPage.days))

        } catch (e) {
            dispatch(responseResult(true));
        }
    };

export const getWeatherForecast = (coordinates: coordType): ThunkType =>
    async (dispatch, getState) => {

        try {
            let data = await API.getForecastWeatherList(coordinates, 'hourly');

            let date = convert(data.data.daily[1].dt);
            let dateString = ' '+date[0]+' '+date[1]+' '+date[2]+' '+date[3];


            dispatch(getWeatherForecastSuccess(data.data.daily))
        } catch (e) {
            console.log('some error')
        }
    };

export const getWeatherForecastForCoupleDays = (coordinates: coordType, days: number): ThunkType =>
    async (dispatch, getState) => {

        try {
            let res = await API.getForecastWeatherList(coordinates, 'hourly');
            console.log(res)

            dispatch(getWeatherForecastForThreeDays(res.data.daily, res.headers.date, days))
        } catch (e) {
            console.log('some error')
        }
    };

