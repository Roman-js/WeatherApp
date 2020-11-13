import {ImageBackground, StyleSheet, Text, View} from "react-native";
import React from "react";
import {getWeatherForecast, getWeatherForecastForCoupleDays} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
import {Button, Paper} from "@material-ui/core";
// @ts-ignore
import backgroundImg from "../05_Common/images/backForecasts_2.png";
import {convert} from "./Tools/ConvertTimeStampToDate";


export const WeatherForecast = (props: any) => {

    const dispatch = useDispatch();
    const coordinates = useSelector((state: AppStateType) => state.mainPage.coord);

    const getForecastForTomorrow = () => {
        dispatch(getWeatherForecast(coordinates))
        props.props.navigation.navigate('Tomorrow');
    };
    const getForecastForThreeDays = () => {
        dispatch(getWeatherForecastForCoupleDays(coordinates, 3));
        props.props.navigation.navigate('Forecasts');

    };
    const getForecastForSevenDays = () => {
        dispatch(getWeatherForecastForCoupleDays(coordinates, 7));
        props.props.navigation.navigate('Forecasts');

        console.log(convert(1605258000))


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
            <View style={styles.forecasts}>
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
