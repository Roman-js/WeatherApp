import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDefaultWeather, initialStateType} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";


type mainType = {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
    wind_speed: number
    cloudy: number
    sunset: number
    sunrise: number
    description: string
}

export const Weather = () => {

    useEffect(() => {
        getWeather('')
    }, []);

    const dispatch = useDispatch();
    // @ts-ignore
    const defaultWeather = useSelector((state:AppStateType) => state.mainPage.main);


    function getWeather(city: string) {
        dispatch(getDefaultWeather(city))
    }

    let preload = <Text>Loading...</Text>;

    return (
        <ScrollView>
            <View style={styles.contentBox}>

                {!defaultWeather ? preload :
                    <View style={styles.weatherBox}>
                        <View style={styles.mainBox}>
                            <Text>Feels like: {defaultWeather.feels_like}</Text>
                            <Text>Temperature: {defaultWeather.temp}</Text>
                            <Text>Cloudy: {defaultWeather.cloudy}</Text>
                            <Text>Description: {defaultWeather.description}</Text>
                            <Text>Temp min: {defaultWeather.temp_min}</Text>
                            <Text>Temp max: {defaultWeather.temp_max}</Text>
                        </View>

                        <View style={styles.iconBox}>
                            <Text>Humidity: {defaultWeather.humidity}</Text>
                            <Text>Pressure: {defaultWeather.pressure}</Text>
                            <Text>Wind speed: {defaultWeather.wind_speed}</Text>
                            <Text>Sunset: {defaultWeather.sunset}</Text>
                            <Text>Sunrise: {defaultWeather.sunrise}</Text>
                        </View>



                    </View>}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    contentBox: {
        width: '100%',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
    },
    weatherBox: {
        paddingTop: '60px',
        backgroundColor: 'green',
        height: '73vh'
    },
    mainBox: {
        backgroundColor: 'aqua',
        height: '70%',
        width: '100vh'
    },
    iconBox: {
        backgroundColor: 'orange',
        height: '30%',
        width: '100vh'
    }
});
