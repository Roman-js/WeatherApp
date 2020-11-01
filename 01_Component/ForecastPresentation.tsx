import {StyleSheet, Text, View} from "react-native";
import React from "react";
// @ts-ignore
import windIcon from '../05_Common/images/windIcon.jpg'
// @ts-ignore
import windIcon_small from '../05_Common/images/windIcon_small.jpg'
import {dataDailyForecastType} from "../04_Types/types";

type propsType = {
    forecastDays: dataDailyForecastType[]
    date: string
}

export const ForecastPresentation = (props: propsType) => {

    return (
        props.forecastDays.length < 4 ?
            <View style={styles.mainBox}>

                {props.forecastDays.map(day =>
                    <View style={styles.weatherItem} key={day.dt}>
                        {console.log(props)}
                        <View style={styles.dateBox}>
                            <Text>{props.date}</Text>
                        </View>

                        <View style={styles.windBox}>

                            <img src={windIcon} style={{width: '100%'}}/>
                            <Text>speed {day.wind_speed} km/h</Text>
                        </View>

                        <View style={styles.weatherBox}>

                            <View style={styles.iconBox}>
                                {/*<img src={trainyIcon} style={{width: '60%', height: '90%'}}/>*/}
                                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                     style={{width: '60%', height: '60%'}}/>
                                <Text style={{padding: '9px'}}>
                                    min<br/>
                                    {day.temp.min}°C<br/>
                                    max<br/>
                                    {day.temp.max}°C
                                </Text>
                            </View>

                            <Text
                                style={{paddingLeft: '15px', paddingBottom: '12px'}}>{day.weather[0].description}</Text>
                        </View>
                    </View>)}
            </View>

            : <View style={styles.mainBox}>
                {props.forecastDays.map(day =>
                <View style={styles.weatherItem}>

                    <View style={styles.dateBox}>
                        <Text>WED 19.09</Text>
                    </View>

                    <View style={styles.windBox}>

                        <img src={windIcon_small} style={{width: '100%', height: '50%'}}/>

                        <Text>{day.wind_speed}km/h</Text>
                    </View>

                    <View style={styles.iconBox}>
                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                             style={{width: '30%', height: '60%'}}/>
                        <Text style={{marginRight: '10px'}}>
                            min {day.temp.min}°C<br/>
                            max {day.temp.max}°C
                        </Text>
                    </View>

                </View>
                )}
            </View>
    )
};

const styles = StyleSheet.create({
    mainBox: {
        height: '90%',
        width: '100%',
        backgroundColor: 'darkYellow',
        /*justifyContent: 'space-between',*/
        alignItems: 'center',
        alignContent: 'stretch',
        flexWrap: 'nowrap',


    },
    weatherItem: {
        width: '90%',
        maxHeight: '33%',
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowRadius: 10,
        marginTop: '10px',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    }
});
