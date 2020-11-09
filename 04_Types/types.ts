export const GET_DEFAULT_WEATHER = 'GET-DEFAULT-WEATHER';
export const GET_CHOSE_CITY_WEATHER = 'GET-DEFAULT-WEATHER';
export const SET_RESPONSE_RESULT = 'SET-RESPONSE-RESULT';
export const GET_WEATHER_FORECAST = 'GET-WEATHER-FORECAST';
export const GET_WEATHER_FORECAST_FOR_COUPLE_DAYS = 'GET-WEATHER-FORECAST-FOR-COUPLE-DAYS';
export const GET_WEATHER_FORECAST_SEVEN_DAYS = 'GET-WEATHER-FORECAST-SEVEN-DAYS';

export type mainType = {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
    wind_speed: number
    cloudy: number,
    sunset: number,
    sunrise: number,
    description: string,
    weatherIcon: string
}
export type forecastItemType = {
    date: string
    wind_speed: number
    description: string
    temp_max: number
    temp_min: number
}
export type coordType = {
    lat: number
    lon: number
}
export type cloudsType = {
    all: number
}
export type sysType = {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
}
export type eachWeatherType = {
    description: string
    icon: string
    id: number
    main: string
}
export type weatherType = eachWeatherType[]

export type windType = {
    speed: number
    deg: number
}
export type dataType = {
    base: string
    clouds: cloudsType
    cod: number
    coord: coordType
    dt: number
    id: number
    main: mainType
    name: string
    sys: sysType
    timezone: number
    visibility: number
    weather: weatherType
    wind: windType
}
export type feelsLikeForecastType = {
    day: number
    night: number
    eve: number
    morn: number
}
export type tempForecastType = {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number
}
export type weatherForecastType = {
    description: string
    icon: string
    id: number
    main: string
}
export type dataDailyForecastType = {
    clouds: number
    dew_point: number
    dt: number
    feels_like: feelsLikeForecastType
    humidity: number
    pop: number
    pressure: number
    rain: number
    sunrise: number
    sunset: number
    temp: tempForecastType
    uvi: number
    weather: weatherForecastType[]
    wind_deg: number
    wind_speed: number
}
export type dataArrayOfDailyForecastsType = dataDailyForecastType[]

// action creators type
export type WeatherActionType = GetDefaultWeatherType | GetChoseCityWeatherType
    | SetResponseResultType | GetWeatherForecastSuccessType | GetWeatherForecastForThreeDaysType
    | GetWeatherForecastForSevenDaysType;

type GetDefaultWeatherType = {
    type: typeof GET_DEFAULT_WEATHER
    weatherList: mainType
    coord: coordType
    city: string
    date: string
};
type GetChoseCityWeatherType = {
    type: typeof GET_CHOSE_CITY_WEATHER
    weatherList: mainType
    coord: coordType
    city: string
    date: string
};
type GetWeatherForecastSuccessType = {
    type: typeof GET_WEATHER_FORECAST
    weatherList: mainType
};
type GetWeatherForecastForThreeDaysType = {
    type: typeof GET_WEATHER_FORECAST_FOR_COUPLE_DAYS
    forecasts: dataArrayOfDailyForecastsType
    date: string
    days: number
};
type GetWeatherForecastForSevenDaysType = {
    type: typeof GET_WEATHER_FORECAST_SEVEN_DAYS
    forecasts: dataArrayOfDailyForecastsType
    date: string
    days: number
};
type SetResponseResultType = {
    type: typeof SET_RESPONSE_RESULT
    res: boolean
};

