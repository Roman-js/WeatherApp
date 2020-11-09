import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getDefaultWeather, initialStateType} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
import humidityIcon from '../05_Common/images/weather_icons/humidity.jpg';
import pressureIcon from '../05_Common/images/weather_icons/press_first.png';
import windIcon from '../05_Common/images/weather_icons/wind_main2.png';
import backgroundImg from '../05_Common/images/back_two.jpg';


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
    const defaultWeather = useSelector((state: AppStateType) => state.mainPage);


    function getWeather(city: string) {
        dispatch(getDefaultWeather(city))
    }

    let preload = <Text>Loading...</Text>;

    return (
        /*<ScrollView>*/
        <View style={styles.contentBox}>

            {!defaultWeather ? preload :
                <View style={styles.weatherBox}>
                    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
                        <View style={styles.mainBox}>


                            <View style={{width: '40%', alignItems: 'center'}}>
                                <img src={`http://openweathermap.org/img/wn/${defaultWeather.main.weatherIcon}@2x.png`}
                                     style={{width: '150px', height: '150px', paddingTop: '50px'}}/>
                                <Text style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                    fontWeight: 600
                                }}>cloudy {defaultWeather.main.cloudy}%</Text>
                            </View>

                            <View style={{width: '60%', paddingTop: '50px'}}>
                                <Text
                                    style={{
                                        fontSize: '50px',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}>{defaultWeather.main.temp} °C</Text>
                                <Text style={{
                                    textAlign: 'center', fontSize: '15px', color: 'white'
                                }}>{defaultWeather.main.description}</Text>
                                <Text style={{textAlign: 'center', fontSize: '13px', color: 'white'}}>
                                    {defaultWeather.main.temp_min}°/{defaultWeather.main.temp_max}°
                                </Text>

                                <Text style={{paddingTop: '20%', textAlign: 'center', color: 'brown', fontWeight: 800, fontSize: '15px'}}>feels like</Text>
                                <Text style={{fontSize: '30px', textAlign: 'center', color: 'brown'
                                }}>{defaultWeather.main.feels_like} °C</Text>

                            </View>

                        </View>
                    </ImageBackground>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        backgroundColor: '#3d4a5d',
                        color: 'white'
                    }}>{defaultWeather.date}</Text>
                    <View style={styles.iconBox}>

                        <View style={styles.iconUnit}>
                            <Text style={{textAlign: 'center'}}>Humidity</Text>
                            <img src={humidityIcon} style={{width: '90px', height: '90px'}}/>
                            <Text style={{textAlign: 'center'}}>{defaultWeather.main.humidity}%</Text>
                        </View>

                        <View style={styles.iconUnit}>

                            <Text style={{textAlign: 'center'}}>Wind speed</Text>
                            <img src={windIcon} style={{width: '90px', height: '90px'}}/>
                            <Text style={{textAlign: 'center'}}>{defaultWeather.main.wind_speed} м/c</Text>
                        </View>
                        <View style={styles.iconUnit}>
                            <Text style={{textAlign: 'center'}}>Pressure</Text>
                            <img src={pressureIcon} style={{width: '90px', height: '90px'}}/>
                            <Text style={{textAlign: 'center'}}>{defaultWeather.main.pressure}мм</Text>

                        </View>

                    </View>


                </View>}
        </View>
        /*</ScrollView>*/
    )
};

const styles = StyleSheet.create({
    contentBox: {
        width: '100%',
        /*marginBottom: 10,*/
        /*flex: 1,*/
        flexDirection: 'row',
    },
    weatherBox: {
        paddingTop: '50px',
        /*backgroundColor: 'grey',*/
        height: '80vh',
        width: '100%'
    },
    mainBox: {
        flexDirection: 'row',
        /*backgroundColor: 'aqua',*/
        height: '70%',
        /*width: '100vh'*/
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
