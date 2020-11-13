import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDefaultWeather, initialStateType} from "../03_reducer/MainReducer";
import {Provider, useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
import humidityIcon from '../05_Common/images/weather_icons/humidity.jpg';
import pressureIcon from '../05_Common/images/weather_icons/press_first.png';
import windIcon from '../05_Common/images/weather_icons/wind_main2.png';
import backgroundImg from '../05_Common/images/back_two.jpg';
import {Header} from "./Header";
import {WeatherForecast} from "./WeatherForecast";
import {convert} from "./Tools/ConvertTimeStampToDate";


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

export const WeatherTomorrow = (props: any) => {

    /*useEffect(() => {
        getWeather('')
    }, [props.navigation.navigate('Main')]);*/

    const dispatch = useDispatch();
    // @ts-ignore
    const tomorrowWeather = useSelector((state: AppStateType) => state.mainPage.forecastItem[1]);
    const date = useSelector((state: AppStateType) => state.mainPage.date);


    function getWeather(city: string) {
        dispatch(getDefaultWeather(city))
    }

    let preload = <Text>Loading...</Text>;

    return (
        /*<ScrollView>*/
        <View style={styles.container}>
            {/*<Header/>*/}


            <View style={styles.contentBox}>

                {!tomorrowWeather ? preload :
                    <View style={styles.weatherBox}>
                        {console.log(tomorrowWeather)}
                        <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
                            <View style={styles.mainBox}>


                                <View style={{width: '40%', alignItems: 'center', height: '45vh'}}>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${tomorrowWeather.weather[0].icon}@2x.png`}
                                        style={{width: '150px', height: '150px', paddingTop: '50px'}}/>
                                    <Text style={{
                                        fontSize: '15px',
                                        textAlign: 'center',
                                        paddingTop: '10%',
                                        fontWeight: 600
                                    }}>облачность </Text>
                                    <Text style={{fontSize: '30px'}}>{tomorrowWeather.clouds}%</Text>
                                </View>

                                <View style={{width: '60%', paddingTop: '55px', height: '45vh'}}>
                                    <Text
                                        style={{
                                            fontSize: '50px',
                                            textAlign: 'center',
                                            color: 'white'
                                        }}>{tomorrowWeather.temp.day} °C</Text>
                                    <Text style={{
                                        textAlign: 'center', fontSize: '15px', color: 'white'
                                    }}>{tomorrowWeather.weather[0].description}</Text>
                                    <Text style={{textAlign: 'center', fontSize: '13px', color: 'white'}}>
                                        {tomorrowWeather.temp.min}°/{tomorrowWeather.temp.max}°
                                    </Text>

                                    <Text style={{
                                        paddingTop: '22%',
                                        textAlign: 'center',
                                        color: 'brown',
                                        fontWeight: 800,
                                        fontSize: '15px'
                                    }}>ощущается как</Text>
                                    <Text style={{
                                        fontSize: '30px', textAlign: 'center', color: 'brown'
                                    }}>{tomorrowWeather.feels_like.day} °C</Text>

                                </View>

                            </View>
                        </ImageBackground>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: '18px',
                            backgroundColor: '#3d4a5d',
                            color: 'white'
                        }}>
                            {convert(tomorrowWeather.dt)[0]+' '+convert(tomorrowWeather.dt)[1] +' '+
                            convert(tomorrowWeather.dt)[2]+' '+convert(tomorrowWeather.dt)[3]}
                        </Text>
                        <View style={styles.iconBox}>

                            <View style={styles.iconUnit}>
                                <Text style={{textAlign: 'center'}}>Влажность</Text>
                                <img src={humidityIcon} style={{width: '90px', height: '90px'}}/>
                                <Text style={{textAlign: 'center'}}>{tomorrowWeather.humidity}%</Text>
                            </View>

                            <View style={styles.iconUnit}>

                                <Text style={{textAlign: 'center'}}>Скорость ветра</Text>
                                <img src={windIcon} style={{width: '90px', height: '90px'}}/>
                                <Text style={{textAlign: 'center'}}>{tomorrowWeather.wind_speed} м/c</Text>
                            </View>
                            <View style={styles.iconUnit}>
                                <Text style={{textAlign: 'center'}}>Давление</Text>
                                <img src={pressureIcon} style={{width: '90px', height: '90px'}}/>
                                <Text style={{textAlign: 'center'}}>{tomorrowWeather.pressure}мм</Text>

                            </View>

                        </View>


                    </View>}
            </View>
            <WeatherForecast props={props}/>
        </View>
        /*</ScrollView>*/
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        /*backgroundColor: 'darkgrey',*/
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentBox: {
        width: '100%',
        /*marginBottom: 10,*/
        /*flex: 1,*/
        flexDirection: 'row',
    },
    weatherBox: {
        /*paddingTop: '50px',*/
        /*backgroundColor: 'grey',*/
        height: '73vh',
        width: '100%'
    },
    mainBox: {
        flexDirection: 'row',
        /*backgroundColor: 'aqua',*/
        height: '70%',
    },
    iconBox: {
        height: '30%',
        flexDirection: 'row',
        backgroundColor: '#d4f4f1'
        /*width: '100vh'*/
    },
    iconUnit: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: 'null',
    }
});
