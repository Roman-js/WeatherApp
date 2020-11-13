import {ImageBackground, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
// @ts-ignore
import windIcon from '../05_Common/images/windIcon.jpg'
// @ts-ignore
import windIcon_small from '../05_Common/images/windIcon_small.jpg'
import {dataDailyForecastType} from "../04_Types/types";
import { useRoute } from '@react-navigation/native';
import {WeatherForecast} from "./WeatherForecast";
import {Header} from "./Header";
import backgroundImg from "../05_Common/images/backForecasts_2.png";
import {convert} from "./Tools/ConvertTimeStampToDate";

type propsType = {
    forecastDays: dataDailyForecastType[]
    date: string
}

export const ForecastPresentation = (props: propsType) => {



    return (

        <View style={styles.container}>

        {props.forecastDays.length < 4 ?
            <View style={styles.mainBox}>

                {props.forecastDays.map(day =>
                    <View style={styles.weatherItem} key={day.dt}>
                        {console.log(props)}
                        <View style={styles.dateBox}>

                            <Text style={{fontSize: '30px', fontWeight: 600}}>{convert(day.dt)[1]}</Text>
                            <Text style={{fontSize: '15px', fontWeight: 500}}>{convert(day.dt)[0]}</Text>
                            <Text style={{fontWeight: 500, textAlign: 'center'}}>{convert(day.dt)[2]+' '+convert(day.dt)[3]}</Text>

                        </View>

                        <View style={styles.windBox}>

                            <img src={windIcon} style={{width: '100%'}}/>
                            <Text>ветер {day.wind_speed} км/ч</Text>
                        </View>

                        <View style={styles.weatherBox}>

                            <View style={styles.iconBox}>
                                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                     style={{width: '100px', height: '100px'}}/>
                                <Text style={{padding: '9px'}}>
                                    мин<br/>
                                    {day.temp.min}°C<br/>
                                    макс<br/>
                                    {day.temp.max}°C
                                </Text>
                            </View>

                            <Text
                                style={{ textAlign: 'center'}}>{day.weather[0].description}</Text>
                        </View>
                    </View>)}
                    {/*<WeatherForecast/>*/}
                <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
                    <View style={styles.bottomBox}>

                    </View>
                </ImageBackground>
            </View>

            : <View style={styles.mainBox}>
                {props.forecastDays.map(day =>
                <View style={styles.weatherItemSevenDays}>

                    <View style={styles.dateBox}>
                        <Text style={{ fontWeight: 600}}>{convert(day.dt)[1]}</Text>
                        {/*<Text style={{ fontWeight: 500}}>{convert(day.dt)[0]}</Text>*/}
                        <Text style={{fontWeight: 500}}>{convert(day.dt)[2]}</Text>
                    </View>

                    <View style={styles.windBox}>

                        <img src={windIcon_small} style={{width: '30px', height: '30px'}}/>

                        <Text>{day.wind_speed}km/h</Text>
                    </View>

                    <View style={styles.iconBox}>
                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                             style={{width: '60px', height: '60px'}}/>
                        <Text style={{marginRight: '10px'}}>
                            мин {day.temp.min}°C<br/>
                            макс {day.temp.max}°C
                        </Text>
                    </View>

                </View>
                )}
            </View>}
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        /*backgroundColor: 'darkgrey',*/
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#d4f4f1'
    },
    mainBox: {
        height: '100%',

        /*justifyContent: 'space-around',*/
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        backgroundColor: '#d4f4f1'
    },
    weatherItem: {
        width: '90%',
        minHeight: '22vh',
        /*backgroundColor: '#2ee885',*/
        flexDirection: 'row',
        shadowRadius: 10,
        marginTop: '10px',
        marginBottom: '5px',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    weatherItemSevenDays: {
        width: '90%',
        height: '8vh',
        /*backgroundColor: '#2ee885',*/
        flexDirection: 'row',
        shadowRadius: 10,
        marginTop: '5px',
        marginBottom: '5px',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
    },
    dateBox: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '5px'
    },
    windBox: {
        width: '15%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '15px'
    },
    weatherBox: {
        width: '45%',
        height: '100%',
    },
    iconBox: {
        /*paddingTop: '10px',*/
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '10px'
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: 'null'
    },
    bottomBox: {
        width: '100%',
        height: '15vh',
        /*backgroundColor: 'green',*/
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '10px',

    },
});
