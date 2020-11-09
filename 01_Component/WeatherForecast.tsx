import {ImageBackground, StyleSheet, Text, View} from "react-native";
import React from "react";
import {getWeatherForecast, getWeatherForecastForCoupleDays} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
import {Button, Paper} from "@material-ui/core";
import backgroundImg from "../05_Common/images/backForecasts_2.png";


export const WeatherForecast = () => {

    const dispatch = useDispatch();
    const coordinates = useSelector((state: AppStateType) => state.mainPage.coord);

    const getForecastForTomorrow = () => {
        dispatch(getWeatherForecast(coordinates))
    };
    const getForecastForThreeDays = () => {
        dispatch(getWeatherForecastForCoupleDays(coordinates, 3))
    };
    const getForecastForSevenDays = () => {
        dispatch(getWeatherForecastForCoupleDays(coordinates, 7))
    };

    return (
        <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
        <View style={styles.forecastBox}>




                <View style={styles.forecasts}>

                    <Text style={{textAlign: 'center'}}>Прогноз на завтра</Text>
                    <Button variant={"contained"} style={{backgroundColor: '#3d4a5d', color: 'white'}} onClick={getForecastForTomorrow}>перейти</Button>

                </View>

            <View style={styles.forecasts}>
                <Text style={{textAlign: 'center'}}>Прогноз на 3 дня</Text>
                <Button variant={"contained"} style={{backgroundColor: '#3d4a5d', color: 'white'}} onClick={getForecastForThreeDays}>перейти</Button>
            </View>
            <View style={styles.forecasts}> {/*onTouchStart={getForecastForSevenDays}*/}
                <Text style={{textAlign: 'center'}}>Прогноз на 7 дней </Text>
                <Button variant={"contained"} style={{backgroundColor: '#3d4a5d', color: 'white'}} onClick={getForecastForSevenDays}>перейти</Button>
            </View>

        </View>
        </ImageBackground>
    )
};
//&#9660;
const styles = StyleSheet.create({
    forecastBox: {
        width: '100%',
        height: '18vh',
        /*backgroundColor: 'green',*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',

    },
    forecasts: {
        justifyContent: 'space-between',
        width: '30%',
        boxShadow: '0 0 5px rgba(0,0,0,0.5)',
        borderRadius: 10,


    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: 'null'
    }
});
