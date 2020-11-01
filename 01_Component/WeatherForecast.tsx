import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {getWeatherForecast, getWeatherForecastForCoupleDays} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";


export const WeatherForecast = () =>{

    const dispatch = useDispatch();
    const coordinates = useSelector((state:AppStateType) => state.mainPage.coord);

    const getForecastForTomorrow = () => {
        dispatch(getWeatherForecast(coordinates))
    };
    const getForecastForThreeDays = () =>{
        dispatch(getWeatherForecastForCoupleDays(coordinates, 3))
    };
   const getForecastForSevenDays = () =>{
        dispatch(getWeatherForecastForCoupleDays(coordinates, 7))
    };

    return(
        <View style={styles.forecastBox}>

            <View style={styles.forecasts} onTouchStart={getForecastForTomorrow}>
                <Text>tomorrow</Text>
            </View>
            <View style={styles.forecasts} onTouchStart={getForecastForThreeDays}>
                <Text>3 days</Text>
            </View>
            <View style={styles.forecasts} onTouchStart={getForecastForSevenDays}>
                <Text>7 days</Text>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    forecastBox: {
        width: '100%',
        height: '25%',
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    forecasts: {
        backgroundColor: '#FAEBD7',
        width: '30%'
    }
});
