import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {getDefaultWeather} from "../03_reducer/MainReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../03_reducer/store";
// @ts-ignore
import humidityIcon from '../05_Common/images/weather_icons/humidity.jpg';
import pressureIcon from '../05_Common/images/weather_icons/press_first.png';
import windIcon from '../05_Common/images/weather_icons/wind_main2.png';
import backgroundImg from '../05_Common/images/back_two.jpg';
import {WeatherForecast} from "./WeatherForecast";



export const Weather = (props: any) => {


    const dispatch = useDispatch();
    // @ts-ignore
    const defaultWeather = useSelector((state: AppStateType) => state.mainPage);

    useEffect(() => {
        getWeather('')
    }, []);

    function getWeather(city: string) {
        dispatch(getDefaultWeather(city))
    }

    let preload = <Text>Loading...</Text>;

    return (
        /*<ScrollView>*/
        <View style={styles.container}>


            <View style={styles.contentBox}>

                {!defaultWeather ? preload :
                    <View style={styles.weatherBox}>
                        <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
                            <View style={styles.mainBox}>


                                <View style={styles.leftSideView}>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${defaultWeather.main.weatherIcon}@2x.png`}
                                        style={{width: '150px', height: '150px', paddingTop: '50px'}}/>
                                    <Text style={styles.humidity}>облачность </Text>
                                    <Text style={{fontSize: '30px'}}>{defaultWeather.main.cloudy}%</Text>
                                </View>

                                <View style={styles.rightSideView}>
                                    <Text
                                        style={styles.mainTempText}>{defaultWeather.main.temp} °C</Text>
                                    <Text
                                        style={styles.mainTempDescriptionText}>{defaultWeather.main.description}</Text>
                                    <Text style={styles.mainTempMaxMinText}>
                                        {defaultWeather.main.temp_min}°/{defaultWeather.main.temp_max}°
                                    </Text>

                                    <Text style={styles.feelsLikeText}>ощущается как</Text>
                                    <Text style={styles.feelsLikeNumber}>{defaultWeather.main.feels_like} °C</Text>

                                </View>

                            </View>
                        </ImageBackground>
                        <Text style={styles.dateText}>{defaultWeather.date}</Text>
                        <View style={styles.iconBox}>

                            <View style={styles.iconUnit}>
                                <Text style={{textAlign: 'center'}}>влажность</Text>
                                <img src={humidityIcon} style={{width: '90px', height: '90px'}}/>
                                <Text style={{textAlign: 'center'}}>{defaultWeather.main.humidity}%</Text>
                            </View>

                            <View style={styles.iconUnit}>

                                <Text style={{textAlign: 'center'}}>скорость ветра</Text>
                                <img src={windIcon} style={{width: '90px', height: '90px'}}/>
                                <Text style={{textAlign: 'center'}}>{defaultWeather.main.wind_speed} м/c</Text>
                            </View>
                            <View style={styles.iconUnit}>
                                <Text style={{textAlign: 'center'}}>давление</Text>
                                <img src={pressureIcon} style={{width: '90px', height: '90px'}}/>
                                <Text style={{textAlign: 'center'}}>{defaultWeather.main.pressure}мм</Text>

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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentBox: {
        width: '100%',
        flexDirection: 'row',
    },
    weatherBox: {
        height: '73vh',
        width: '100%'
    },
    mainBox: {
        flexDirection: 'row',
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
    },
    leftSideView: {
        width: '40%',
        alignItems: 'center',
        height: '45vh'
    },
    rightSideView: {
        width: '60%',
        paddingTop: '55px',
        height: '45vh'
    },
    humidity: {
        fontSize: '15px',
        textAlign: 'center',
        paddingTop: '10%',
        fontWeight: 600
    },
    mainTempText: {
        fontSize: '50px',
        textAlign: 'center',
        color: 'white'
    },
    mainTempDescriptionText: {
        textAlign: 'center',
        fontSize: '15px',
        color: 'white'
    },
    mainTempMaxMinText: {
        textAlign: 'center',
        fontSize: '13px',
        color: 'white'
    },
    feelsLikeText: {
        paddingTop: '22%',
        textAlign: 'center',
        color: 'brown',
        fontWeight: 800,
        fontSize: '15px'
    },
    feelsLikeNumber: {
        fontSize: '30px',
        textAlign: 'center',
        color: 'brown'
    },
    dateText: {
        textAlign: 'center',
        fontSize: '18px',
        backgroundColor: '#3d4a5d',
        color: 'white',
        fontFamily: 'NotoSans-Regular'
    },

});
