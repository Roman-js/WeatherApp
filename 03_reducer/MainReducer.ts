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
        temp_min: 0
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
                ...state, main: action.weatherList, city: action.city, coord: {...action.coord}
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
                ...state, main: action.weatherList
            }
        }
        case GET_WEATHER_FORECAST_FOR_COUPLE_DAYS: {
            debugger
            return {
                ...state,
                forecastItem: action.forecasts,
                date: action.date,
                days: action.days
            }
        }


        default:
            return state
    }
};

export default MainReducer


//actionCreators

const getWeatherSuccess = (weatherList: mainType, coord: coordType, city: string): WeatherActionType => ({
    type: GET_DEFAULT_WEATHER,
    weatherList,
    coord,
    city
});
const getChoseCityWeatherSuccess = (weatherList: mainType, coord: coordType, city: string): WeatherActionType => ({
    type: GET_CHOSE_CITY_WEATHER,
    weatherList,
    coord,
    city
});
const getWeatherForecastSuccess = (weatherList: mainType): WeatherActionType => ({
    type: GET_WEATHER_FORECAST,
    weatherList
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
            let res: mainType = {
                temp: data.main.temp,
                wind_speed: data.wind.speed,
                humidity: data.main.humidity,
                cloudy: data.clouds.all,
                feels_like: data.main.feels_like,
                sunset: data.sys.sunset,
                sunrise: data.sys.sunrise,
                description: data.weather[0].description,
                pressure: data.main.pressure,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min
            };
            dispatch(getWeatherSuccess(res, data.coord, data.name))
        } catch (e) {
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


            let res: mainType = {
                temp: data.main.temp,
                wind_speed: data.wind.speed,
                humidity: data.main.humidity,
                cloudy: data.clouds.all,
                feels_like: data.main.feels_like,
                sunset: data.sys.sunset,
                sunrise: data.sys.sunrise,
                description: data.weather[0].description,
                pressure: data.main.pressure,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min
            };
            dispatch(getChoseCityWeatherSuccess(res, data.coord, data.name));
            dispatch(responseResult(false));
        } catch (e) {
            dispatch(responseResult(true));
        }
    };

export const getWeatherForecast = (coordinates: coordType): ThunkType =>
    async (dispatch, getState) => {

        try {
            let data = await API.getForecastWeatherList(coordinates, 'hourly');
            let res: mainType = {
                temp: data.data.daily[0].temp.day,
                wind_speed: data.data.daily[0].wind_speed,
                humidity: data.data.daily[0].humidity,
                cloudy: data.data.daily[0].clouds,
                feels_like: data.data.daily[0].feels_like.day,
                sunset: data.data.daily[0].sunset,
                sunrise: data.data.daily[0].sunrise,
                description: data.data.daily[0].weather[0].description,
                pressure: data.data.daily[0].pressure,
                temp_max: data.data.daily[0].temp.max,
                temp_min: data.data.daily[0].temp.min
            };
            dispatch(getWeatherForecastSuccess(res))
        } catch (e) {
            console.log('some error')
        }
    };

export const getWeatherForecastForCoupleDays = (coordinates: coordType, days: number): ThunkType =>
    async (dispatch, getState) => {

        try {
            let res = await API.getForecastWeatherList(coordinates, 'hourly');

            dispatch(getWeatherForecastForThreeDays(res.data.daily, res.headers.date, days))
        } catch (e) {
            console.log('some error')
        }
    };

